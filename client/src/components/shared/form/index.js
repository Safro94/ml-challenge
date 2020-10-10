import React from 'react';

export default ({ children, ...rest }) => {
	return <form {...rest}>{children}</form>;
};
