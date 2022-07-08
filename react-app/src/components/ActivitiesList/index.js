import './activitieslist.css'
import { NavLink } from 'react-router-dom';

const ActivitiesList = ({ activities }) => {
    // console.log("THIS IS FROM THE ACTIVITIESLIST COMPONENT", activities)
    return (
        <>
            <h3>To-Do's</h3>
            <div>
                {activities && activities.map(activity => {
                    return <div key={activities.indexOf(activity)}>
                        <div>
                            <NavLink to={`/activities/${activity.id}`}>
                            {activity.title}
                            </NavLink>
                        </div>
                        <div>
                            {activity.context}
                        </div>
                        <div>
                            {activity.date}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default ActivitiesList
