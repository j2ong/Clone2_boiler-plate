const express = require('express') //모듈 import
const app = express() //function을 사용하여 app 만들기
const port = 3000 //임의의값 사용가능
const bodyParser = require('body-parser');
const {User} = require('./models/user');

const config = require('./config/key')


app.use(bodyParser.urlencoded({extended:true})); //encoded된 데이터를 가져오기 위함
app.use(bodyParser.json()) //json 데이터를 가져오기 위함

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{

}).then(()=>console.log('db connect ok'))
  .catch(err=> console.log(err))
  
app.get('/', (req, res) => {  // '/'는 루트 디렉토리, hello world 출력 
  res.send('connect...')
})

app.post('/register',(req,res)=> { //post 기능구현
  //회원가입 시 필요한 정보들을 클라이언트에서 가져오면, 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)


  //postman(클라이언트) 에서 raw->json형식으로  User.js의 포맷에 맞추어 데이터를 보냄
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true  
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port :${port}!`)
})