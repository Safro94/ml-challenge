import axios from 'utils/axios';

const getProductDetailData = async req => {
	const id = req.url.substr(req.url.lastIndexOf('/') + 1);

	try {
		const res = await axios(`/items/${id}`);
		return res.data;
	} catch (ex) {
		//Loguear a una BD o a una herramienta como sentry
	}
};

export { getProductDetailData };
