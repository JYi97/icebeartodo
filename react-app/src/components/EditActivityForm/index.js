import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editOneActivity } from '../../store/activities';
import './editactivityform.css'


const EditActivityForm = ({activityId, activity}) => {
    const history = useHistory()
    const [title, setTitle] = useState(activity?.title)
    const [context, setContext] = useState(activity?.context)
    const [date, setDate] = useState(activity?.date)
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('You must put a name with at least 1 character')
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
                activityId,
                title,
                context,
                date
            }
            await dispatch(editOneActivity(payload))
            await history.push(`/activities/${activityId}`)
        }

    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <>
        <div>
            This is the form to edit an activity.
        </div>
        <div>
            <form onSubmit={onSubmit}>
                <h2>Edit Your Activity</h2>
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
                            placeholder='Activity Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type='text'
                            placeholder='Activity Context'
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type='date'
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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

export default EditActivityForm
