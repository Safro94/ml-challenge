import React, {
	createContext,
	useContext,
	useReducer,
	useCallback,
} from 'react';

const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const SET_ITEMS = 'SET_ITEMS';

const ApplicationContext = createContext();

const useApplication = () => {
	const [application, setApplication] = useContext(ApplicationContext);

	const setSearchTerm = useCallback(
		term => setApplication({ type: SET_SEARCH_TERM, value: term }),
		[setApplication]
	);

	const setItems = useCallback(
		items => setApplication({ type: SET_ITEMS, value: items }),
		[setApplication]
	);

	return { ...application, setSearchTerm, setItems };
};

const ApplicationProvider = ({ application = {}, children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case SET_SEARCH_TERM:
				return { ...state, term: action.value };
			case SET_ITEMS:
				return { ...state, items: action.value };
			default:
				return state;
		}
	};

	return (
		<ApplicationContext.Provider value={useReducer(reducer, application)}>
			{children}
		</ApplicationContext.Provider>
	);
};

export { useApplication, ApplicationProvider };
