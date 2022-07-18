const express = require('express')
const mongoose = require('mongoose') 
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRED
} = require('./config/config')
const postRouter = require('./routers/postRouters')
const userRouter = require('./routers/userRouters')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
    legacyMode: true
})
redisClient.connect()
.then(() => console.log('successfully connected redis'))
.catch(console.error)

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`

mongoose.connect( mongoURL )
    .then((resp) => console.log('successfully connected to mongo'))
    .catch( e => console.log('our error is :' ,e))


app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRED,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000   
    }
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h2>Hi Behnam</h2>')
})

app.use( '/api/v1/posts', postRouter )
app.use( '/api/v1/users', userRouter )
const port = process.env.PORT || 3001;

app.listen( port , () => console.log(`listening on port ${port}`))