import config from '../config';

function fetchHandler(...args) {
	return fetch(...args)
	.then( async res => {
		if (!res.ok) return Promise.reject(await res.json());
		if (res.status === 204) return null;
		return await res.json();
	});
}

export default class Service {
	static get(urlPath, headers) {
		return fetchHandler(config.API_ENDPOINT + urlPath, { method: 'GET', headers });
	}
	static del(urlPath, req = { method: 'DELETE' }) {
		return fetchHandler(config.API_ENDPOINT + urlPath, req);
	}
}
