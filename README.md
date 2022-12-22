# Project Preview

This is my first backend project for backing up the news website. With the APIs i made on this project, you can get articles and sort those articles by authors, topics, and also, you can add and save your comments on every articles. 


# Setup Instructions

## How to clone the repository

If you don't use a password-protected SSH key, clone HTTPS version of URL. 
HTTPS URL = https://github.com/thingamajiggy/My_first_backend_project_newHosting.git

If you want to have your own SSH key, check this out : https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

SSH URL = git@github.com:thingamajiggy/My_first_backend_project_newHosting.git


## NPM INSTALL

After you cloned this file, first thing you have to do is, 'npm install'
You can see what kinds of npm packages you have to install on 'package.json'file.
Which is,

```
    "dotenv": "^16.0.0",
    "express": "^4.18.1",
    "pg": "^8.7.3",
    "supertest": "^6.2.4"
```

- jest and supertest is necessary when you test your code using testsuite.
- express is the library which makes api.
- dotenv is for creating .env file.

And you can see there are 2 parts - devDependencies and dependencies.
devDependencies are the one which is necessary for developers to use for building the app but not necessary for other developers who clone this repository and check how the app works.  

So if you npm install on this repository, you would get those 4 packages above. 

## Minimum version of Node.js and Postgres?

```
node v18.12.0
postgres 13.8

```

## What is .ENV file?

Then another important step is to create `.env.development` (and `.env.test` for testing) to add your environment variables for connecting to the database:

'.env' file sets the required environment variables to make the project work.
As it is the backend project which makes APIs, in this '.env' file, we put our database variable.

DATABASE_URL  composes of username, password, url address, database name like this;

postgres://[user]:[password]@[host]:[port]/[database] 
'port' is an optional thing. If you don't explicitly put port, then the port is going to be psql default port which is 5432

```
DATABASE_URL=<postgres://[user]:[password]@[host]:[port]/[database]>
```

## About the seed data?

In the very beginning, there is no data in our database. That is why we sometimes make dummy data which is called seed data and seed it our repository. You can see seed datas on 'db > data'. That makes it easier to make endpoints and check endpoints to work well. To insert those seed datas into our postgres database, you can type 'npm run seed' in your terminal. 

```
npm run seed
```

# How to run the app?

First, connect a database to the postgres server on your computer.
In the terminal, write down 'psql' then check if the database is well connected and located in your psql databse. To see if the database you connected is on your postgres server, run the command 

```
\l
```

If you found your database then you can connect it to the postgres server. (You can check the database name on 'setup.sql') Like this,

```
\c 'databse_name'
```
If it is successfully connected, you can finally run the app without being crashed. 

```
npm run dev or npm run start
```
In the terminal, you could see 'Listening on 9090(port number)'. That means, your app successfully runs.

From that moment, you can write your endpoint using database!


