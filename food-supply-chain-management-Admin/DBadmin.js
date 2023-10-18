const express = require("express")
const app = express()


const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBroExpress = require('@admin-bro/express');



const AdminUser = require("./models/AdminUser")
const Tomato = require("./models/Tomato")
const Insight = require("./models/Insight") 
const Trade = require("./models/Trade")
const User = require("./models/User")
const Transporter = require("./models/Transporter")
const Transport = require("./models/Transport")


AdminBro.registerAdapter(AdminBroMongoose);


const admin = new AdminBro({
  resources: [AdminUser,User,Tomato,Insight,Trade,Transporter,Transport],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(admin);

app.use(admin.options.rootPath, router);
app.listen(4001,()=>{
    console.log("DB Adminstration running on port for Admin: 127.0.0.1:"+ 4001);
})
