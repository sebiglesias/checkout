# Checkout

Full-Stack Mashgin Take Home Assignment Restaurant Checkout


https://user-images.githubusercontent.com/13668861/151705776-497baca9-422e-48f2-af18-8cf3d82b9c91.mov


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


![image](https://user-images.githubusercontent.com/13668861/151718282-25705adb-5d76-435e-80b7-58ec170ce555.png)

For a restaurant checkout system, I imagine myself in front of a Mac Donald's checkout machine (image as a reference) where I'm
I'm about to order something to eat. Therefore, there are some aspects I consider contextual that would happen outside this program.

Assumptions I made (that can easily be wrong, it is just my own interpretation of the app's context) and extracted from those requirements:

- I chose to **simplify the payment** by just allowing to pay by cash, there were too many possible use cases if it were to be an endpoint I call to pay,
that for sake of simplicity and my sanity, I decided to not have a payment form, rather disallow the use of credit cards or other payment options as if the
machine did not allow so. I gave it a few attempts, but just having a simple payment form with no features annoyed me. I would try to have a generic endpoint,
but it was never generic enough because I always thought of new cases to use as payment.
- **No food delivery**, that would be outside of scope as it is not mentioned, but I think it would be valid to have at least a delivery step with a
fixed "Eat here" option. But then again, the app plans to be simple and leave delivery outside of it.
- **No ticket or voucher**, there only is a screen showing the bought things and nothing else, delivering a voucher after finalizing the order would be something 
to do outside of this app. Maybe by a cashier or by a machine.
- **No search bar**, I thought about it, I did an iteration with it, I didn't like it. Does it search by category? Does it search by product name? Does it 
perform a search to the server? Does it search only the page the user sees? I think search bars are quite opinionated, and tend to carry unnecesary discussion
unless defined as a requirement. I opted for having a no search bar solution.
- **No pagination** was added for items or categories was added. I assumed this to be out of scope, mainly because it was not mentioned specifically, but I
know that I shouldn't request and showcase the hundreds of possible products in a single page. As I mentioned before, I'm picturing this app to be used in a 
macdonalds and there aren't those many product options to begin with.
- **Cart stored in memory** of the browser. "Oh my friend is coming, let me store the cart with all the things I picked and let someone else order something" No.
A user should select items (with a quantity that can be altered and even removed) to add in the cart, and then that same cart should continue to finishing the
order and be done with it. I didn't mean to extend this app and have the cart in the database to let the marketing team run campaigns and offer discounts
depending on the user's cart. One can cancel the order at any step and start from scratch looking at the catalogue. For simplicity sake.
- **Add & remove items from both cart and product catalogue**

### "Architecture"

Taking into account those assumptions I made the following diagram that shows the basic interactions of this system. 

![image](https://user-images.githubusercontent.com/13668861/151718124-8160a0da-8fe5-4138-acd1-aeadcab36a86.png)

The User interacts with the Web UI, which calls the API and store the info in a database.

There are two main directories in this repository that match the rectangles shown above: `ui` and `server` directories. 

#### Web UI

Inside the `ui` directory, I will be using a `create-react-app` to make the web UI. This web UI will only communicate with
the server and will focus on showing the screens necessary to accomplish the CRUD requirements. There are some thing worth mentioning in terms of libraries used.
I've used Typescript, which adds a layer of static typing on top of Javascript that I'm really fond of. Also, I've used redux to handle the store, reducers and 
actions. I chose to keep each file related to each specific component inside the same directory at root level (with .scss, .tsx, sometimes typings, hooks and
slices too). Some people prefer to have it mixed up, but I prefer to keep them separated, I believe it forces me to think of them as reusable. Then again, I'm 
more than happy to discuss other UI component directory arrangements.

#### Express Xapi

Inside the `server` directory, I will be using a simple express js server. (All my instincts are telling me to use java 
+ spring, but as Node & Python are the technologies used in Mashgin I'll use Node. I have experience with express
as a node server for internal tooling and none with python as a REST client). 

A postgresql instance will be used to store the information with rather simple tables. No database versioning system will be
used as I consider it to be a bit out of scope for this app. The tables will not have any strange relations nor indexes nor
performance improvements for that matter. Its objective is to be something better than a file to store some info, nothing more.

I come from the Java ecosystem, with Spring as a go-to framework for REST APIs, I know where each thing goes in it and how to arrange it and abstract it.
I'm not familiar with express, even though I've used it as a replacement for nginx and other proxy solutions in some cases. They always tended to be small,
so I usually put everything in 1 file. I don't like that, I would like to have a certain abstraction from the ORM, and the endpoints and be able to interchange
them without affecting much one or the other. Its my first time using an ORM with express, I was able to make it work. It is not clean and it bugs me that I didn't have more time to order it.

Ideally, I would have an api that handles communication with the database, that has the ORM and that's it, no business logic. And I would have another api with the business logic.
If given the chance I would love to discuss about it, but I didn't want to make it complex and just stuck everything in one file. I guess that I could have at least moved the `prisma` logic to other functions and calling them from the endpoint's code. But then again, I'm not familiarized with conventions using express
as an API REST that serves content and didn't want to do something "disgraceful" or really weird.

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
