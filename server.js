// require express
var express = require("express");
// path module
var path = require("path");
// create the express app
var app = express();

app.use(express.static(path.join(__dirname, "./static")));
// Setting up ejs and our views folder
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
// root route to render the index.ejs view
app.get('/', function(req, res) {
	res.render('index');
});

// tell the express app to listen to port 8000
var server = app.listen(8000, function() {
	console.log("Listening on port 8000");
});

var io = require("socket.io").listen(server);

io.sockets.on('connection', function(socket) {
	var count = 0;
	console.log("Socket connected");
	socket.on('button_pressed', function() {
		count += 1;
		io.emit("count_updated", { count: count });
	});
	socket.on('reset_activated', function() {
		count = 0;
		io.emit("count_updated", { count: count });
	});
});
