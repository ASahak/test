import Types from '../types';

export const toggleCategoriesMenuMobile = (payload) => {
    return {
        type: Types.TOGGLE_CATEGORIES_MENU,
        payload,
    }
}

export const setPageName = (payload) => {
    return {
        type: Types.SET_PAGE_NAME,
        payload,
    }
}