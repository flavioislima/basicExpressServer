
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// --> 7)  Mount the Logger middleware here
function log(res, req, next){
  console.log("GET /json - ::ffff:127.0.0.1")
  next()
}

// app.use(log)

// --> 11)  Mount the body-parser middleware  here
app.use("/", bodyParser.urlencoded({extended:false}))

/** 1) Meet the node console. */
// console.log("Hello World")

/** 2) A first working Express Server */
// app.get("/", function(req, res) {
//   res.send("Hello Express")
// })

/** 3) Serve an HTML file */
const file = '/views/index.html'
app.get("/", function(req, res){
  res.sendFile(__dirname + file)
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public',))

/** 5) serve JSON on a specific route */
let jason = {"message": "Hello json"}

// app.get("/json", function (req, res){
//   res.json(jason)
// })

/** 6) Use the .env file to configure the app */
 app.get("/json", function (req, res){
   if (process.env.MESSAGE_STYLE === 'uppercase') {
     jason["message"] = jason["message"].toUpperCase()
   } 
  res.json(jason)
 })
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", function(req, res, next){ 
  req.time = new Date().toString()
  next()
}, function(req, res){
  res.send({"time": req.time})
})

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  res.send({"echo": req.params.word})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  res.send({"name": req.query.first + ' ' + req.query.last})
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.post("/name", (req, res) => {
  res.send({"name": req.body.first + ' ' + req.body.last})
})

/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
