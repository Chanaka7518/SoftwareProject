const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user_routes");
const reviewRoutes = require("./routes/review_routes");
const orderRoutes = require("./routes/order_routes");
const messageRoutes = require("./routes/message_routes");
const gigdataRoutes = require("./routes/gigdata_routes");
const conversationRoutes = require("./routes/conversation_routes");
const authRoutes = require("./routes/authentication_routes");
const emailRoutes = require("./routes/email_routes");
const approveRoutes = require("./routes/approve_routes");

const HttpError = require("./models/http-error");
const cors = require("cors");

const server = express();

server.use(bodyParser.json());
mongoose.set("strictQuery", true);
// to avoid cors
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// accepts any inputs from the user
server.use(express.json());
server.use(cookieParser());

server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/gigs", gigdataRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/conversations", conversationRoutes);
server.use("/api/messages", messageRoutes);
server.use("/api/emails", emailRoutes);
server.use("/api/reviews", reviewRoutes);
server.use("/api/approve", approveRoutes);

server.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";

  return res.status(errStatus).send(errMessage);
});

//  users
// server.use("/api", common);

//old one
server.use((req, res, next) => {
  res.send({ message: "Could not find this route" });
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// normal erros
server.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
mongoose
  .connect(
    "mongodb+srv://Chanaka:Prasanna@bitlegion.vt4wn4z.mongodb.net/AlphaLeeDB?retryWrites=true&w=majority"
  )
  .then(
    server.listen(5001, () => {
      console.log("Server is listening on port 5001");
    })
  )
  .catch((err) => {
    console.log(err);
  });
