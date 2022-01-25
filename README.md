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

TO BE DONE
 // I aim to have one docker file for the client and another one for the server and run them both with a docker-compose file.
Publishing the images to dockerhub may be considered. Having a unix setup with docker & docker compose installed may be necessary.
In any case, I will leave the commands to setup and run the environment locally outside a docker container as well.


## Test

TO BE DONE

## Worth mentioning comments

I will try to make commits as descriptive as possible, but in some case I might need to further explain my thinking 
process I will be using the `docs/logs` directory. There I *might* put markdown files explaining any weird reasoning I 
may stumble upon or think. FYI, I never use that kind of documentation "log", this is only a thing for this interview scenario.