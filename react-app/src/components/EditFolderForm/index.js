import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editOneFolder, deleteOneFolder } from '../../store/folders';
import './editfolderform.css'

const EditFolderForm = ({ folder, folders }) => {

    const history = useHistory()
    const folderId = folder.id
    const [title, setTitle] = useState(folder.title)
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const userId = useSelector(state => state?.session.user.id)

    // console.log("THIS IS THE FOLDERS IN THE EDIT FOLDER FORM COMPONENT", folders)


    const dispatch = useDispatch();

    const folderTitles = folders.map((folder) => {
        return folder.title
    })

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('Ice Bear wants at least 1 character for title')
        if (title?.length > 50) error.push('Ice Bear wants a shorter title')
        if (title?.startsWith(" ")) error.push('Ice Bear does not want empty title.')
        if (folderTitles.includes(title)) error.push('Ice Bear already made a folder with that title.')
        setErrors(error);
    }, [title])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            setShow(false)
            const payload = {
                folderId,
                title,
                userId,
            }
            await dispatch(editOneFolder(payload))
            await history.push(`/folders/${folderId}`)
            setShowForm(false)

        }

    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <>
            <div className='folder-details-page-title-container'>
                <div className='folder-title-options-button-container'>
                    <div className='folder-details-page-title'>
                        {folder && folder.title}
                        {showForm ? <><form onSubmit={onSubmit}>
                    {show ?
                        errors.length > 0 ?
                            <>
                                {errors.map(error => {
                                    return (
                                        <>
                                            <div className='create-form-error'
                                                key={error}>{error}</div>
                                        </>
                                    )
                                })}

                            </>
                            : null
                        : null}
                    <div className='edit-folder-form-input-submit-button-containers'>
                        <input type='text'
                            className='edit-folder-form-edit-title-input'
                            required
                            placeholder={folder.title}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button className='edit-folder-form-edit-title-button' type='submit'>Edit</button>
                        <div className='edit-folder-form-delete-button-container'>
                            <button className='edit-folder-form-delete-button'
                                onClick={() => {
                                    dispatch(deleteOneFolder(folder.id))
                                    const timer = setTimeout(() => {
                                        history.push('/home')
                                    }, 500)
                                    return (() => clearTimeout(timer))
                                }}>Delete
                            </button>
                        </div>
                    </div>
                </form>
                </>
                    : null}
                        <div className='edit-folder-form-options-button-container'>
                            <button className='edit-folder-form-options-button' onClick={() => {
                                if (showForm) {
                                    setShowForm(false)
                                } else {
                                    setShowForm(true)
                                }
                            }}>
                                <img className='folder-form-edit-folder-form-button' src='https://cdn-icons-png.flaticon.com/512/109/109733.png' alt=''></img>
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default EditFolderForm
