const jwt = require("jsonwebtoken")

// Token Verification Middleware for Password Reset
module.exports.verifyPasswordReset = (req, res, next) => {
    const token = req.header('authorization') || null
    if(!token) return res.status(401).send("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.JWT_PASSWORD_RESET) /** JWT_PASSWORD_RESET */
        req.user = verified
        next()
    } catch (error) {
        return res.status(403).send("Invalid token")
    }
}

// Token Verification Middleware
module.exports.verifyUser = (req, res, next) => {
    const token = req.header('authorization') || null
    if(!token) return res.status(401).send("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET) /** JWT_PASSWORD_RESET */
        req.user = verified
        next()
    } catch (error) {
        return res.status(403).send("Invalid token")
    }
}