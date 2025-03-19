const jwt = require("jsonwebtoken")
const userModel = require("../models/user_model.js")
const Blacklist = require("../models/blacklist_model.js")
const { SECRET_ACCESS_TOKEN } = require("../configs/system.js")

const verify = async (req, res, next, role) => {
    try {
        const authHeader = req.signedCookies // get the session cookie from request header

        if (!authHeader) {
            res.redirect("/role");
            return;
        } 

        const accessToken = authHeader.SessionID
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // if true, send an unathorized message, asking for a re-authentication.
        if (checkIfBlacklisted) {
            res.redirect("/role");
            return;
        }
        // if token has not been blacklisted, verify with jwt to see if it has been tampered with or not.
        // that's like checking the integrity of the accessToken

        // Verify using jwt to see if token has been tampered with or if it has expired.
        // that's like checking the integrity of the cookie
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                res.redirect("/role");
                return;
            }

            if (decoded.role !== role) {
                res.send("you are not authorized to access this page");
                return;
            }

            req.user = decoded.id; // put the data object into req.user
            next();
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

module.exports.verify_user = async (req, res, next) => {
    await verify(req, res, next, "user");
}

module.exports.verify_admin = async (req, res, next) => {
    await verify(req, res, next, "admin");
}