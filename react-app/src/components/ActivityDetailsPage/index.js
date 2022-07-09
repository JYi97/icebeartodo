import './activitydetailspage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneActivity, deleteOneActivity } from '../../store/activities';
import EditActivityForm from '../EditActivityForm';


const ActivityDetailsPage = () => {
    const dispatch = useDispatch()
    const URLActivityId = useParams()
    const activityId = Number(URLActivityId.id)
    const activity = useSelector(state => state?.activity)
    const activityDetails = activity[activityId]

    useEffect(() => {

        dispatch(getOneActivity(activityId))
    }, [dispatch, activityId])

    return (
        <>
            <h1>
                This is the Activity Details Page
            </h1>
            <h2>
                {activityDetails && activityDetails.title}
            </h2>
            <h3>
                {activityDetails && activityDetails.context}
            </h3>
            <h3>
                {activityDetails && activityDetails.date}
            </h3>
            <EditActivityForm activityId={activityId} activity={activityDetails} />
            <h3>
                Remove this activity
            </h3>
            <div>
                <button
                    onClick={() => {
                        dispatch(deleteOneActivity(activityId))
                    }}
                >Delete
                </button>
            </div>
        </>
    )

}

export default ActivityDetailsPage
