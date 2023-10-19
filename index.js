const http = require("http");
const cookieManager = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
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
app.use('/admin', express.static(path.join(__dirname, "public", 'adminPanel')));
app.use(cookieManager());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/hello', (req, res) => {
	res.send("hello");
	res.end();
});
app.get("/adminer", (req, res) => {
	if (req.cookies["admin"] && req.cookies["admin"] === "hello") {
		res.redirect("/admin")
	} else {
		res.status(404)
		res.end();
	}
})
app.get("/hello/:numbersession", (req, res) => {
	if (req.params.numbersession === "340") {
		res.cookie("admin", "hello", {
			secure: true,
			httpOnly: true,
			maxAge: 672 * 60 * 60 * 1000
		});
		res.redirect("/adminer");
		res.end();
	}
})
app.get(/\/?.+/, (req, res) => {
	console.log(req.url)
})
//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected');
	//listen on "test"
	socket.on('test', (data) => {
		console.log(data.username);
	});
	socket.on("getProducts", () => {
		const prds = fs.readFileSync("./pr.json", "utf-8");
		io.to(socket.id).emit("products", prds);
	})
	socket.on("getFile", (file) => {
		if (fs.existsSync(`./prodfiles/${file}.html`)) {
			const Stream = fs.createReadStream(`./prodfiles/${file}.html`, {encoding: "utf-8", highWaterMark: 1024 });
			Stream.on("data", (chunk) => {
				io.to(socket.id).emit("addFileChunk", chunk);
			});
			Stream.on("end", () => {
				Stream.destroy();
			})
		} else {
			io.to(socket.id).emit("errorReadProd");
		}
	})
	/**
		when we sent the file via client
		client(script.js):
		let file = document.querySelector("input[type='file']").files[0];
		io.emit("getFile", file);
	*/
	// socket.on("getFile", (fileData) => {
	// 	fs.writeFile(`file.png`, fileData.file, (err) => {
	// 		if (err) io.to(socket.id).emit("error");
	// 		else {
	// 			// ....
	// 		}
	// 	});
	// });
});
server.listen(3000, "0.0.0.0", function() {
	console.log('listening on 3000');
});
