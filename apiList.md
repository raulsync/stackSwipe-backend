# stackSwipe Apis

#### authRouter

- POST /signup - done
- POST /login - done
- POST /logout - done

#### profileRouter

- GET /profile/view - done
- Patch /profile/edit - done
- Patch /profile/password - done

#### connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request /send/ignored /:userId
- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId

#### userRouter

- GET /user/request/received
- GET /user/connections
- GET /user/feed //get profile of other users on platform

Status : interested, ignore, accepted, rejected
