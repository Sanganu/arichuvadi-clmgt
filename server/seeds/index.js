import db from "../config/connection.js";
import Management from "../models/Management.js";
import fs from "fs/promises";


async function seed(){
    try{
      
        console.log("Connected to MongoDB Atlas");
        const boardData = JSON.parse(
            await fs .readFile(new URL("./board.json",import.meta.url),"utf8")
        );
       // await Management.deleteMany();
        await Management.insertMany(boardData,() => {
            console.log("Inserted board sample data")
        })
        console.log("Board data seeded");
        process.exit(0);
    } catch (err){
        console.error(err);
        process.exit(1)
    }
}

seed()