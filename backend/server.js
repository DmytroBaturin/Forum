const express = require('express'),
urlHelper = require('./routes')
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose')
const Role = require('./models/role')
const User = require('./models/user')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser')

const app = express()
const port = 3001
const uri = "mongodb+srv://admin:admin@server.kexcwlh.mongodb.net/?retryWrites=true&w=majority";
const store = new MongoDBStore({
    uri: uri,
    collection: 'mySession'
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 20 * 10
    },
}));


urlHelper.setRequestUrl(app)


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)

})
mongoose.connect(uri).then(async () => {
    const role = await Role.findOne({ role: "ADMIN" });
    if (!role) {
        console.log('ADMIN role not found');
        return;
    }
    const user = await User.findById('655e8e4ed1e211dcbf618a87');
    if (!user) {
        console.log('User not found');
        return;
    }

    if (user.roles.includes(role._id)) {
        console.log('User already has the role');
    } else {
        const userWithRole = await User.findByIdAndUpdate(
            user._id,
            {$push: {roles: role._id}},
            {new: true}
        );
        console.log('User updated with new role:', userWithRole);
    }
}).catch(err => {
    console.log(err)
})
