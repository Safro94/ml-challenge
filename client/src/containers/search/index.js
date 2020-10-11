import React from 'react';
import { useHistory } from 'react-router-dom';

import Search from 'components/search';

import { useApplication } from 'hooks/application';

import { RESULTS } from 'routes/routes';

export default () => {
	const history = useHistory();
	const { setSearchTerm } = useApplication();

	const onSubmit = searchTerm => {
		setSearchTerm(searchTerm);
		history.push(RESULTS);
	};

	return <Search onSubmit={onSubmit} />;
};
