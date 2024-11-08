# stackSwipe Apis

#### authRouter

- POST /signup
- POST /login
- POST /logout

#### profileRouter

- GET /profile
- Patch /profile
- DELETE /profile

#### connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request /send/ignored /:userId
- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId

#### userRouter

- GET /user/connections
- GET /user/request/received
- GET /user/feed //get profile of other users on platform

Status : interested, ignore, accepted, rejected