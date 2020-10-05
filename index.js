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
  const infoCollection = client.db("volunteerNetwork").collection("information");
  console.log("database connected")
  

  app.post('/addInfo',(req,res)=>{
    const newRegister =req.body;
    infoCollection.insertOne(newRegister)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
   

  })

  app.get('/info',(req,res)=>{
    infoCollection.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)

    })

  })

  app.delete('/delete/:id', (req, res) => {
    infoCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      });
  });
});


app.get('/', (req, res) => {
  res.send('this is working')
})


app.listen(process.env.PORT || port)