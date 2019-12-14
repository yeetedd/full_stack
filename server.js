const express = require('express')
const app = express();
const db = require('./queries')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("kuuntelen porttia" + " " + port));

app.use(express.static("public"));

//app.use(express.json({limit: '1mb'}));


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const arvostelut = [
  {
    "leffa":"Titanik",
    "arvostelu":"Klassikkodraamaa",
    "arvostelija":"mika",
  },
  {
    "leffa":"starwars",
    "arvostelu":"silmäkarkkia",
    "arvostelija":"suvi"
  }
]

app.get('/api/arvostelut/vanha', function (recuest, response){
  response.send(arvostelut);
})

app.post('/api/arvostelu/vanha/vanha', function (recuest, response){
  console.log("leffan arvostelu");
  console.log(recuest.body);
  arvostelut.push(recuest.body);
  console.log(arvostelut);
  response.send(200);
})

app.get('/api/arvostelut', db.haeArvostelut)
app.post('/api/arvostelu', db.luoArvostelu)
