const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const Habit = require('./models/Habit');


const habitsData = [
  {
    name: "Exercise",
    description: 11,
    frequency: "Daily",
    status: "pending"
  },
  {
    name: "Read Book",
    description: 33,
    frequency: "Daily",
    status: "pending"
  },
  {
    name: "Meditation",
    description: 11,
    frequency: "Daily",
    status: "pending"
  },
  {
    name: "Drink Water",
    description: 12,
    frequency: "Daily",
    status: "pending"
  }
];




app.get('/', (req, res) => {
  res.send('eweueeeee')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})






const uri = "mongodb+srv://habit_user:5HcSdA55ovY1pZ9A@cluster0.knekqnq.mongodb.net/?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

   app.get('/habits',async(req,res)=>{
      const habits = await Habit.find();
      res.json(habitsData);
   })

    console.log("Pinged your deployment. You successfully connected to MongoDB with the help of mongoose!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);
