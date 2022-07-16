import './activitieslist.css'
import { NavLink } from 'react-router-dom';

const ActivitiesList = ({ activities }) => {
    // console.log("THIS IS FROM THE ACTIVITIESLIST COMPONENT", activities)
    return (
        <>
            <div className='folder-details-to-dos-titles'>
                to-do's
            </div>
            <div className='folder-detail-page-activities-container'>
                {activities && activities.map(activity => {
                    return <div className='activities-list-activity' key={activities.indexOf(activity)}>

                        <NavLink className='activitieslist-activity-title' to={`/activities/${activity.id}`}>
                            {activity.title}
                        </NavLink >
                        <div className='activitieslist-activity-context'>
                            {activity.context}
                        </div>
                        <div className='activitieslist-activity-date'>
                            {activity.date}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default ActivitiesList
