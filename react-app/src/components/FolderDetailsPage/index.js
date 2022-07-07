import './folderdetailspage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneFolder } from '../../store/folders';
import { useEffect } from 'react';
import ActivitiesList from '../ActivitiesList';
import { getActivitiesFromFolder } from '../../store/activities';

const FolderDetailsPage = () => {
    const dispatch = useDispatch()
    const URLFolderId = useParams() // URLFolderId = {id: 'folderId number'}
    // console.log(URLFolderId, "THIS IS THE URLFOLDER ID IN THE FOLDER DETAILS PAGE")
    const folderId = Number(URLFolderId.id) // folderId = id of folder from url
    // console.log(folderId, "THIS IS THE FOLDER ID IN THE FOLDER DETAILS PAGE")
    const folder = useSelector(state => state?.folder)
    // console.log(folder, "THIS IS THE FOLDER OBJECT IN THE FOLDER DETAILS PAGE")
    const folderDetails = folder[folderId]
    // console.log("THIS IS THE FOLDER DETAILS IN THE SPECIFIC PAGE", folderDetails)

    const activitiesArr = useSelector(state => Object.values(state?.activity))
    console.log("THIS IS THE ACTIVITIES IN THE FOLDER DETAILS PAGE", activitiesArr)
    useEffect(() => {

        dispatch(getOneFolder(folderId))
        dispatch(getActivitiesFromFolder(folderId))

    }, [dispatch, folderId])

    return (
        <>
            <h1>
                This is the folder page containing all the activities.
            </h1>
            <h2>
                {folderDetails && folderDetails.title}
            </h2>
            <div>
                {activitiesArr && <ActivitiesList activities={activitiesArr} />}
            </div>
        </>
    )

}

export default FolderDetailsPage
