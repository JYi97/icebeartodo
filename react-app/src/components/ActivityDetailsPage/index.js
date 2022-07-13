import './activitydetailspage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditActivityForm from '../EditActivityForm';
import { getFolders } from '../../store/folders';
import { getActivitiesFromActivityID } from '../../store/activities';


const ActivityDetailsPage = () => {
    const dispatch = useDispatch()
    const URLActivityId = useParams()
    const activityId = Number(URLActivityId.id)
    const activities = useSelector(state => Object.values(state?.activity))
    const folders = useSelector(state => Object.values(state?.folder))
    const userId = useSelector(state => state?.session.user.id)
    // const activityDetails = activity[activityId]

    // console.log("THIS IS THE ACTIVITY ID ", activityId)
    // console.log("THIS IS THE ACTIVITIES ARRAY ", activities)



    let activity

    for (let i = 0; i < activities.length; i++) {
        if (activities[i].id === activityId) {
            activity = activities[i]
        }
    }

    console.log("THIS IS THE SPECIFIC ACTIVITY", activity?.folderId)

    let folder

    for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === activity?.folderId) {
            folder = folders[i]
        }
    }

    useEffect(() => {

        dispatch(getFolders())
        dispatch(getActivitiesFromActivityID(activityId))


    }, [dispatch, activityId])


    return (
        <>
            {folder?.userId == userId && folder?.id == activity?.folderId ?
                <div>
                    <h1>
                        This is the Activity Details Page
                    </h1>
                    <h2>
                        {activity && activity.title}
                    </h2>
                    <h3>
                        {activity && activity.context}
                    </h3>
                    <h3>
                        {activity && activity.date}
                    </h3>
                    <div>
                        {(activity && activities) && <EditActivityForm activityId={activityId} activity={activity} activities={activities} />}
                    </div>
                </div> : <div>Ice Bear protects other users' activities</div>}
            {/* <h3>
                Remove this activity
            </h3>
            <div>
                <button
                    onClick={() => {
                        dispatch(deleteOneActivity(activityId))
                    }}
                >Delete
                </button>
            </div> */}
        </>
    )

}

export default ActivityDetailsPage
