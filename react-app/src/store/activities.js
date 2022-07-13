// Getting all activities from one specific folder with folderId
const GET_ACTIVITIES_FROM_ONE = 'activity/loadActivities'

export const loadActivities = (activities) => {
    return {
        type: GET_ACTIVITIES_FROM_ONE,
        activities
    }
}

export const getActivitiesFromFolder = (folderId) => async (dispatch) => {
    const response = await fetch(`/api/folders/${folderId}/activities`)

    const activities = await response.json()
    // console.log("THIS IS INSIDE THE GET ACTIVITIES THUNK ACTION CREATOR", activities)
    dispatch(loadActivities(activities))
}

// Getting one specific activity
const GET_ONE_ACTIVITY = 'activity/loadOneActivity'

export const loadOneActivity = (activity) => {
    return {
        type: GET_ONE_ACTIVITY,
        activity
    }
}

export const getOneActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}`)

    const activity = await response.json()
    dispatch(loadOneActivity(activity))
}

// CREATE one activity
const CREATE_ONE_ACTIVITY = 'activity/createOneActivity'

export const addOneActivity = (activity) => {
    return {
        type: CREATE_ONE_ACTIVITY,
        activity
    }
}

export const createOneActivity = (payload) => async (dispatch) => {
    const response = await fetch('/api/activities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const activity = await response.json()
        dispatch(addOneActivity(activity))
    }
}

// UPDATE one specific activity
const UPDATE_ONE_ACTIVITY = 'activity/updateOneActivity'

export const updateOneActivity = (activity) => {
    return {
        type: UPDATE_ONE_ACTIVITY,
        activity
    }
}

export const editOneActivity = (payload) => async (dispatch) => {
    const activityId = payload.activityId
    const response = await fetch(`/api/activities/${activityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const activity = await response.json()
        console.log("THIS IS THE ACTIVITY IN THE EDIT THUNK", activity)
        dispatch(updateOneActivity(activity))
    }
}

// DELETE one specific activity
const DELETE_ONE_ACTIVITY = 'activity/deleteOneActivity'

export const removeOneActivity = (activity) => {
    return {
        type: DELETE_ONE_ACTIVITY,
        activity
    }
}

export const deleteOneActivity = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const activity = await response.json();
        dispatch(removeOneActivity(activity))
        return activity
    }
}

// Getting all activities with userId
const GET_ACTIVITIES_FROM_USER = 'activity/loadActivitiesFromUser'

export const loadActivitiesFromUser = (activities) => {
    return {
        type: GET_ACTIVITIES_FROM_USER,
        activities
    }
}

export const getActivitiesFromUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/activities`)
    const activities = await response.json()
    console.log("THIS IS THE ACTIVITIES RESPONSE FROM THE FETCH CALL", activities)
    dispatch(loadActivitiesFromUser(activities))
}

// Getting all activities from same folder with activityID
const GET_ACTIVITIES_FROM_ACTIVITYID = 'activity/loadActivitiesFromActivityID'

export const loadActivitiesFromActivityId = (activities) => {
    return {
        type: GET_ACTIVITIES_FROM_ACTIVITYID,
        activities
    }
}

export const getActivitiesFromActivityID = (activityId) => async (dispatch) => {
    const response = await fetch(`/api/activities/${activityId}/folder/activities`)
    const activities = await response.json()
    dispatch(loadActivitiesFromActivityId(activities))
}

const initialState = {}

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACTIVITIES_FROM_ONE:
            const allActivities = {};
            action.activities.forEach(activity => {
                allActivities[activity.id] = activity
            })
            return {
                ...allActivities
            }
        case GET_ACTIVITIES_FROM_USER:
            const usersActivities = {};
            console.log("THIS IS THE ACTIVITIES FROM THE REDUCER", action.activities)
            action.activities.forEach(activity => {
                usersActivities[activity.id] = activity
            })
            return {
                ...usersActivities
            }
        case GET_ACTIVITIES_FROM_ACTIVITYID:
            const folderActivities = {};
            action.activities.forEach(activity => {
                folderActivities[activity.id] = activity
            })
            return {
                ...folderActivities
            }
        case GET_ONE_ACTIVITY:
            const activity = {};
            activity[action.activity.id] = action.activity
            return {
                ...activity
            }
        case CREATE_ONE_ACTIVITY:
            if (!state[action.activity.id]) {
                const newState = {
                    ...state,
                    [action.activity.id]: action.activity
                }
                return newState
            }
            break
        case UPDATE_ONE_ACTIVITY:
            if (state[action.activity.id]) {
                const newState = {
                    ...state,
                    [action.activity.id]: action.activity
                }
                return newState
            }
            break
        case DELETE_ONE_ACTIVITY:
            const newState = { ...state }
            delete newState[action.activity.id]
            return newState
        default:
            return state
    }
}

export default activityReducer
