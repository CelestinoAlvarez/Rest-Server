import dotenv from "dotenv";
import { Server} from "./models/server";
	dotenv.config();

const servidor = new Server();

servidor.listen();

