const jwt = require("jsonwebtoken")
const userModel = require("../models/user_model.js")
const Blacklist = require("../models/blacklist_model.js")
const { SECRET_ACCESS_TOKEN } = require("../configs/system.js")

const decode_token = async (res, token, handleUnverifiedToken) => {
    try {
        if (!token) {
            handleUnverifiedToken()
            return;
        }

        const accessToken = token.SessionID
        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
        // if true, send an unathorized message, asking for a re-authentication.
        if (checkIfBlacklisted) {
            handleUnverifiedToken()
            return;
        }
        // if token has not been blacklisted, verify with jwt to see if it has been tampered with or not.
        // that's like checking the integrity of the accessToken

        // Verify using jwt to see if token has been tampered with or if it has expired.
        // that's like checking the integrity of the cookie

        let decoded_token
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                handleUnverifiedToken()
                return;
            }

            decoded_token = decoded
        })

        return decoded_token
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const verify = async (req, res, next, role) => {
    const authHeader = req.signedCookies
    const decoded = await decode_token(res, authHeader, () => {
        res.redirect("/role");
    })

    if (decoded) {
        if (decoded.role !== role) {
            res.send("you are not authorized to access this page");
            return;
        }

        req.user = decoded.id; // put the data object into req.user
        next();
    }
}

module.exports.verify_user = async (req, res, next) => {
    await verify(req, res, next, "user");
}

module.exports.verify_admin = async (req, res, next) => {
    await verify(req, res, next, "admin");
}

module.exports.check_role = async (req, res, next) => {
    const authHeader = req.signedCookies
    const decoded = await decode_token(res, authHeader, () => {
        next();
    })

    if (decoded) {
        if (decoded.role === "admin") {
            res.redirect("/admin");
            return;
        } else {
            res.redirect("/");
            return;
        }
    }
}