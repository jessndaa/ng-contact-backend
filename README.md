# Gestion des contacts | REST API

This project was developped by [Jessy NDAYA](https://github.com/jessndaa).

## Server

Run `npm run dev` for a dev server and  Run `npm run start` for a prod server. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files in case of dev server.

## Documentation

the documentation is done using swagger, go to the configuration folder and modify the `docs/swagger.json` file for any modification thereof, documentation route url `/api-docs`

## Build

Run `npm run build` to build the project and `gcloud builds submit --tag gcr.io/$PROJECT_ID --project $PROJECT_ID` and `docker build ./` to build a docker container. The build artifacts will be stored in the `dist/lib` directory.

## Deployemnt

Run `docker push  gcr.io/$PROJECT_ID/<instance-name></instance-name>` to Deploy the project on google cloud.

## Running unit tests

No unit tests.

## Running end-to-end tests

No e2e tests
