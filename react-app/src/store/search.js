// Users can search for activities and folders
const GET_SEARCH = 'search/activitiesFolders'

export const getSearch = (titles) => {
    return {
        type: GET_SEARCH,
        titles
    }
}

export const searchActivitiesFolders = (userId) => async (dispatch) => {
    const response = await fetch(`api/search/${userId}`)

    if (response.ok) {
        const titles = await response.json()
        dispatch(getSearch(titles))
    }
}

let initialState = { entries: {} }

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH:
            return {
                entries: action.titles
            }
        default:
            return state;
    }
}
