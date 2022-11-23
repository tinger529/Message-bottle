import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

export default async() => {
    dotenv.config();
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.once("open", () => {
        console.log("Mongo database connected!");
    });
}
