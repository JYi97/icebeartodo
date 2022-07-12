import './todayactivities.css'
import { NavLink } from 'react-router-dom';

const TodayActivities = ({ activities }) => {
    console.log("THIS IS THE ACTIVITIES IN TODAY ACTIVITIES COMPONENT", activities)
    return (
        <>
            <h3>
                List of Activities for current day.
            </h3>
            {activities && activities.map(activity => {
                return <div key={activities.indexOf(activity)}>
                    <NavLink to={`/activities/${activity.id}`}>
                        {activity.title}
                    </NavLink>
                    <div>
                        {activity.context}
                    </div>
                </div>
            })}
        </>
    )
}

export default TodayActivities
