# API

## Events

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/event` | Get current event by id | Event
|GET   | `/api/event/:id` | Get a event by id | Event
|POST  | `/api/event` | Create new event | Event
|POST  | `/api/event/join/:id` | User joins event | Event
|POST  | `/api/event/exit/:id` | User exits event | Event
|PUT   | `/api/event/`    | Update current event | Event
|PUT   | `/api/event/:id` | Update event by id | Event
|DELETE| `/api/event/:id` | Delete Event by id | Event

## Playlist

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/playlist`        | Get current playlist    | Playlist
|GET   | `/api/playlist/:id`    | Get a playlist by id    | Playlist
|GET   | `/api/playlist/stream` | Stream the playlist     | Stream of Playlist
|POST  | `/api/playlist`        | Start new Playlist      | Playlist
|POST  | `/api/playlist/:id`    | User joins a playlist   | Playlist
|POST  | `/api/playlist/vote`   | Vote on track           | Vote
|PUT   | `/api/playlist`        | Update current playlist | Playlist
|PUT   | `/api/playlist/:id`    | Update playlist by id   | Playlist
|DELETE| `/api/playlist/:id`    | Delete a playlist

## Invite

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/invite/user/:id`  | Get All invites by user  | Invites[]
|GET   | `/api/invite/event/:id` | Get All invites by event | Invites[]
|POST  | `/api/invite/accept`    | Accept Invite  | Invite
|POST  | `/api/invite/decline`   | Decline Invite | Invite
|POST  | `/api/invite/seen`      | Invite seen    | Invite

## Spotify

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/spotify/secrets`    | Get secrets            | Secret
|GET   | `/api/spotify/tokens`     | Get Tokens             | Token Information
|GET   | `/api/spotify/stream/:id` | Get Stream of playlist | Stream of Spotify Playlist

## User

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/user`        | Get current user       | User
|GET   | `/api/user/:id`    | Get user by id         | User
|POST  | `/api/user`        | Post new user          | User
|POST  | `/api/user/image`  | Post new profile image | User
|POST  | `/api/user/login`  | Login user             | User
|POST  | `/api/user/logout` | Logout user            |
|PUT   | `/api/user`        | Update current user    | User
