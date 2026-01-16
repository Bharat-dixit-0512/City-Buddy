import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MongoDBURI;

console.log("Attempting to connect to MongoDB...");
console.log("Using URI:", URI); // This will show us if the .env file is being read

if (!URI) {
    console.error("❌ MongoDB URI not found in .env file. Please check your configuration.");
    process.exit(1);
}

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // Wait 10 seconds before timing out
})
.then(() => {
    console.log("✅✅✅ Connection Successful with MongoDB! ✅✅✅");
    mongoose.connection.close();
})
.catch((error) => {
    console.error("❌❌❌ MongoDB Connection Error:", error.message);
    process.exit(1);
});