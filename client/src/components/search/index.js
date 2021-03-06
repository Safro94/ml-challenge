import React, { useState, useRef, useEffect } from 'react';

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
	const [searchTerm, setSearchTerm] = useState('');

	const isInvalid = searchTerm === '';

	const handleSubmit = event => {
		event.preventDefault();
		if (onSubmit) onSubmit(searchTerm);
		inputRef.current.blur();
	};

	useEffect(() => {
		setSearchTerm(term ?? '');
	}, [term]);

	return (
		<div>
			<Form onSubmit={handleSubmit} className={classes.form}>
				<Input
					inputRef={inputRef}
					placeholder='Nunca dejes de buscar'
					value={searchTerm}
					onChange={({ target }) => setSearchTerm(target.value)}
					title='Escribi tu texto de busqueda aqui'
				/>
				<Button disabled={isInvalid} customClasses={classes.button}>
					<img
						className={classes.icon}
						src='/assets/ic_Search@2x.png.png.png'
						alt='Buscar'
					/>
				</Button>
			</Form>
		</div>
	);
};
