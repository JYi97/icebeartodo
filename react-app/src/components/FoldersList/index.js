import './FoldersList.css'
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getFolders } from '../../store/folders';
import FolderForm from '../FolderForm';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)

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
                            Activities for events in the folder can be hidden so only title of folder will be displayed.
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default FoldersList
