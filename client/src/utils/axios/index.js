import axios from 'axios';
import https from 'https';

const opts = {
	httpsAgent: new https.Agent({ rejectUnauthorized: false }),
	baseURL: `${process.env.SERVER_API_URL}`,
};

const interceptorError = error => Promise.reject(error.response);

const instanse = axios.create(opts);

instanse.interceptors.response.use(response => response, interceptorError);

export default instanse;
