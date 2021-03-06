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
	static del(urlPath, headers) {
		return fetchHandler(
			config.API_ENDPOINT + urlPath,
			{
				method: 'DELETE',
				headers,
		});
	}
	static post(urlPath, headers, body) {
		return fetchHandler(config.API_ENDPOINT + urlPath, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		});
	}
}
