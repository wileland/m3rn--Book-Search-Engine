const mongoose = require("mongoose");
const mongoDBUri = "mongodb://127.0.0.1:27017/BookSearchEngine";

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String,
  description: String,
});

const TestModel = mongoose.model("TestModel", TestSchema);

const testEntry = new TestModel({
  name: "Test Entry",
  description: "Just a simple test",
});

(async () => {
  try {
    const savedEntry = await testEntry.save();
    console.log("Data inserted successfully!", savedEntry);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
  mongoose.connection.close();
})();
