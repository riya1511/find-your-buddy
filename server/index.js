const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config()
const uri = process.env.URI

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to my app!");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);

  const { email, password } = req.body;

  const generateUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists!");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashedPassword: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generateUserId });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);

  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(password, user.hashedPassword);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });

      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json("Invalid credentials");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});

app.get("/skilled-users", async (req, res) => {
  const client = new MongoClient(uri);

  const skill = req.query.skill;

  // console.log(skill);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { mySkill: { $eq: skill } };

    const foundUsers = await users.find(query).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);

  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };

    const user = await users.findOne(query);

    res.send(user);
  } finally {
    await client.close();
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);

  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        firstName: formData.firstName,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        gender_identity: formData.gender_identity,
        show_gender: formData.show_gender,
        mySkill: formData.mySkill,
        skills: formData.skills,
        about: formData.about,
        image: formData.image,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

app.put("/addmatch", async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  const userIds = JSON.parse(req.query.userIds);
  // console.log(userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    // console.log(foundUsers);
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, correspondingUserId } = req.query;
  console.log(userId, correspondingUserId);

  try {
    await client.connect();
    const database = client.db("app-data");

    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };

    const foundMessages = await messages.find(query).toArray();

    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

app.post("/message", async (req, res) => {
    const client = new MongoClient(uri);

    const message = req.body.message
try {
    await client.connect();
    const database = client.db("app-data");

    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message)

    res.send(insertedMessage)
} finally {
    await client.close()
}
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
