const app = require("express")();
const http = require("http").Server(app);
var cors = require('cors');
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

const io = require("socket.io")(http, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", function (socket) {
	console.log("connected",socket);
  socket.on("addMedia", function () {
    io.sockets.emit("getMedia");
  });

  socket.on("tvMediaAdd", function (data) {
  	console.log("data",data);
    io.sockets.emit("getTvMediaAdd", data);
  });
  socket.on("tvMediaUpdate", function (data) {
    console.log("data",data);
    io.sockets.emit("getTvMediaUpdate", data);
  });
  socket.on("tvMediaDelete", function (data) {
    console.log("data",data);
    io.sockets.emit("getTvMediaDelete", data);
  });
  socket.on("tvDeactive", function (data) {
    console.log("data",data);
    io.sockets.emit("getTvDeactivated", data);
  });
});

var port = process.env.PORT || 5052;
http.listen(port, function () {
  console.log(`listening on *:5052`);
});
