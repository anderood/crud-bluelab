import { httpServer } from "./http";
import "./websockets";

httpServer.listen(3333, () => console.log("Running"));