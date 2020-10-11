import React, {
	createContext,
	useContext,
	useReducer,
	useCallback,
} from 'react';

const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const SET_RESULT = 'SET_RESULT';

const ApplicationContext = createContext();

const useApplication = () => {
	const [application, setApplication] = useContext(ApplicationContext);

	const setSearchTerm = useCallback(
		term => setApplication({ type: SET_SEARCH_TERM, value: term }),
		[setApplication]
	);

	const setResult = useCallback(
		result => setApplication({ type: SET_RESULT, value: result }),
		[setApplication]
	);

	return { ...application, setSearchTerm, setResult };
};

const ApplicationProvider = ({ application = {}, children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case SET_SEARCH_TERM:
				return { ...state, term: action.value };
			case SET_RESULT:
				return {
					...state,
					items: action.value.items,
					categories: action.value.categories,
				};
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
