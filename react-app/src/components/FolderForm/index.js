import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOneFolder } from '../../store/folders';
import './folderform.css'

const FolderForm = ({ folders }) => {
    // console.log(folders, "THIS IS THE FOLDERS FROM THE FOLDER FORM")
    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const userId = useSelector(state => state?.session.user.id)

    const dispatch = useDispatch();

    const folderTitles = folders.map((folder) => {
        return folder.title
    })

    // console.log("THIS IS FROM THE FOLDER FORM THAT SHOULD BE AN ARRAY OF FOLDER NAMES", folderNames)

    useEffect(() => {
        const error = [];
        if (title.length < 1) error.push('You must put a name with at least 1 character')
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
                userId,
                title,
            }
            dispatch(createOneFolder(payload))
            setTitle('')
        }

    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <>
            <div>
                This is the form to create a folder.
            </div>
            <div>

                {/* <form onSubmit={onSubmit}> */}
                <form onSubmit={onSubmit}>
                    <h2>Create Your Folder</h2>
                    {show ?

                        errors.length > 0 ?
                            <>
                                <h4>Errors:</h4>
                                <ul className='errorsArray'>{errors.map(error => {
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
                        <div>
                            <input type='text'
                                required
                                placeholder='Folder Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <button
                            type='submit'
                        >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )


}

export default FolderForm
