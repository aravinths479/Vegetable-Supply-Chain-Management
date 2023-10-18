const express = require("express")
const app = express()


const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBroExpress = require('@admin-bro/express');



const  User = require("./models/User")
const Tomato = require("./models/Tomato")
const Insight = require("./models/Insight") 

AdminBro.registerAdapter(AdminBroMongoose);


const admin = new AdminBro({
  resources: [User,Tomato,Insight],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(admin);

app.use(admin.options.rootPath, router);
app.listen(3001,()=>{
    console.log("DB Adminstration running on port : 127.0.0.1:"+ 3001);
})