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
        case GET_ONE_ACTIVITY:
            const activity = {};
            activity[action.activity.id] = action.activity
            return {
                ...activity
            }
        default:
            return state
    }
}

export default activityReducer
