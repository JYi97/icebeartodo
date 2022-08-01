import './todayactivities.css'
import { NavLink } from 'react-router-dom';



const TodayActivities = ({ activities }) => {
    // console.log("THIS IS THE ACTIVITIES IN TODAY ACTIVITIES COMPONENT", activities)

    return (
        <>
            <div className='today-activities-todo-activities-image-container'>
                <img src='http://vignette3.wikia.nocookie.net/webarebears/images/3/37/Ice_bear.png/revision/latest?cb=20160619204008' alt=''></img>
            </div>
            <div className='today-activities-todo-activities-grabbed-container'>
                <div className='today-activities-todo-activities-grabbed'>
                    Ice Bear grabbed all the activities you have for today.
                </div>
            </div>
            <div className='today-activities-todo-activities-container'>
                {activities && activities.map(activity => {
                    return <div className='today-activities-todo-activity' key={activities.indexOf(activity)}>
                        <div className='today-activities-todo-activity-title-container'>
                            <div className='today-activities-todo-activity-title-navlink-container'>
                            <NavLink className='today-activities-todo-activity-title' to={`/activities/${activity.id}`}>
                                {activity.title}
                            </NavLink>
                            </div>
                        </div>
                        <div className='today-activities-todo-activity-context'>
                            {activity.context}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default TodayActivities
