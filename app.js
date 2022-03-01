const express = require("express")
var bodyParser = require('body-parser')
const {google}=require("googleapis");
const path = require("path")
const upload= require('express-fileupload');
const multer=require('multer');
const {Client} = require("@googlemaps/google-maps-services-js");
const app = express()
const dotenv = require('dotenv');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// BASIC CONFIGS ------------------------------------------------
dotenv.config();
app.set('view engine', 'ejs');

// BASIC CONFIGS ------------------------------------------------
app.use(upload())
// paths to css and js ------------------------------------------
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/main_css",
  express.static(path.join(__dirname, "dist/css"))
)
app.use(
  "/font_awesome",
  express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use(
  "/img",
  express.static(path.join(__dirname, "dist/assets"))
)
app.use(
  "/upload",
  express.static(path.join(__dirname, "uploads"))
)
app.use("/jq", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use("/main_js", express.static(path.join(__dirname, "dist/js")))
// paths to css and js ------------------------------------------

// ROUTES -------------------------------------------------------
app.use('/', require('./routes/homepage/index.js'));
app.use('/monument', require('./routes/monuments/index.js'));
app.use('/parking', require('./routes/parking/index.js'));
app.use('/entertainment', require('./routes/entertainment/index.js'));
app.use('/housing', require('./routes/housing/index.js'));
app.use('/eat_n_drink', require('./routes/eat_n_drink/index.js'));
app.use('/hiking', require('./routes/hiking/index.js'));
app.use('/services', require('./routes/services/index.js'));
// ROUTES -------------------------------------------------------
const port=process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port)
})