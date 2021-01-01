import tokenService from '../services/token-service';
import Service from './service';

//authHeader is evaluated before API calls, so it must be iife
const authHeader = ()=>({ Authorization: `Bearer ${tokenService.getAuthToken()}` });

export default {
	getLangInfo() {
		return Service.get('/language', authHeader());
	},
	getHead() {
		return Service.get('/language/head', authHeader());
	},
	postGuess(guess) {
		return Service.post('/language/guess',
		Object.assign(authHeader(), { 'Content-Type': 'application/json'}),
		{ guess });
	}
}
