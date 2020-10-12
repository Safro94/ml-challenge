import axios from 'utils/axios';

/*
	En este archivo se agregarían todas las funciones
	para el data fetching server side. Al tener como entrypoint 
	de express *, hay que obtener los paramestros de forma poco limpia
*/

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
