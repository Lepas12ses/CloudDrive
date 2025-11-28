import path from "path";

export const ROOT_PATH = process.cwd();
export const UPLOADS = "user_files";
export const UPLOADS_PATH = path.join(ROOT_PATH, UPLOADS);
export const REFRESH_TOKEN_COOKIE = "refreshToken";
