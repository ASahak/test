import Types from '../types';

const initialState = {
    categoriesMobileToggle: false,
    pageName: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PAGE_NAME:
            return {...state, pageName: action.payload}
        case Types.TOGGLE_CATEGORIES_MENU:
            return {...state, categoriesMobileToggle: action.payload}
        default:
            return state;
    }
};

export default reducer;