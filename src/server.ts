import express from "express";

import { usersRoutes  } from "./routes/users.routes";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json())

app.use("/", usersRoutes);

app.listen(3333, () => console.log("Running"));