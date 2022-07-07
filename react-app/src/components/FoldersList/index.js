import './FoldersList.css'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getFolders } from '../../store/folders';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)
    // console.log("THIS IS IN THE FOLDERS COMPONENT", foldersArr)

    // const dispatch = useDispatch();
    // const folders = useSelector(state => state?.folders)
    // console.log(folders)

    // useEffect(() => {
    //     dispatch(getFolders())

    // }, [dispatch])
    let folderNames = []

    for (let i = 0; i < foldersArr.length; i++) {
        folderNames.push(foldersArr[i].title)
    }

    // console.log("THESE SHOULD BE THE FOLDER NAMES", folderNames)


    return (
        <>
            <h3>
                List of Folders
            </h3>
            <div>
                <h4>These are the user's folder's names.</h4>
            </div>

            <div>
                {foldersArr && foldersArr.map(folder => {
                    return <div key={foldersArr.indexOf(folder)}>
                        <NavLink to={`/folders/${folder.id}`}>
                        {folder.title}
                        </NavLink>
                        <div>
                            Activities for events in the folder can be hidden so only title of folder will be displayed.
                        </div>
                    </div>
                })}
            </div>




        </>
    )
}

export default FoldersList
