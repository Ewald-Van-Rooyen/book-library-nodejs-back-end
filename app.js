const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const usersRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.route");
const authorRouter = require("./routes/author.route");
const bookRouter = require("./routes/book.route");

const swaggerDocument = require("./swagger.json");

const db = require("./models/index");
const config = require("./config");

const app = express();

// Setup middleware
app.use(cors());
app.use(compression());
app.use(morganLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser()); // TODO Remove not sure i'll use cookies
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.disable("x-powered-by");

// Setup application routes
app.use(`/api/v${config.apiVersion}`, usersRouter);
app.use(`/api/v${config.apiVersion}/author`, authorRouter);
app.use(`/api/v${config.apiVersion}/category`, categoryRouter);
app.use(`/api/v${config.apiVersion}/book`, bookRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sync the database models
db.sequelize.sync()
  .then(() => {
    console.log("Database & tables created!");
  });

module.exports = app;
