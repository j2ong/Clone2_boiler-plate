const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key'); 
const { auth } = require("./middleware/auth"); 
const { User } = require("./models/User");
const port = 5000;

app.use(bodyParser.urlencoded({extended:true})); //encoded된 데이터를 가져오기 위함

app.use(bodyParser.json()) //json 데이터를 가져오기 위함
app.use(cookieParser())


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
  
app.get('/', (req, res) => {  // '/'는 루트 디렉토리, hello world 출력 
  res.send('connect...')
})

app.post('/api/users/register', (req, res) => { //post 기능구현
  //회원가입 시 필요한 정보들을 클라이언트에서 가져오면, 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)

  //save 하기전에 정보를 암호화 해야함 (Bcrypt) , 따라서 User.js에서 그 작업이 이루어진다.

  //postman(클라이언트) 에서 raw->json형식으로  User.js의 포맷에 맞추어 데이터를 보냄
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})


app.post('/api/users/login', (req, res) => {
  //요청된 이메일이 데이터베이스 안에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  //이메일이 있다면, 비밀번호가 같은지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

  //비밀번호가 같다면 TOKEN 생성
  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);

    //토큰을 저장한다.
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})


app.get('/api/users/auth', auth, (req, res) =>{

  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => { 
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.get('/api/hello',(req,res)=>{
  res.send('proxy 통신')
})



app.listen(port, () => {
  console.log(`Example app listening on port :${port}!`)
})