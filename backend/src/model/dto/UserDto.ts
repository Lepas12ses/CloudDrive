import User from "#src/model/schema/User.js";

export default class UserDto {
	id: number;
	constructor(user: User) {
		this.id = user.id;
	}
}
