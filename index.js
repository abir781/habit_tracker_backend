const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const Habit = require('./models/Habit');
const User = require('./models/User');



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


app.get('/habitscollection', async (req, res) => {
  try {
    const email = req.query.email;

    // email না থাকলে error return
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const habits = await Habit.find({ useremail: email });

    res.status(200).send(habits);

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

app.get('/usercollection', async (req, res) => {
  try {
    const email = req.query.email;

    // email না থাকলে error return
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const userdata = await User.find({ email: email });

    res.status(200).send(userdata);

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

app.post('/habitscollection', async (req, res) => {
  const savedHabit = await Habit.create(req.body); // single object save
  res.status(201).json(savedHabit);
});

app.patch("/habits/:id/complete", async (req, res) => {
  const id = req.params.id;
  const today = new Date().toISOString().split("T")[0];

  const result = await Habit.updateOne(
    { _id: id },
    { $addToSet: { completedDates: today }
     
     }
  );

  res.send(result);
});

app.patch("/users/:id/complete", async (req, res) => {
  const id = req.params.id;
  const today = new Date().toISOString().split("T")[0];

  const result = await Habit.updateOne(
    { _id: id },
    { $addToSet: { completedDates: today },
      $inc: { score: 5 }
     }
  );

  res.send(result);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: "User not found" })

    if (user.password !== password)
      return res.status(400).json({ message: "Wrong password" })

    const token = jwt.sign({ id: user._id }, "my_super_key", {
      expiresIn: "7d"
    })

    res.json({
      message: "Login success",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role}
    })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})


app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      role:"user", // ✅ Ideally hash the password using bcrypt
    });

    await newUser.save();

    // Generate JWT token using secret "my_super_key"
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "my_super_key", // your secret key
      { expiresIn: "1d" } // token valid for 1 day
    );

    // Send user + token for auto login
    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

    console.log("Pinged your deployment. You successfully connected to MongoDB with the help of mongoose!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);
