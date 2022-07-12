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
    // const userFoldersArr = Object.values(userFolders)
    // const foldersNames = Object.values(userFolders).map((folder) => {
    //     return folder.title
    // })
    const activities = useSelector(state => Object.values(state?.activity))
    let currentDate = new Date().toJSON().slice(0, 10).split("-").reverse();

    if (currentDate) {
        [currentDate[0], currentDate[1]] = [currentDate[1], currentDate[0]]
    }

    console.log("THIS SHOULD BE THE CURRENT DAY", currentDate)

    const currentDateFormatted = currentDate.join("/")


    console.log("THIS SHOULD BE THE CURRENT DAY REFORMATTED", currentDateFormatted)
    console.log("THIS SHOULD BE THE LIST OF ACTIVITIES", activities)


    const todaysActivities = []

    if (currentDateFormatted && activities) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].date === currentDateFormatted) {
                todaysActivities.push(activities[i])
            }
        }
    }

    console.log("THIS IS TODAYS ACTIVITIES I HOPE", todaysActivities)

    // const activitiesDates = activities.map(activity => {
    //     // return activity.date.split(" ").slice(1, 4)
    //     return activity.date
    // })

    // console.log("THIS IS THE ARRAY OF DATES", activitiesDates)

    // console.log(foldersNames)
    useEffect(() => {
        dispatch(getFolders())
        dispatch(getActivitiesFromUser(userId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getFolders())
    //     dispatch(getActivitiesFromUser(userId))
    // }, [dispatch])

    return (
        <>
            <h1> Ice Bear's To-Do List</h1>
            <div>
                <div>
                    {activities && <TodayActivities activities={todaysActivities}/>}
                </div>
                {folders && <FoldersList folders={folders} />}
            </div>
        </>
    )
}

export default HomePage
