import axios from 'axios';

export default defineNuxtPlugin(() => {
	const axiosInstance = axios.create({
		baseURL: 'https://status.neuralgeneration.com/api',
	});

	return {
		provide: {
			axios: axiosInstance,
		},
	};
});
