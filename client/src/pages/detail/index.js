import React from 'react';
import { useParams } from 'react-router-dom';

import DetailContainer from 'containers/detail';
import BreadcrumbContainer from 'containers/breadcrumb';

export default () => {
	const { id } = useParams();
	return (
		<div>
			<BreadcrumbContainer />
			<DetailContainer itemId={id} />
		</div>
	);
};
