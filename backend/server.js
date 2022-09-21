const express = require("express");
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

require("./database");
require("./routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server on port " + port);
});
