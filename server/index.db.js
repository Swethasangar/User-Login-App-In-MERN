import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(cors());

const MONGO_URI =
  "mongodb+srv://swetha:dHV0U22dXRHstv84@login-cluster.endts.mongodb.net/?retryWrites=true&w=majority&appName=Login-Cluster";

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDatabase = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("loginApp").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
connectDatabase().catch(console.dir);

// const users = [
//   {
//     email: "abc@gmail.com",
//     password: "123",
//   },
// ];

const check = (a, b) => {
  return a === b;
};

const findExistingUser = async (email) => {
  // Upsert->Update+insert
  return client.db("loginApp").collection("user").findOne({ email });
};

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findExistingUser(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User email already exists.Please Log In Instead!",
      });
    }

    const userPayload = { email, password };

    // users.push(userPayload);
    client.db("loginApp").collection("user").insertOne(userPayload);

    return res.status(201).json({ message: "User Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;

    const existingUser = await findExistingUser(email);

    if (!existingUser) {
      return res.status(404).json({
        message: "User Email Not Found.Please Sign Up Instead!",
      });
    }

    if (check(password, existingUser.password)) {
      return res.status(200).json({ message: "User Logged In" });
    }
    return res.status(400).json({ message: "Invalid Credential" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const mongoId = new ObjectId(id);

    const resp = await client
      .db("loginApp")
      .collection("user")
      .deleteOne({ _id: mongoId });

    if (resp.deletedCount === 0) {
      return res.status(404).json({ message: "User Id Not Found" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { newPassword } = req.body;

    const mongoId = new ObjectId(id);

    const resp = await client
      .db("loginApp")
      .collection("user")
      .updateOne({ _id: mongoId }, { $set: { password: newPassword } });

    if (resp.modifiedCount === 0) {
      return res.status(404).json({ message: "User Id Not Found" });
    }

    return res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}...`);
});
