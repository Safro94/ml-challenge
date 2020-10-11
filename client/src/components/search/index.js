import React, { useState, useRef } from 'react';

import Form from 'components/shared/form';
import Input from 'components/shared/input';
import Button from 'components/shared/button';

import { useApplication } from 'hooks/application';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ onSubmit }) => {
	useStyles(classes);
	const { term } = useApplication();

	const inputRef = useRef();
	const [searchTerm, setSearchTerm] = useState(term ?? '');

	const isInvalid = searchTerm === '';

	const handleSubmit = event => {
		event.preventDefault();
		if (onSubmit) onSubmit(searchTerm);
		inputRef.current.blur();
	};

	return (
		<div>
			<Form onSubmit={handleSubmit} className={classes.form}>
				<Input
					inputRef={inputRef}
					placeholder='Nunca dejes de buscar'
					value={searchTerm}
					onChange={({ target }) => setSearchTerm(target.value)}
				/>
				<Button disabled={isInvalid} customClasses={classes.button}>
					<img src='/assets/ic_Search.png' alt='Buscar' />
				</Button>
			</Form>
		</div>
	);
};
