import React from 'react';
import { useHistory } from 'react-router-dom';

import Search from 'components/search';

import { RESULTS } from 'routes/routes';

export default () => {
	const history = useHistory();

	const onSubmit = searchTerm => {
		history.push(RESULTS);
	};

	return <Search onSubmit={onSubmit} />;
};
