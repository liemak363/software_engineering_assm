const systemConfig = require("../../configs/system.js")

const homeRouter = require("./home_router.js");
const logRouter = require("./log_router.js")
const loginRouter = require("./login_router.js")
const mngRouter = require("./mng_priter_router.js")
const reportRouter = require("./report_router.js")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/', homeRouter);
    app.use(PATH_ADMIN + '/log', logRouter);
    app.use(PATH_ADMIN + '/login', loginRouter)
    app.use(PATH_ADMIN + '/mng_printer', mngRouter);
    app.use(PATH_ADMIN + '/report', reportRouter)
}