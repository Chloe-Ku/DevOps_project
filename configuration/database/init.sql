-- drop tables if exists
DROP TABLE IF EXISTS coffees;
DROP TABLE IF EXISTS orders;

-- create tables
CREATE TABLE coffees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    price INTEGER NOT NULL
);
CREATE TABLE orders (
    orderid INTEGER PRIMARY KEY,
    coffeename VARCHAR(40) NOT NULL,
    quantity INTEGER NOT NULL,
    total INTEGER NOT NULL
);

-- insert fixture data
INSERT INTO coffees (name, price)
VALUES ('Lattee', 5), ('Espresso', 3), ('Cappuccino', 4);
