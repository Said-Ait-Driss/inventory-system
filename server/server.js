const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const supplierRoute = require("./routes/supplierRoute");
const categoryRoute = require("./routes/categoryRoute");
const contactRoute = require("./routes/contactRoute");
const clientRoute = require("./routes/clientRoute");
const commandRoute = require("./routes/commandRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3001", ""],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/contactus", contactRoute);
app.use("/api/clients", clientRoute);
app.use("/api/commands", commandRoute);

// Routes
app.get("/api", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
