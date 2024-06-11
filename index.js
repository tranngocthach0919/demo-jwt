const express = require("express");
const cors = require("cors");
const app = express();
const authenticateJWT = require("./middlewares/authenticateJWT");
const bodyParser = require("body-parser");
const port = 3100;
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const AuthController = require("./controllers/auth.controller");
const AccountsController = require("./controllers/account.controller");

app.get("/", (req, res) => {
  res.send("LetDiv");
});

// Auth
app.post("/login", AuthController.login);
app.get("/user", authenticateJWT(['admin', 'user', 'anonymous']), AuthController.getUser);
// Accounts
app.get("/accounts", authenticateJWT(["admin"]), AccountsController.getAccounts);

app.listen(port, () => {  
  console.log(`LetDiv app listening on port ${port}`);
});
