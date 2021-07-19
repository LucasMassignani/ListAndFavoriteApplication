# My Favorite List
This application has the objective to list items from two distinct APIs sources.

The chosen apis are: 
- [Art Institute of Chicago API](https://api.artic.edu/docs/#quick-start)
- [Fake Store API](https://fakestoreapi.com)

# Configurations
- Postgres
- yarn
- node (version used is 16.5.0

# Backend
Start going to the folder “backend” and install the libraries with the command “yarn” or “npm install”.

## Database
First you need to create a Postgres database called “desafio-growth-hackers”. After that you will need to create a file on backend root called “ormconfig.json”, you can use the file “ormconfig.example.json” to do this. Then change the values of this file to fit your DB.
After all run the command “yarn typeorm migration:run” or “npm run typeorm migration:run”

## Create .env
The application needs a file called “.env”, you can create that file on the backend root and use “.env.example” as template.
The only information on this file is APP_SECRET, this is the value application uses to create JWT tokens.

## Start Backend
To start the backend you can run the command “yarn dev” or “npm run dev”.

# Frontend
Start going to the folder “frontend” and install the libraries with the command “yarn” or “npm install --force”.

## Backend baseurl
This explanation is only for the ones that are not running the backend on localhost.
If you are not running the backend on localhost you need to change the file “src/services/api.ts”. On this file change the value of baseURL to fit your case.

## Start Frontend
To start the frontend you can run the command “yarn start” or “npm run start”.

