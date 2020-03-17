# Invite

|Method|Endpoint|Usage|Returns
|-|-|-|-|
|GET   | `/api/invite/user/:id`  | Get All invites by user  | Invites[]
|GET   | `/api/invite/event/:id` | Get All invites by event | Invites[]
|POST  | `/api/invite/accept`    | Accept Invite  | Invite
|POST  | `/api/invite/decline`   | Decline Invite | Invite
|POST  | `/api/invite/seen`      | Invite seen    | Invite
