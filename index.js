const express = require('express') //모듈 import
const app = express() //function을 사용하여 app 만들기
const port = 3000 //임의의값 사용가능


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wldldlsp:<alrnr132435>@cluster0.aa49x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    //useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('connect '))
  .catch(err=> console.log(err))

app.get('/', (req, res) => {  // '/'는 루트 디렉토리, hello world 출력 
  res.send('it is ok?')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})