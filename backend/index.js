const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
connectDB();

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello Users");
// });

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

// --------------------------------Deploymen---------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running succeessfully");
  });
}
// --------------------------------Deploymen---------------------

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is listening on the port no 5000`);
});
