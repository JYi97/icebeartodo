import './FoldersList.css'
import { NavLink } from 'react-router-dom';
import FolderForm from '../FolderForm';


const FoldersList = ({ folders }) => {

    let foldersArr = Object.values(folders)

    return (
        <>
            <div className='folders-list-your-folders-title-container'>
                <div className='folders-list-your-folders-title'>
                    Your Folders
                </div>
                <div>
                {foldersArr && <FolderForm folders={foldersArr} />}
            </div>
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
