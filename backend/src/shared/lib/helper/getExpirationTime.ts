interface Time {
	days?: number;
	hours?: number;
	minutes?: number;
}

export default function getExpirationTime(time: Time | string) {
	let timeObj: Time = {
		days: 0,
		hours: 0,
		minutes: 0,
	};

	if (typeof time === "string") {
		const pieces = time.split(" ");

		pieces.forEach(item => {
			if (item.length < 2) throw new Error("Incorrect time fragment");

			const unit = item[item.length - 1];
			const value = parseInt(item.slice(0, item.length - 1));

			switch (unit) {
				case "m": {
					timeObj = {
						...timeObj,
						minutes: value,
					};
					break;
				}
				case "h": {
					timeObj = {
						...timeObj,
						hours: value,
					};
					break;
				}
				case "d": {
					timeObj = {
						...timeObj,
						days: value,
					};
					break;
				}
			}
		});
	} else {
		timeObj = time;
	}

	const expiration = new Date().getTime();

	const minMilis = timeObj.minutes * 60 * 1000;
	const hourMilis = timeObj.hours * 60 * 60 * 1000;
	const daysMilis = timeObj.days * 60 * 60 * 60 * 1000;

	return new Date(expiration + minMilis + hourMilis + daysMilis);
}
