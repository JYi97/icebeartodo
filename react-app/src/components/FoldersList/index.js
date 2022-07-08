import './FoldersList.css'
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getFolders } from '../../store/folders';
import FolderForm from '../FolderForm';
import EditFolderForm from '../EditFolderForm';
import { deleteOneFolder } from '../../store/folders';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)
    const dispatch = useDispatch()

    return (
        <>
            <h3>
                List of Folders
            </h3>
            <div>
                <h4>These are the user's folder's names.</h4>
            </div>
            <h4>{foldersArr && <FolderForm folders={foldersArr} />}</h4>
            <div>
                {foldersArr && foldersArr.map(folder => {
                    return <div key={foldersArr.indexOf(folder)}>
                        <NavLink to={`/folders/${folder.id}`}>
                            {folder.title}
                        </NavLink>
                        <div>
                            <EditFolderForm folder={folder} folders={foldersArr} />
                        </div>
                        <div>
                            Activities for events in the folder can be hidden so only title of folder will be displayed.
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    dispatch(deleteOneFolder(folder.id))
                                }}>Delete
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default FoldersList
