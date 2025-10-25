import ApiError from "../../../exceptions/ApiError.js";

export default class FilesSearchParams {
	limit: number;
	page: number;
	search?: string;
	sort?: string;
	order?: string;

	constructor(
		limit: unknown,
		page: unknown,
		search: unknown,
		sort: unknown,
		order: unknown
	) {
		if (typeof limit === "string") {
			const limitNumber = parseInt(limit);

			if (limitNumber >= 0) this.limit = limitNumber;
			else this.parseError();
		} else this.parseError();

		if (typeof page === "string") {
			const pageNumber = parseInt(page);

			if (pageNumber > 0) this.page = pageNumber;
			else this.parseError();
		} else this.parseError();

		if (typeof search === "string") {
			this.search = search;
		}

		if (typeof sort === "string") {
			switch (sort) {
				case "date": {
					this.sort = "createdAt";
					break;
				}
				case "name": {
					this.sort = "originalName";
					break;
				}
			}
		}

		if (typeof order === "string") {
			switch (order) {
				case "asc": {
					this.order = "ASC";
					break;
				}
				case "desc": {
					this.order = "DESC";
					break;
				}
			}
		}
	}

	private parseError() {
		throw ApiError.BadRequest("Неверные параметры поиска");
	}
}
