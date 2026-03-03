const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
const mongoose = require('mongoose');
const Habit = require('./models/Habit');


app.use(express.json());
app.use(cors());


// const habitsData = [
//   {
//     name: "Exercise",
//     description: "ghgh",
//     frequency: "Daily",
//     status: "pending"
//   },
//   {
//     name: "Read Book",
//     description: "ghgh",
//     frequency: "Daily",
//     status: "pending"
//   },
//   {
//     name: "Meditation",
//     description: "ghgh",
//     frequency: "Daily",
//     status: "pending"
//   },
//   {
//     name: "Drink Water",
//     description: "ghgh",
//     frequency: "Daily",
//     status: "pending"
//   }
// ];




app.get('/', (req, res) => {
  res.send('eweueeeee')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})






const uri = "mongodb+srv://habit_user:5HcSdA55ovY1pZ9A@cluster0.knekqnq.mongodb.net/habitDB?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

  //  app.get('/habits',async(req,res)=>{
  //     const habits = await Habit.find();
  //     res.json(habitsData);
  //  })

//    app.post('/habitscollection', async (req, res) => {
//   try {
//     const savedHabits = await Habit.insertMany(req.body); // ✅ array support
//     res.status(201).json(savedHabits);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

app.post('/habitscollection', async (req, res) => {
  const savedHabit = await Habit.create(req.body); // single object save
  res.status(201).json(savedHabit);
});

    console.log("Pinged your deployment. You successfully connected to MongoDB with the help of mongoose!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);
