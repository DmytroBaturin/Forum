const user = require("./controllers/userController"),
admin = require("./controllers/adminController"),
auth = require("./controllers/authController"),
authmiddleware = require("./middleware/authMiddleware"),
middleware = require("./middleware/roleMiddleware"),
usermiddleware = require("./middleware/userAccessMiddleware")

exports.setRequestUrl = (app) => {
    //userController
    app.post('/createTopic', authmiddleware.isAuth, user.createTopic)
    app.post('/addComment', authmiddleware.isAuth, user.addComment)
    app.get('/getAllTopics', user.getAllTopic)
    app.get('/getTopic/:id', authmiddleware.isAuth, user.getTopic)
    app.delete('/deleteTopic/:id', authmiddleware.isAuth, usermiddleware, user.deleteTopic)
    app.get('/categories', authmiddleware.isAuth, user.getCategories)

    //adminController
    app.delete('/deleteUser', authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.deleteUser)
    app.delete('/deleteUserRole', authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.deleteRole)
    app.delete('/deleteAllUsers', authmiddleware.isAuth,middleware.rolemiddleware(['ADMIN']), admin.deleteAllData)
    app.delete('/deleteAllTopics',authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.deleteAllData)
    app.get('/getUsers', authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.getUsers)
    app.put('/giveRole', authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.giveRole)
    app.get('/getRoles', authmiddleware.isAuth, middleware.rolemiddleware(['ADMIN']), admin.getRoles)

    //authController
    app.get('/check-session', auth.checkSession)
    app.post('/register', auth.registration)
    app.post('/login', auth.login)
    app.post('/logout', auth.logout)
}