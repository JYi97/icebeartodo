// Getting all folders
const GET_FOLDERS = 'folder/loadFolders'

export const loadFolders = (folders) => {
    return {
        type: GET_FOLDERS,
        folders
    }
}

export const getFolders = () => async (dispatch) => {
    const response = await fetch('/api/folders/')

    const folders = await response.json()
    console.log("THIS IS INSIDE THE GET FOLDERS THUNK ACTION CREATOR RESPONSE", folders)
    dispatch(loadFolders(folders))
}

const initialState = {}

const folderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLDERS:
            const allFolders = {};
            action.folders.forEach(folder => {
                allFolders[folder.id] = folder
            })
            return {
                ...allFolders
            }
        default:
            return state
    }
}

export default folderReducer
