import { useCallback, useEffect, useRef } from "react";

type OngoingRequest = {
	resolve: (token: string) => void;
	reject: () => void;
};

export default function useOngoingRequests() {
	const ongoingRequestsRef = useRef<OngoingRequest[]>([]);

	const clearOngoingRequests = useCallback((token: string | null = null) => {
		if (token) {
			ongoingRequestsRef.current.forEach(promise => promise.resolve(token));
		} else {
			ongoingRequestsRef.current.forEach(promise => promise.reject());
		}

		ongoingRequestsRef.current = [];
	}, []);

	const addOngoingRequest = useCallback((request: OngoingRequest) => {
		ongoingRequestsRef.current.push(request);
	}, []);

	/*
        При размонтировании компонента завершаем 
        все запросы с их оригинальными ошибками
    */
	useEffect(() => {
		return () => {
			clearOngoingRequests();
		};
	}, [clearOngoingRequests]);

	return {
		clearOngoingRequests,
		addOngoingRequest,
	};
}
