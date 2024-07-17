const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const blogRoutes = require("./routes/blogs");

// Enabling CORS for any unknown origin
app.use(cors());

// Enabling the use of JSON for the body of the request
app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.listen(port, () => {
  console.log(`IX blogging app listening on port ${port}`);
});