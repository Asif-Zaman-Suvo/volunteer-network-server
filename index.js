const express=require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ntjr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(cors())
const port = 5000;




const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("information");
  console.log("database connected")
  

  app.post('/addInfo',(req,res)=>{
    const newRegister =req.body;
    console.log(newRegister)

  })



  
});

app.get('/', (req, res) => {
  res.send('this is working')
})


app.listen(port)