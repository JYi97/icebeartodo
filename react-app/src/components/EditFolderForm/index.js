import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editOneFolder } from '../../store/folders';
import './editfolderform.css'

const EditFolderForm = ({ folder, folders }) => {

    const history = useHistory()
    const folderId = folder.id
    const [title, setTitle] = useState(folder.title)
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const userId = useSelector(state => state?.session.user.id)

    console.log("THIS IS THE FOLDERS IN THE EDIT FOLDER FORM COMPONENT", folders)

    const dispatch = useDispatch();

    const folderTitles = folders.map((folder) => {
        return folder.title
    })

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('You must put a name with at least 1 character')
        if (folderTitles.includes(title)) error.push('Provide a unique name')
        setErrors(error);
    }, [title])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const payload = {
                folderId,
                title,
                userId,
            }
            await dispatch(editOneFolder(payload))
            await history.push(`/home`)
            // await history.push(`/folders/${folderId}`)
        }

    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <>
            <h4>
                Edit Folder Form Here
            </h4>
            <form onSubmit={onSubmit}>
                {show ?
                    errors.length > 0 ?
                        <>
                            <h3>Error</h3>
                            <ul>{errors.map(error => {
                                return (
                                    <>
                                        <li
                                            key={error}>{error}</li>
                                    </>
                                )
                            })}
                            </ul>
                        </>
                        : null
                    : null}
                <div>
                    <input type='text'
                        required
                        placeholder={folder.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type='submit'>Keep your changes</button>
            </form>
        </>
    )
}

export default EditFolderForm
