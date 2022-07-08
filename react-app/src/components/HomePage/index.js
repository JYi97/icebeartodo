import './homepage.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../store/folders';
import FoldersList from '../FoldersList'
import TodayActivities from '../TodayActivities'

const HomePage = () => {
    const dispatch = useDispatch();
    const userFolders = useSelector(state => state?.folder)
    // console.log("THIS IS IN THE HOME PAGE COMPONENT", Object.values(userFolders))
    // const userFoldersArr = Object.values(userFolders)
    // const foldersNames = Object.values(userFolders).map((folder) => {
    //     return folder.title
    // })

    // console.log(foldersNames)
    useEffect(() => {
        dispatch(getFolders())
    }, [dispatch])

    return (
        <>
            <h1> Ice Bear's To-Do List</h1>
            <div>
                <FoldersList folders={userFolders} />
                <div>
                    <TodayActivities />
                </div>
            </div>
        </>
    )
}

export default HomePage
