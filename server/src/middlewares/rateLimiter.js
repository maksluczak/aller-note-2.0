const rateLimit = require('express-rate-limit')

const jsonLimitHandler = (message) => (req, res) => {
    res.status(429).json({ message });
};

const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // 5 login/register attempts per window
    handler: jsonLimitHandler('Too many attempts. Try again in 5 minutes.')
});

const refreshLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 30, // refresh runs automatically, so it needs a looser budget than login/register
    handler: jsonLimitHandler('Too many refresh attempts. Try again in 5 minutes.')
})

module.exports = {
    authLimiter,
    refreshLimiter
}
