import './historypage.css'
import { getActivitiesFromUser } from '../../store/activities';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const HistoryPage = () => {

    const dispatch = useDispatch();
    const activities = useSelector(state => Object.values(state?.activity))
    const userId = useSelector(state => state?.session.user.id)
    console.log("THIS IS THE ACTIVITIES IN THE UPCOMING PAGE", activities)

    let currentDate = new Date().toJSON().slice(0, 10).split("-").reverse();

    if (currentDate) {
        [currentDate[0], currentDate[1]] = [currentDate[1], currentDate[0]]
    }

    const currentDateFormatted = currentDate.join("/")
    console.log("THIS SHOULD BE THE CURRENT DAY REFORMATTED", currentDateFormatted)

    const pastActivities = []

    if (currentDateFormatted && activities) {
        for (let i = 0; i < activities.length; i++) {
            if (Number(activities[i].date.split("/").join("")) < Number(currentDateFormatted.split("/").join(""))) {
                pastActivities.push(activities[i])
            }
        }
    }

    console.log("THIS SHOULD BE THE PAST ACTIVITIES", pastActivities)

    useEffect(() => {
        dispatch(getActivitiesFromUser(userId))
    }, [dispatch])

    return (
        <>
            <h1>Previous Tasks</h1>

            <h3>
                List of past activities in chronological order from the current day.
            </h3>
            {pastActivities && pastActivities.map(activity => {
                return <div key={activities.indexOf(activity)}>
                    <NavLink to={`/activities/${activity.id}`}>
                        {activity.title}
                    </NavLink>
                    <div>
                        {activity.context}
                    </div>
                    <div>
                        {activity.date}
                    </div>
                </div>
            })}
        </>
    )
}

export default HistoryPage