const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

//pass:zKvLpwewootfjoYl
//user: warehouse

//user: warehouse1
//pass: jhifxgobl57qC0Qi

//pass: aIlMm4LSFD6EB0Xz
// user: atiqul


const uri = "mongodb+srv://atiqul:aIlMm4LSFD6EB0Xz@cluster0.agxjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('connect to Monogodb')
  client.close();
}); */

 async function run(){
    try{
        await client.connect();
        const productCollection = client.db('warehouse2').collection('products');

        app.get('/products', async (req,res)=>{
          const query={};
          const cursor= productCollection.find(query)
          const result= await cursor.toArray()
          res.send(result)
        });

        app.post('/products', async (req,res)=>{
            const data= req.body
            const product = await productCollection.insertOne(data)
            res.send(product)
        });

         app.delete('/products/:id', async(req,res)=>{
         const id= req.params.id;
         const query = {_id:ObjectId(id)}
         const result= await productCollection.deleteOne(query)
         res.send(result)
        }); 

        app.put('/products/:id',async(req,res)=>{
          const id = req.params.id
          const updateProduct= req.body
          const filter = {_id:ObjectId(id)}
          const options = { upsert: true };
          const updateDoc = {
            $set: {
              name: updateProduct.name,
              price:updateProduct.price
            },
          };

          const result= await productCollection.updateOne(filter,updateDoc,options)
          res.send(result)
        })

    }
    finally{

    }

}
run().catch(console.dir); 

app.get("/", (req, res) => {
  res.send(" Hello electronic warehouse Management");
});

app.listen(port, () => {
  console.log("connect from the port", port);
});
