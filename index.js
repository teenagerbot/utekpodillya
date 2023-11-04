// CUSTOM modules
const { PWD, USER } = require("./user.js");
const {AdminRoutes, UserRoutes} = require("./routes.js");
// CUSTOM modules END
const ejs = require('ejs');
const helmet = require("helmet");
const cks = require("cookie");
const http = require("http");
const cookieManager = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const sockets = require('socket.io');
const fs = require("fs");
const constants = require("constants");
const server = http.createServer(app);
const io = sockets(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
	},
	maxHttpBufferSize: 1e8 // = 100 MB, 500 MB = 5e8 for transmiting files
});

// const MobileMenu = document.createElement("div");
// MobileMenu.classList.add("menu");
// app.set('view engine', 'ejs');
// // Укажите директорию, где находятся шаблоны
// app.set('views', path.join(__dirname, 'views'));

//secure headers
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
			imgSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
		},
	})
);
app.disable("x-powered-by");
// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieManager());
// app.use('/log', express.static(path.join(__dirname, "public", 'login')));
// app.post('/login', (req, res) => {
// 	const adminname = req.body.adminname;
// 	const adminpassword = req.body.adminpassword;
// 	if (adminname === USER && adminpassword === PWD) {
// 		res.cookie("admin", "hello", {
// 			secure: true,
// 			httpOnly: true,
// 			maxAge: 672 * 60 * 60 * 1000
// 		});
// 		res.redirect("/adminer");
// 		res.end();
// 	} else {
// 		res.render('login', { message: 'Пароль невірний' });
// 	}
// });
// app.use((req, res, next) => {
// 	const cookies = req.cookies;
// 	if (!UserRoutes.includes(req.url)) {
// 		if (cookies.admin === "hello") {
// 			next();
// 		} else {
// 			res.render('login', { message: 'Увійдіть в адмін панель' });
// 		}
// 	}
// });
app.use(express.static('public'));
app.use('/admin', express.static(path.join(__dirname, "public", 'adminPanel')));
app.get("/hello/:numbersession", (req, res) => {
	if (req.params.numbersession === "340") {
		res.cookie("admin", "hello", {
			secure: true,
			httpOnly: true,
			maxAge: 672 * 60 * 60 * 1000
		});
		res.redirect("/adminPanel");
		res.end();
	}
})

// app.get('*', function(req, res){
// 	if (req.url === "/") {
// 		res.send("Hello world")
// 	} else {
// 		if (!req.cookies["admin"] || req.cookies["admin"] !== "hello" && !UserRoutes.includes(req.url)) {
// 			res.status(404)
// 			res.sendFile(__dirname + "/public/login/index.html")
// 		} else if (AdminRoutes.includes(req.url)) {
// 			if (!req.cookies["admin"] || req.cookies["admin"] !== "hello") {
// 				res.status(404)
// 				res.sendFile(__dirname + "/public/login/index.html")
// 			} else {
// 				res.sendFile(__dirname + "/public/" + req.url);
// 			}
// 		} else {
// 			res.sendFile(__dirname + "/public/" + req.url);
// 		}
// 	}
// });

// app.get("/adminer", (req, res) => {
// 	if (req.cookies["admin"] && req.cookies["admin"] === "hello") {
// 		res.redirect("/admin")
// 	} else {
// 		res.status(404)
// 		res.end();
// 	}
// })


// app.get(/\/?.+/, (req, res) => {
// 	console.log(req.url)
// })
//listen on every connection
app.get("/update-cookie", (req, res) => {
	res.cookie("ads", "fG&8qLw$9hP#2jN@5zC*6eX+rT7sD!1mYpV(bA3)", {
		secure: true,
		httpOnly: true,
		maxAge: 672 * 60 * 60 * 1000
	});
	res.send(`<h1>Подождите, вас перенаправят через 500 миллисекунд, мы устанавливаем куки</h1><br><script>setTimeout(() => {
    location.replace("https://jslearn.teleweb.repl.co/profile/");
    }, 500);</script>`);
});
io.on('connection', (socket) => {
	socket.on("getProducts", () => {
		const prds = fs.readFileSync("./pr.json", "utf-8");
		io.to(socket.id).emit("products", prds);
	})
	socket.on("checkAccount", () => {
		const Cooks = cks.parse(socket.handshake.headers.cookie)
		if (Cooks.ads !== "fG&8qLw$9hP#2jN@5zC*6eX+rT7sD!1mYpV(bA3)") {
			io.to(socket.id).emit("isadmin", "false");
		} else {
			io.to(socket.id).emit("isadmin", "true");
		}
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
