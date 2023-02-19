import express from "express";

import { usersRoutes  } from "./routes/users.routes";

const app = express();

app.use(express.json())

app.use("/register", usersRoutes);
app.use("/search", usersRoutes);

app.listen(3333, () => console.log("Running"));