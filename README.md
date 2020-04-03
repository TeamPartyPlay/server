# server

This is the back end server for PartyPlay.

## Setup

0. Clone the Repo
1. run `npm i` in the project directory to download dependencies
2. run `npm start` in the project directory to run application

## Socket Events

| Event Name | Data Received | Direction | Back-End Behavior | Front-End Behavior |
|-|-|-|-|-|
| `updatedPlaylist` | null | Server -> Client | Emits Event | Queries Playlist API for updated information |

## [API](docs/api.md)

Go to API documentation [here](docs/api.md)

## Helpful Resources

[Testing NodeJs/Express API with Jest and Supertest](https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6)
[Jest and Mongoose](https://zellwk.com/blog/jest-and-mongoose/)
[Testing Socket.io with Jest on Backend Node](https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f)
