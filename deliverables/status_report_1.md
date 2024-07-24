# Project Status Report 1

## Accomplishments

* Jae Jimmy Wong
    + Rewrite `app.js` to read coffee infomation and orders from PostgreSQL database ([commit](https://github.ncsu.edu/jwong23/CSC-519-Project/commit/47a357be6c33a3ff643072ec83006248c464283b))
    + Write `Dockerfile` for coffee-project which installs NPM packages and runs the web application ([commit](https://github.ncsu.edu/jwong23/CSC-519-Project/commit/cd81013d15faeb58f0330bb7a618abab77c7ce11))

* Hsueh-Yang Yu
    + Create linting and unit testing configuration files which would be automatically executed after pull-requests ([PR](https://github.ncsu.edu/jwong23/CSC-519-Project/pull/2))

* Li-Ling Ku
    + Create Ansible playbooks to apply security patch to the remote machines and setup staging and production environment ([PR](https://github.ncsu.edu/jwong23/CSC-519-Project/pull/1))
    
## Next Steps

* Jae Jimmy Wong: create a Github Action that builds and uploads coffee-project image into staging environment.

* Hsueh-Yang Yu: use GitHub action secret to save database password.

* Li-Ling Ku: develop end-to-end testing using Selenium and create related GitHub Actions.


## Retrospective for the Sprint

* What worked?
    + Our division of work makes us more efficient on completing pipeline features.

* What didn't work?
    + Some marketplace features in GitHub cannot be used.
    + Yarn failed to install packages for coffee-project.

* What are we going to do differently?
    + We will do some research on the NCSU Github environment before implementing new Github Actions.
    + We will choose to use more stable tool, e.g. NPM, rather than newer tool with more features, e.g. Yarn.


