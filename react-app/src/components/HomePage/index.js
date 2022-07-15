import './homepage.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../store/folders';
import FoldersList from '../FoldersList'
import TodayActivities from '../TodayActivities'
import { getActivitiesFromUser } from '../../store/activities';

const HomePage = () => {
    const dispatch = useDispatch();
    const folders = useSelector(state => state?.folder)
    const userId = useSelector(state => state?.session.user.id)
    // console.log("THIS IS IN THE HOME PAGE COMPONENT", Object.values(userFolders))

    const activities = useSelector(state => Object.values(state?.activity))
    let currentDate = new Date().toJSON().slice(0, 10).split("-").reverse();

    if (currentDate) {
        [currentDate[0], currentDate[1]] = [currentDate[1], currentDate[0]]
    }

    // console.log("THIS SHOULD BE THE CURRENT DAY", currentDate)

    const currentDateFormatted = currentDate.join("/")


    // console.log("THIS SHOULD BE THE CURRENT DAY REFORMATTED", currentDateFormatted)
    // console.log("THIS SHOULD BE THE LIST OF ACTIVITIES", activities)


    const todaysActivities = []

    if (currentDateFormatted && activities) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].date === currentDateFormatted) {
                todaysActivities.push(activities[i])
            }
        }
    }

    // console.log("THIS IS TODAYS ACTIVITIES I HOPE", todaysActivities)

    // console.log("THIS IS THE ARRAY OF DATES", activitiesDates)

    // console.log(foldersNames)

    useEffect(() => {
        dispatch(getFolders())
        dispatch(getActivitiesFromUser(userId))
    }, [])

    return (
        <>
            <h1> Your To-Do List</h1>
            <div>
                <div>
                    {activities && <TodayActivities activities={todaysActivities} />}
                </div>
                <hr />
                {folders && <FoldersList folders={folders} />}
            </div>
        </>
    )
}

export default HomePage
