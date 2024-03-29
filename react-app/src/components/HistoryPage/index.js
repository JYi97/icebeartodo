import './historypage.css'
import { getActivitiesFromUser } from '../../store/activities';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const HistoryPage = () => {

    const dispatch = useDispatch();
    const activities = useSelector(state => Object.values(state?.activity))
    const userId = useSelector(state => state?.session.user.id)
    // console.log("THIS IS THE ACTIVITIES IN THE UPCOMING PAGE", activities)

    let currentDate = new Date().toJSON().slice(0, 10).split("-")

    // console.log(currentDate)

    let currentYear = Number(currentDate[0])

    let currentMonth = Number(currentDate[1])

    let currentDay = Number(currentDate[2])

    // console.log(currentYear, currentMonth, currentDay)

    const pastActivities = []

    if (currentDate && activities) {
        for (let i = 0; i < activities.length; i++) {
            let activityMonth = Number(activities[i].date.split("/")[0])
            let activityDay = Number(activities[i].date.split("/")[1])
            let activityYear = Number(activities[i].date.split("/")[2])
            // console.log(activityYear, activityMonth, activityDay)

            if (activityYear < currentYear && activities[i].completed === true) {
                pastActivities.push(activities[i])
            }
            if (activityYear === currentYear && activityMonth < currentMonth && activities[i].completed === true) {
                pastActivities.push(activities[i])
            }
            if (activityYear === currentYear && activityMonth === currentMonth && activityDay < currentDay && activities[i].completed === true) {
                pastActivities.push(activities[i])
            }
        }
    }

    // console.log(pastActivities)

    let pastActivitiesSorted

    if (pastActivities) {
        pastActivitiesSorted = pastActivities.sort((a, b) => {
            if (Number(a.date.slice(6, 10)) < Number(b.date.slice(6, 10))) {
                return 1
            }
            if (Number(a.date.slice(6, 10)) > Number(b.date.slice(6, 10))) {
                return -1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0, 2)) < Number(b.date.slice(0, 2))) {
                return 1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0, 2)) > Number(b.date.slice(0, 2))) {
                return -1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0, 2)) === Number(b.date.slice(0, 2)) && Number(a.date.slice(3, 5)) < Number(b.date.slice(3, 5))) {
                return 1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0, 2)) === Number(b.date.slice(0, 2)) && Number(a.date.slice(3, 5)) > Number(b.date.slice(3, 5))) {
                return -1
            }

        })
    }


    // console.log("THIS SHOULD BE THE PAST ACTIVITIES", pastActivitiesSorted)

    useEffect(() => {
        dispatch(getActivitiesFromUser(userId))
    }, [dispatch])

    return (
        <>
            <div className='history-page-title-container'>
                <div className='history-page-title'>
                    Past Activities
                </div>
            </div>
            <div className='history-page-activities-container'>
                {pastActivities && pastActivitiesSorted.map(activity => {
                    return <div className='history-activities-activity' key={activities.indexOf(activity)}>
                        <NavLink className='history-activities-activity-title' to={`/activities/${activity.id}`}>
                            {activity.title}
                        </NavLink>
                        <div className='history-activities-activity-context'>
                            {activity.context}
                        </div>
                        <div className='history-activities-activity-date'>
                            {activity.date}
                        </div>
                    </div>
                })}
            </div>
            <hr />
            <div className='history-page-activities-storing-container'>
                <div className='history-activities-image-container'>
                    <img className='history-activities-image' src='https://s3.getstickerpack.com/storage/uploads/sticker-pack/ice-bear/sticker_26.png?afc541aae29090d288eebe018a8f726c&d=200x200' alt=''></img>
                    <div className='history-page-activities-storing'>
                        Ice Bear is storing your previous activities... slowly...
                    </div>
                </div>
                <div className='history-page-bye-bye-activities-container'>
                    <div className='history-page-no-longer-needed-comment'>
                        Ice Bear is glad those activities are over.
                    </div>
                    <div className='history-page-no-longer-needed-image'>
                        <img src='https://chpic.su/_data/stickers/f/Fomushkina/Fomushkina_007.webp' alt=''></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HistoryPage
