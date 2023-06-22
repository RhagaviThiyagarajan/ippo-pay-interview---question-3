const express = require("express");
const app = express();
const cors=require("cors");
const AuthRoute = require("./routes/Auth");
const UserRoute = require("./routes/Users");
const PostRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const path = require("path");

//mongodb
const db = require("./connection/db");

db();