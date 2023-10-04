const http = require("http");
const express = require('express')
const app = express();
const sockets = require('socket.io');
const fs = require("fs");
const server = http.createServer(app);
const io = sockets(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
	},
	maxHttpBufferSize: 1e8 // = 100 MB, 500 MB = 5e8 for transmiting files
});
// middlewares
app.use(express.static('public'))
// routes
app.get('/hello', (req, res) => {
	res.send("hello");
	res.end();
})



//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected');
	//listen on "test"
	socket.on('test', (data) => {
		console.log(data.username);
	});
	/**
		when we sent the file via client
		client(script.js):
		let file = document.querySelector("input[type='file']").files[0];
		io.emit("getFile", file);
	*/
	socket.on("getFile", (fileData) => {
		fs.writeFile(`file.png`, fileData.file, (err) => {
			if (err) io.to(socket.id).emit("error");
			else {
				// ....
			}
		});
	});
});
server.listen(3000, "0.0.0.0", function() {
	console.log('listening on 3000');
});
