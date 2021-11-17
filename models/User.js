const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema =  mongoose.Schema({
    name : {
        type : String,
        maxlength: 50
    },
    email:{
        type : String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }

})

userSchema.pre('save',function( next ){
    var user = this;

    if(user.isModified('password')){ //호출될때마다 암호화 하는것이 아니라, 패스워드가 변경될 때에만 암호화 
        bcrypt.genSalt(saltRounds, function(err, salt) { //salt를 사용해서 암호화 하기 위하여 salt를 생성->saltRounds는 salt의 길이
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) { 
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    //평문을 암호화한 후, 데이터베이스에 암호화되어있는 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err);
            cb(null,isMatch) 
    })
}


userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}
const User = mongoose.model('User',userSchema)
module.exports = {User}