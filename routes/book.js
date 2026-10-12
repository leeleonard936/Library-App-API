import express from "express";
import db from "../db/connection.js";
// Creates an instance of the Express router, used to define our routes
const router = express.Router();
// Gets a list of all the books in the database
router.get("/", async (req, res) => {
  let collection = await db.collection("books");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
// Lists books that match the query filter
router.get("/browse", async (req, res) => {
  try {
    let collection = await db.collection("books");
    let query = {
      title: { $regex: "Moon", $options: "i" }
    };
    let results = await collection.find(query).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error browsing books");
  }
});
export default router;
