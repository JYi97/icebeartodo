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

// Getting one specific folder
const GET_ONE_FOLDER = 'folder/loadOneFolder'

export const loadOneFolder = (folder) => {
    return {
        type: GET_ONE_FOLDER,
        folder
    }
}

export const getOneFolder = (folderId) => async(dispatch) => {
    const response = await fetch(`/api/folders/${folderId}`)

    const folder = await response.json()
    // console.log("THIS IS AFTER THE RESPONSE WAS RECEIVED IN THE REDUCER", folder)
    dispatch(loadOneFolder(folder))
}

// Creating one folder
const CREATE_ONE_FOLDER = 'folder/createOneFolder'

export const addOneFolder = (folder) => {
    return {
        type: CREATE_ONE_FOLDER,
        folder
    }
}

export const createOneFolder = (payload) => async(dispatch) => {
    const response = await fetch('/api/folders/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const folder = await response.json()
        dispatch(addOneFolder(folder))
    }
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
        case GET_ONE_FOLDER:
            const folder = {};
            folder[action.folder.id] = action.folder
            return {
                ...folder
            }
        case CREATE_ONE_FOLDER:
            if (!state[action.folder.id]) {
                const newState = {
                    ...state,
                    [action.folder.id]: action.folder
                }
                return newState
            }
        default:
            return state
    }
}

export default folderReducer
