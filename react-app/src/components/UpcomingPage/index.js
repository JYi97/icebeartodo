import './upcomingpage.css'
import { getActivitiesFromUser } from '../../store/activities';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UpcomingPage = () => {

    const dispatch = useDispatch();
    const activities = useSelector(state => Object.values(state?.activity))
    const userId = useSelector(state => state?.session.user.id)
    // console.log("THIS IS THE ACTIVITIES IN THE UPCOMING PAGE", activities)

    let currentDate = new Date().toJSON().slice(0, 10).split("-").reverse();

    if (currentDate) {
        [currentDate[0], currentDate[1]] = [currentDate[1], currentDate[0]]
    }

    const currentDateFormatted = currentDate.join("/")
    // console.log("THIS SHOULD BE THE CURRENT DAY REFORMATTED", currentDateFormatted)

    const upcomingActivities = []

    if (currentDateFormatted && activities) {
        for (let i = 0; i < activities.length; i++) {
            if (Number(activities[i].date.split("/").join("")) > Number(currentDateFormatted.split("/").join(""))) {
                upcomingActivities.push(activities[i])
            }
        }
    }

    let upcomingActivitiesSorted

    if (upcomingActivities) {
        upcomingActivitiesSorted = upcomingActivities.sort((a, b) => {
            if (Number(a.date.slice(6, 10)) < Number(b.date.slice(6, 10))) {
                return -1
            }
            if (Number(a.date.slice(6, 10)) > Number(b.date.slice(6, 10))) {
                return 1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0, 2)) < Number(b.date.slice(0,2))) {
                return -1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0,2)) > Number(b.date.slice(0,2))) {
                return 1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0,2)) === Number(b.date.slice(0,2)) && Number(a.date.slice(3,5)) < Number(b.date.slice(3,5))) {
                return -1
            }
            if (Number(a.date.slice(6, 10)) === Number(b.date.slice(6, 10)) && Number(a.date.slice(0,2)) === Number(b.date.slice(0,2)) && Number(a.date.slice(3,5)) > Number(b.date.slice(3,5))) {
                return 1
            }

    })}

    console.log("THIS SHOULD BE THE UPCOMING ACTIVITIES", upcomingActivitiesSorted)

    useEffect(() => {
        dispatch(getActivitiesFromUser(userId))
    }, [dispatch])

    return (
        <>
            <div className='upcoming-page-activities-watching-container'>
                <div className='upcoming-page-activities-watching'>
                    Ice Bear is keeping an eye out for upcoming events
                </div>
            </div>
            <div className='upcoming-activities-images-container'>
                <div className='upcoming-activities-image1-container'>
                <img className='upcoming-activities-image1' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uBaCxZddD1AE4XEAigcNDk6Kb5DqZOJapA&usqp=CAU' alt=''></img>
            </div>
                <div className='upcoming-activities-image2-container'>
                <img src='https://stickerly.pstatic.net/sticker_pack/JSzVPMd6Ab2TPeA9LgkBhw/1UBP58/23/715a7360-6508-4511-aa0a-0a8ce784edcd.png' alt=''></img>
            </div>
            </div>
            {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8uBaCxZddD1AE4XEAigcNDk6Kb5DqZOJapA&usqp=CAU */}
            {/* <div className='upcoming-activities-image-container'>
                <img src='https://stickerly.pstatic.net/sticker_pack/JSzVPMd6Ab2TPeA9LgkBhw/1UBP58/23/715a7360-6508-4511-aa0a-0a8ce784edcd.png' alt=''></img>
            </div> */}
            <div className='upcoming-page-activities-brought-container'>
                <div className='upcoming-page-activities-brought'>
                    Ice Bear brought all the future to-do's.
                </div>
            </div>
            <div className='upcoming-page-activities-container'>
                {upcomingActivitiesSorted && upcomingActivitiesSorted.map(activity => {
                    return <div className='upcoming-activities-activity' key={activities.indexOf(activity)}>
                        <NavLink className='upcoming-activities-activity-title' to={`/activities/${activity.id}`}>
                            {activity.title}
                        </NavLink>
                        <div className='upcoming-activities-activity-context'>
                            {activity.context}
                        </div>
                        <div className='upcoming-activities-activity-date'>
                            {activity.date}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default UpcomingPage
