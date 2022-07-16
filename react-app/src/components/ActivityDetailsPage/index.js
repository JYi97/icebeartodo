import './activitydetailspage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditActivityForm from '../EditActivityForm';
import { getFolders } from '../../store/folders';
import { getActivitiesFromActivityID } from '../../store/activities';
import WrongPage from '../WrongPage';

const ActivityDetailsPage = () => {
    const dispatch = useDispatch()
    const URLActivityId = useParams()
    const activityId = Number(URLActivityId.id)
    const activities = useSelector(state => Object.values(state?.activity))
    const folders = useSelector(state => Object.values(state?.folder))
    const userId = useSelector(state => state?.session.user.id)

    // console.log("THIS IS THE ACTIVITY ID ", activityId)
    // console.log("THIS IS THE ACTIVITIES ARRAY ", activities)



    let activity

    for (let i = 0; i < activities.length; i++) {
        if (activities[i].id === activityId) {
            activity = activities[i]
        }
    }

    // console.log("THIS IS THE SPECIFIC ACTIVITY", activity?.folderId)

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
                    <div>
                        {(activity && activities) && <EditActivityForm activityId={activityId} activity={activity} activities={activities} />}
                    </div>
                </div> : <WrongPage/>
                // <>
                // <div className='wrong-activity-details-page-container'>
                //         <div className='activity-details-page-wrong-activity-img-container'>
                //             <img className='activity-details-page-wrong-activity-image' src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-crab-512x512.png' alt=''></img>
                //             <div className='activity-details-page-wrong-activity-explanation-container'>
                //                 <div className='activity-details-page-wrong-activity-explanation'>
                //                     Ice Bear went to the wrong page.

                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </>
                }
        </>
    )

}

export default ActivityDetailsPage
