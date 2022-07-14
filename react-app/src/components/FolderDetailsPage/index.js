import './folderdetailspage.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getFolders, deleteOneFolder } from '../../store/folders';
import { useEffect } from 'react';
import EditFolderForm from '../EditFolderForm';
import ActivitiesList from '../ActivitiesList';
import { getActivitiesFromFolder, getActivitiesFromUser } from '../../store/activities';
import ActivityForm from '../ActivityForm';


const FolderDetailsPage = () => {
    const dispatch = useDispatch()
    // const [show, setShow] = useState(false);
    const history = useHistory()
    const URLFolderId = useParams() // URLFolderId = {id: 'folderId number'}
    // console.log(URLFolderId.id, "THIS IS THE URLFOLDER ID IN THE FOLDER DETAILS PAGE")
    const folderId = Number(URLFolderId.id) // folderId = id of folder from url
    // console.log(folderId, "THIS IS THE FOLDER ID IN THE FOLDER DETAILS PAGE")
    const folders = useSelector(state => Object.values(state?.folder))
    // console.log("THIS IS THE FOLDERS IN THE FOLDER DETAILS PAGE", folders)
    // console.log(folder, "THIS IS THE FOLDER OBJECT IN THE FOLDER DETAILS PAGE")
    // const folderDetails = folder[folderId]
    // console.log("THIS IS THE FOLDER DETAILS IN THE SPECIFIC PAGE", folderDetails)

    const userId = useSelector(state => state?.session.user.id)
    // console.log("THIS IS THE USER ID", userId)
    const activitiesArr = useSelector(state => Object.values(state?.activity))
    // console.log("THIS IS THE ACTIVITIES IN THE FOLDER DETAILS PAGE", activitiesArr)


    let folder

    for (let i = 0; i < folders.length; i++) {
        if (folders[i].id === folderId) {
            folder = folders[i]
        }
    }

    // console.log("THIS IS THE SPECIFIC FOLDER", folder)

    // if (folder) {
    //     console.log("THIS IS THE SPECIFIC FOLDER IN THE FOLDER DETAILS PAGE", folder.userId)
    // }


    useEffect(() => {

        dispatch(getFolders())
        dispatch(getActivitiesFromFolder(folderId))

    }, [dispatch, folderId])

    return (
        <>
            {folder?.userId == userId ?
                <div>
                    <h1>
                        This is the folder page containing all the activities.
                    </h1>
                    <h2>
                        {folder && folder.title}
                    </h2>
                    {folder && folders && <EditFolderForm folder={folder} folders={folders} />}
                    <div>
                        <button
                            onClick={() => {
                                dispatch(deleteOneFolder(folder.id))
                                const timer = setTimeout(() => {
                                    history.push('/home')
                                }, 500)
                                return (() => clearTimeout(timer))
                            }}>Delete This Folder
                        </button>
                    </div>
                    <div>
                        {activitiesArr && <ActivityForm folderId={folderId} activities={activitiesArr} />}
                    </div>
                    <div>
                        {activitiesArr && <ActivitiesList activities={activitiesArr} />}
                    </div>
                </div> : <div>Ice Bear protects other users' profiles</div>}
        </>
    )

}

export default FolderDetailsPage
