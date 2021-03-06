import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFolders} from '../../store/folders';
import { useEffect } from 'react';
import EditFolderForm from '../EditFolderForm';
import ActivitiesList from '../ActivitiesList';
import { getActivitiesFromFolder } from '../../store/activities';
import ActivityForm from '../ActivityForm';
import WrongPage from '../WrongPage';


const FolderDetailsPage = () => {
    const dispatch = useDispatch()
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
                <div className='folder-details-page-folder-title-container'>
                    {folder && folders && <EditFolderForm folder={folder} folders={folders} />}
                    <div>
                        {activitiesArr && <ActivityForm folderId={folderId} activities={activitiesArr} />}
                    </div>
                    <div>
                        {activitiesArr && <ActivitiesList activities={activitiesArr} />}
                    </div>
                </div> : <WrongPage />
            }
        </>
    )

}

export default FolderDetailsPage
