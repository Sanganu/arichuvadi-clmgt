import {db, disconnectDB} from "../config/connection.js";
import Boarddetails  from "../models/Management.js";
import fs from "fs/promises";

async function seed() {
  try {
    // ✅ Connect FIRST
    await db();
    console.log("Connected to MongoDB Atlas");

    const boardData = JSON.parse(
      await fs.readFile(new URL("./board.json", import.meta.url), "utf8")
    );

    //  Optional: delete old records
    await Boarddetails.deleteMany({});
    console.log("Old board records deleted");

    //  Insert new records (NO callback)
    await Boarddetails.insertMany(boardData);
    console.log("Inserted board sample data");

    //  Fetch all records after insert
    const seededData = await Boarddetails.find({});
    console.log("Board data seeded:", seededData.length);

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  } finally {
    // Proper disconnect
    await disconnectDB();
    process.exit(0);
  }
}

seed();
