import express from "express";
import cors from "cors";

// Routes
import employeeRoutes from "./routes/employee.routes.js";
import warrantiesRoutes from "./routes/warranties.routes.js";
import exchangeRoutes from "./routes/exchange.routes.js";

// App instance
const app = express();

// App config
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Warranty Server" });
});

app.use("/employees", employeeRoutes);
app.use("/warranties", warrantiesRoutes);
app.use("/exchanges", exchangeRoutes);

export default app;
