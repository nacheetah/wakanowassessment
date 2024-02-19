# Local Setup

- Clone the repository by running the command `git clone git@github.com:nacheetah/wakanowassessment.git`
- Navigate into the newly created directory `wakanowassessment` by running the command `cd wakanowassessment`
- Install project dependencies with the command `yarn` or `npm install`
- Start the Development server by running `npm start` or `yarn start`

### Credentials for Default Admin User

**Email:** nacheetah70@gmail.com
**Password:** password

# What was achieved in this project so far

I built a fullstack application with the stated requirements. I designed the UI and experience on Figma, you can find it **[here](https://www.figma.com/file/19hWiZDRDhnPGXYdIeVrht/Untitled?type=design&node-id=92%3A122&mode=design&t=Brfte2wmxBSvCEdG-1)**.
I also built a Node/Express backend API (hosted on [Render](https://render.com)) to cater to the specificity of the task's requirement which I integrated with the frontend of the application. [Here's](https://github.com/nacheetah/wakanowassessment-backend) the repo for the Backend API.\*\*

**Below is a list of the features of the application.**

- **Authentication:** A user can sign up (register) but can only log in after being _**approved**_, after which the _**approved**_ user becomes an admin, and can approve the next user that signs up, at the same time the user loses approval right but has read/write access to the user he/she approved. Hence, every user has an admin, and is an admin, except for unapproved users. A user can also sign in with a token that expires after an hour.
- **Right's and privileges:** An _**Admin**_ is user that has been approved after signing up. An _**Admin**_ has read and write access (CRUD) to the user he approves, but only has read access to his own data and records.
- **Error handling:** I handled most API error cases (I was in such a hurry and might have unintentionally left out some parts). That way even when an error occurs the user is notified in a human-friendly manner and the application doesn't break.
- **Robust:** I uitilized both the well-known NgModule API and newer Standalone components while building this application in order to emphasize on my understnding of the core concept of Angular, Dependency Injection.

# Issues encountered

Apart from the tight deadline and Monday fatigue, it was a pretty basic but fun task. I have my preferences when it comes to file structure of an Angular project, especially when mixing up NgModules and Standlone components.

> **PS:** I would have loved to go ballistic with pop-up modals for success and error messages, validations for input fields and so on but the time was quite short.
