# Checkout

Full-Stack Mashgin Take Home Assignment Restaurant Checkout

## Description

### Goal

The aim of this project is to make a *simple* restaurant checkout system that satisfies the following requirements:

- See menu items fetched from the web API
- Add/remove items multiple times to their local cart
- Fill a payment form
- Submit the order to the web API 
- The payment model can have any format and doesn't need to be processed.
- The order submission endpoint should just store the order (items, total and payment) in a file
  or db and return a successful response.

I will focus on procuring those requirements, and after that, and *only after considering I've finished them* will 
move on to include some features that may prove worth-having. Always centering in this being a *simple* app.

### "Architecture"

There are to main directories: `ui` and `server`. 

#### Web UI

Inside the `ui` directory, I will be using a `create-react-app` to make the web UI. This web UI will only communicate with
the server and will focus on showing the screens necessary to accomplish the CRUD requirements.

#### Express Xapi

Inside the `server` directory, I will be using a simple express js server. (All my instincts are telling me to use java 
+ spring, but as Node & Python are the technologies used in Mashgin I'll use Node. I have experience with express
as a node server for internal tooling and none with python as a REST client). 

A postgresql instance will be used to store the information with rather simple tables. No database versioning system will be
used as I consider it to be a bit out of scope for this app. The tables will not have any strange relations nor indexes nor
performance improvements for that matter. Its objective is to be something better than a file to store some info, nothing more.

## Build

### Build the UI

**Disclaimer**: I have a macOs laptop, so running and installing some libraries may differ in a different OS.

I personally like to use [nvm](https://github.com/nvm-sh/nvm) to handle node version

```bash
nvm use v16.13.2
```

or install node v16.13.2 from package manager of choice

``` bash
cd ui
# install the dependencies (make sure you are using the right node version)
npm install
npm run build 
```
The contents of the `/build` directory

### Start the UI

After the build process, run: 
```bash
npm run start
```
and it will run the app in `http://localhost:3000` that you can access from your browser of choice 
(only tested and developed in Chrome, so Chrome is recommended).

### Build the Server

There's a docker compose file inside `docker/postgresql` that will launch a postgresql database with a specific user and password.
To run the docker-compose file you will need to have docker-compose installed, here's a [guide](https://docs.docker.com/compose/install/) if needed.

```bash
cd docker/postgresql
docker-compose up
```

Now that the database is up and running, if no tables exist, we need to run some commands form the server's ORM to generate the tables.

```bash
# inside server directory
npx prisma migrate dev --name "init" --preview-feature
```

The example data was transformed into sql queries, the `inital.sql` has them. You can execute them from your db visualizer of choice,
here are the commands to connect to the docker image from the terminal and run those queries:

```bash
# postgresql_postgres_1 is the image's name, it might differ, you can check running docker instances with `docker ps`
docker exec -it postgresql_postgres_1 sh
# check credentials in the docker compose file, the database name is `test`
psql -U postgres test
# copy and paste the commands and run them through
```

Congrats, you have a db up and running with data.

From the repository root run the following commands to start the express server:

```bash
cd server
npm run start:dev
```

## Test

I didn't have much time to work over this during the weekend as I expected, I won't add any tests. I would only have some time to add
pointless unit tests. For that I am sorry, but I've tried out different aspects from the app manually, and the base happy path works.

## Worth mentioning comments

I will try to make commits as descriptive as possible, but in some case I might need to further explain my thinking 
process I will be using the `docs/logs` directory. There I *might* put markdown files explaining any weird reasoning I 
may stumble upon or think. FYI, I never use that kind of documentation "log", this is only a thing for this interview scenario.

Please read those, I put a lot of love into them. Have a nice day.