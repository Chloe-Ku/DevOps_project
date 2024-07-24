import express, { query } from 'express';
import fluentLogger from '@fluent-org/logger';
import pg from 'pg';
import Sentry from "@sentry/node";
import SentryProfiling from "@sentry/profiling-node";

// database
const db = new pg.Client(process.env.DB_URL);
await db.connect();

// logging
const node_env = process.env.NODE_ENV || 'development';
const logger = new fluentLogger.FluentClient(node_env, {
  socket: {
    host: process.env.FLUENT_HOST
  }
});

// application
const app = express();

// monitoring
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new Sentry.Integrations.Postgres(),
    new SentryProfiling.ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

// middlewares
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());
app.use((req, res, next) => {
  next();
  logger.emit('app', { path: req.path, body: req.body, status: res.statusCode });
});
app.use(express.static('public'));

// Endpoint to fetch available coffees
app.get('/coffees', (req, res, next) => {
  db.query('SELECT id, name, price FROM coffees', (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json(result.rows);
  });
});

// Endpoint to place an order
app.post('/order', (req, res, next) => {
  const { coffeeId, quantity } = req.body;

  db.query('SELECT name, price FROM coffees WHERE id = $1', [coffeeId], (err, result) => {
    if (err) {
      next(err);
      return;
    }

    if (result.rowCount < 1) {
      return res.status(400).json({ error: 'Invalid coffee ID' });
    }
    const coffee = result.rows[0];

    db.query("SELECT COUNT(*) FROM orders;", (err, result) => {
      if (err) {
        next(err);
        return;
      }

      const order = {
        orderId: parseInt(result.rows[0].count) + 1,
        coffeeName: coffee.name,
        quantity: quantity,
        total: coffee.price * quantity,
      };

      db.query(
        'INSERT INTO orders VALUES ($1, $2, $3, $4)',
        [order.orderId, order.coffeeName, order.quantity, order.total],
        (err, result) => {
          if (err) {
            next(err);
            return;
          }
          res.status(201).json(order);
        }
      )
    });
  });
});

// Endpoint to fetch all orders
app.get('/orders', (req, res, next) => {
  db.query('SELECT orderId, coffeeName, quantity, total FROM orders', (err, result) => {
    if (err) {
      next(err);
      return;
    }
    res.json(result.rows.map(order => {
      return {
        orderId: order.orderid,
        coffeeName: order.coffeename,
        quantity: order.quantity,
        total: order.total,
      };
    }));
  });
});

app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default server;
