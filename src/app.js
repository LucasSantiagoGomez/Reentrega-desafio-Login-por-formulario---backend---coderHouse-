import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import database from "./db.js";
import socket from "./socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/sessions.router.js"

// Initialization
const app = express();


app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));
  app.use(morgan("dev"));
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:  `mongodb+srv://lucas00gomez:jhVWUong4BKakOhh@clustercoderhouseecomme.itfiapq.mongodb.net/?retryWrites=true&w=majority`,
         ttl: 180,
      }),
      resave: true,
      saveUninitialized: false,
      secret: "asdf123%%",
    })
  );

// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));

// Database connection
database.connect();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);



