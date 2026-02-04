import {db, disconnectDB} from "../config/connection.js";
import Boarddetails  from "../models/Management.js";
import fs from "fs/promises";
import bcrypt from "bcrypt";

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

    /*
    //  Insert new records (NO callback) with hashed password
     for(let board of boardData){
      board.password = await bcrypt.has(user.password,10)
    }
    await Boarddetails.insertMany(boardData);
    console.log("Inserted board sample data");
    */

    for (let board of boardData){
      const newBoard = new Boarddetails(board);
      await newBoard.save()
    }

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
