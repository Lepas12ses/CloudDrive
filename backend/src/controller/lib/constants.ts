import { CookieOptions } from "express";

const REFRESH_COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	path: "/auth",
};
