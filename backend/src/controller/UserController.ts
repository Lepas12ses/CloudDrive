import type { RequestHandler } from "express";

class UserController {
	login: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
	register: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
	logout: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
	refresh: RequestHandler = (req, res, next) => {
		try {
			//...
		} catch (err) {
			next(err);
		}
	};
}

const userController = new UserController();

export default userController;
