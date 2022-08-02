import './FoldersList.css'
import { NavLink } from 'react-router-dom';
import FolderForm from '../FolderForm';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)

    return (
        <>
            <div className='folder-list-folders-titles-new-folder-button-container'>
                {foldersArr && <FolderForm folders={foldersArr} />}
            </div>
            <div className='folder-list-folders-container'>
                {foldersArr && foldersArr.map(folder => {
                    return <div className='folder-list-folders' key={foldersArr.indexOf(folder)}>
                        <div className='folder-list-folders-title-container'>
                            <NavLink className='folder-list-folders-title' to={`/folders/${folder.id}`}>
                                {folder.title}
                            </NavLink>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}

export default FoldersList
