import React from 'react';

import ItemsContainer from 'containers/items';
import BreadcrumbContainer from 'containers/breadcrumb';

export default () => {
	return (
		<div>
			<BreadcrumbContainer />
			<ItemsContainer />
		</div>
	);
};
