import tokenService from '../services/token-service';
import Service from './service';

const authHeader = { Authorization: `Bearer ${tokenService.getAuthToken()}` };

export default {
	getLangInfo() {
		return Service.get('/language', authHeader);
	},
	getHead() {
		return Service.get('/language/head', authHeader);
	}
}
