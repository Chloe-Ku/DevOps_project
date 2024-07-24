# Project Status Report 2

## Accomplishments

* Jae Jimmy Wong
    + add Github Action workflow for building coffee-project app as docker image and deploying it to staging server([commit](https://github.ncsu.edu/jwong23/CSC-519-Project/commit/7858e8a3558a01f4d77a58f56f48a0ae31186a0a))

* Hsueh-Yang Yu
    + fix Github Action workflow for unit-testing on coffee-project app.([PR](https://github.ncsu.edu/jwong23/CSC-519-Project/pull/15))

* Li-Ling Ku
    + Implement end to end testing using Selenium on coffee-project app.([PR](https://github.ncsu.edu/jwong23/CSC-519-Project/pull/16))
    
    
## Next Steps

* Jae Jimmy Wong: add Github Action workflow for deploying built image to production server

* Hsueh-Yang Yu: add error tracking and performance monitoring.

* Li-Ling Ku: add Github Action workflow for setting up the environment for Selenium test on self-hosted machine


## Retrospective for the Sprint

* What worked?
The repository now has a continuous delivery workflow that serves latest code on the staging server.

* What didn't work?
Unit testing and end-to-end testing requires a database to execute, which did not exist on the Github runner.

* What are we going to do differently?
We are going to use service containers to provide database while running a workflow.


## Additional Project Scope

* Rewrite the coffee project as a three-tier architecture: The architecture increases scalibility, reliability and security of the application. This increases the complexity of the CI/CD pipeline since all automations now involve supporting a full-featured relational database as a background service. We will use container-based solutions to ensure the reproducibility of building and testing environment.

* Add end-to-end testing to the coffee project: The testing validates the application's behavior from start to finish. We will need to simulate a web browser to automate the user interactions such as mouse clicks.

* Add log and system metric collection: The collected data can be used to facilitate debugging and analytic. We will setup up an unified data collector service and install a plugin in each component of the application.

* Add error tracking and performance monitoring: Function tracebacks and request information are recorded when a HTTP request causes internal server error or timeout. We will modify the coffee-project to connect to a tracking service.
