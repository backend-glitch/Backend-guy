import rateLimit from "express-rate-limit";

const limiter = rateLimit({

    windowMs: 1 * 60 * 1000,

    max: 5,

    message: {
        success: false,
        message: "Too many requests, try again later"
    },

    standardHeaders: true,

    legacyHeaders: false

});

export default limiter;