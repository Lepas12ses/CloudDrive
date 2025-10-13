class UserService {
	login(login: string, password: string) {
		//...
	}
	register(login: string, email: string, password: string) {
		//...
	}
	logout(refreshToken: string) {
		//...
	}
	refresh(refreshToken: string) {
		//...
	}
}

const userService = new UserService();

export default userService;
