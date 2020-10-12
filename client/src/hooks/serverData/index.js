import { useState, useEffect } from 'react';

/*
  Custom hook creado para manejar la data que se fetchea
  server side. Se crea hook para que cada componente que
  requiera data del server pueda usarlo y no tener que
  tener esto repetido en cada componente
*/
export const useServerSideData = staticContext => {
	const [data, setData] = useState(
		staticContext ? staticContext.initialData : window.__initialData__
	);

	useEffect(() => {
		const initState = document.getElementById('initState');
		delete window.__initialData__;

		if (initState && initState.parentNode) {
			initState.parentNode.removeChild(initState);
		}
	}, []);

	return data;
};
