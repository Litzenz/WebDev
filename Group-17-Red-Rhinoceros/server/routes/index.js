var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

//const md5 = require('blueimp-md5')
//const {UserModel} = require('../db/db').UserModel
const filter = {password:0}

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())


// import mongoose and md-5
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

// Set up the database to connect
mongoose.connect('mongodb+srv://webrtc:cs732@cluster0-jnh20.mongodb.net/test')

const conn = mongoose.connection

conn.on("connected", function(){
    console.log("DataBase connected")
})

// Set up Schema
const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
    email: {type: String, required: true}
});

// Set up Model
const UserModel = mongoose.model('user', userSchema);

// get the homepage
router.get('/', function(req, res){
    res.json({code:1, msg: 'No Login'})
})

// define a router for users to sign up
router.post('/signup', function(req, res){
    // get the variables
    const {username, email, password} = req.body
    UserModel.findOne({username}, function (err, userDoc) {
        if(err){return res.json({code: 1, msg: 'Unable to reach the server'})}
        if(userDoc){
            // fail to register, return the warning
            res.send({code:1, msg:'This username has been used!'})

        } else {
            // restore the user information in the database
            new UserModel({username, email, password: md5(password)}).save(function (err, userDoc){
                // create a cookie to browser, expire time: one day
                // res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
                // return the userDoc without password
                const data = {username, email, _id:userDoc._id}
                res.send({code:0, data})
            })
        }

    })

})

// define a router for users to sign in
router.post('/signin', function(req, res){
    // get the variables
    const {username, password} = req.body
    UserModel.findOne({username: username, password: md5(password)}, function (err, userDoc) {
        if(userDoc){ // login success
            // create a cookie to browser, expire time: one day
            // res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
            // confirm
            res.send({code:0, data: userDoc})

        } else {
            res.send({code:1, msg: 'username or password is incorrect'})
        }

    })

})

module.exports = router