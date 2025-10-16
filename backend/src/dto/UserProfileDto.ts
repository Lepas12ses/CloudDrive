import User from "../models/User.js";

export default class UserProfileDto {
	login: string;
	email: string;
	constructor(user: User) {
		this.login = user.login;
		this.email = user.email;
	}
}
