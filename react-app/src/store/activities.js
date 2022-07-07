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
        console.log("THIS IS INSIDE THE GET ACTIVITIES THUNK ACTION CREATOR", activities)
        dispatch(loadActivities(activities))
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
        default:
            return state
    }
}

export default activityReducer
