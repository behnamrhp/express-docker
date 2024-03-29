module.exports = {
    MONGO_USER : process.env.MONGO_USER,
    MONGO_PASSWORD : process.env.MONGO_PASSWORD,
    MONGO_IP : process.env.MONGO_IP || 'mongo',
    MONGO_PORT : process.env.MONGO_PORT || 27017,
    REDIS_URL : process.env.REDIS_URL || 'redis',
    REDIS_PORT : process.env.REDIS_PORT || 6379,
    SESSION_SECRED: process.env.SESSION_SECRED
}