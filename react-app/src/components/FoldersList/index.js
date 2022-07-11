import './FoldersList.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getFolders } from '../../store/folders';
import FolderForm from '../FolderForm';
// import EditFolderForm from '../EditFolderForm';
// import { deleteOneFolder } from '../../store/folders';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)
    // const dispatch = useDispatch()
    // const [show, setShow] = useState(false);

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
                <h4>
                    Folder Stack (Bear Stack)
                </h4>
                {foldersArr && foldersArr.map(folder => {
                    return <div key={foldersArr.indexOf(folder)}>
                        <NavLink to={`/folders/${folder.id}`}>
                            {folder.title}
                        </NavLink>
                        {/* <div>
                            <button onClick={() => {
                                if (show) {
                                    setShow(false)
                                } else {
                                    setShow(true)
                                }
                            }}>
                                <img src={'data:image/png;base64,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'} />
                            </button>
                        </div>
                        {show ?
                            <div>
                                <EditFolderForm folder={folder} folders={foldersArr} />
                            </div> : null} */}
                        {/* <div>
                            <button
                                onClick={() => {
                                    dispatch(deleteOneFolder(folder.id))
                                }}>Delete
                            </button>
                        </div> */}
                    </div>
                })}
            </div>
        </>
    )
}

export default FoldersList
