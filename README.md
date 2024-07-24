# CSC 519 DevOps Project

### Team Member
* Jae Jimmy Wong (jwong23)
* Hsueh-Yang Yu (hyu25)
* Li-Ling Ku (lku)

### Deliverables
* [Project Proposal](deliverables/project_proposal.pdf)
* [Status Report 1](deliverables/status_report_1.md)
* [Status Report 2](deliverables/status_report_2.md)
* [Final Report](deliverables/final_report.pdf)

### Project Description
* [Coffee-project](coffee-project): Adapted from Dr John-Paul Ore's coffee-project.
  - [index.html](coffee-project/public/index.html): This html file is the front-end page of the coffee project.
  - [script.js](coffee-project/public/script.js): This is the front-end script of the coffee project.
  - [app.js](coffee-project/app.js): This file is the back-end server of the coffee project, it connects to PostgreSQL, receives requests from the front-end, and send information to be displayed as a web page.
  - [e2e_test.py](coffee-project/test/e2e_test.py): We utilize Selenium to implement end-to-end testing in this file.
  - [unit_test.py](coffee-project/test/unit_test.py): We choose Chai as the assertion tool and run the scripts with Mocha as the unit test of this project. 


* [Configuration](configuration): We put files that are related to environment configuration in this folder.
  - [files for Ansible](configuration/ansible)
    - [0-update-security.yaml](configuration/ansible/0-update-security.yaml): Apply security patches and update all the Ubuntu packages on the staging and production server.
    - [1-setup-config.yaml](configuration/ansible/1-setup-config.yaml): Install required system packages, install and start Docker, PostgreSQL, and nginx on the staging and production server.
    - [hosts.yaml](configuration/ansible/hosts.yaml): The ansible inventory file.
    - [default](configuration/ansible/default): This is the nginx configuration file that will be installed on the staging and production server.
  - Database setup file
    - [init.sql](configuration/database/init.sql): We use this file to initialize our database.
 
* [Github workflows](workflow-file): We put files that configure the Github Actions in this folder. (Should move to .github/workflows to make it work)
  - [develop.yaml](workflow-file/develop.yaml): The workflow performs linting and unit testing when a pull request to the `develop` branch is created.
  - [staging.yaml](workflow-file/staging.yaml): The workflow deploys codes onto the staging server and performs end-to-end testing. If the testing failed, it automatically create a GitHub issue to notify developers.
  - [production.yaml](workflow-file/production.yaml): The workflow deploys codes into the production server and creates a GitHub release when a pull request is merged into the `main` branch.
