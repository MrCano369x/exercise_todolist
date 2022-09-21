const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://canodb:canodbpass@canocluster.0mcca.mongodb.net/CanoApps?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI).then((db) => console.log("db connected"));
