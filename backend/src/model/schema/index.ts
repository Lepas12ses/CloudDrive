import { init as initUser } from "./User.js";
import { init as initToken } from "./Token.js";
import { init as initFile } from "./File.js";

const models = [initUser, initToken, initFile];

export default models;
