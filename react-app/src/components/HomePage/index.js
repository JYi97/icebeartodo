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

    console.log("THIS SHOULD BE THE LIST OF ACTIVITIES", activities)

    const activitiesDates = activities.map(activity => {
        // return activity.date.split(" ").slice(1, 4)
        return activity.date
    })

    console.log("THIS IS THE ARRAY OF DATES", activitiesDates)

    // console.log(foldersNames)
    useEffect(() => {
        dispatch(getFolders())
        dispatch(getActivitiesFromUser(userId))
    }, [dispatch])

    return (
        <>
            <h1> Ice Bear's To-Do List</h1>
            <div>
                <div>
                    <TodayActivities />
                </div>
                {folders && <FoldersList folders={folders} />}
            </div>
        </>
    )
}

export default HomePage
