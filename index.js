const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const conn = require("./db/conn");

const app = express(); //iniciando express
//Models
const Thought = require("./models/Thought");
const User = require("./models/User");
// Import Routes
const thoughtsRoutes = require("./routes/thoughtsRoutes");
//Import Controllers
const ThoughtController = require("./controllers/ThoughtController");

//template engine do handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware

app.use(
  session({
    name: "session",
    secret: "nosso-secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//flash mensages
app.use(flash());

//public path
app.use(express.static("public"));

//set session to ress
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// routes
app.use("/thoughts", thoughtsRoutes);
app.get("/", ThoughtController.showThoughts);

// chamando conexao com o banco
conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// fazer update dps, e forcar o banco a arrumar as interracoes entre tabelas
