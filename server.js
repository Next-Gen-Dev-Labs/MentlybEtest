const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const issueRoutes = require("./routes/issueRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const PORT = 8000 || process.env.PORT;

connectDB();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie-parser middleware
app.use(cookieParser());

// serving other routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started at port ${PORT}`);
});
