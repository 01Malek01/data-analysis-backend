import mongoose from "mongoose";
import app from "./app.js";

app.listen(process.env.PORT || 5000, () => {
 console.log(`Server started on port ${process.env.PORT}`);
});


mongoose.connect(process.env.MONGO_URI as string).then(() => {
 console.log("Connected to MongoDB");
}).catch((error) => {
 console.log(error);
})