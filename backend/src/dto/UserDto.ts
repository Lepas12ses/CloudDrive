import User from "#src/models/User.js";

export default class UserDto {
	id: number;
	constructor(user: User) {
		this.id = user.id;
	}
}
