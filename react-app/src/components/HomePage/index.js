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
                <FoldersList folders={folders} />
            </div>
        </>
    )
}

export default HomePage
