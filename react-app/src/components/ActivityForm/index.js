import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createOneActivity } from '../../store/activities';
import './activityform.css'

const ActivityForm = ({ folderId, activities }) => {
    const [title, setTitle] = useState('')
    const [context, setContext] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch()
    // console.log("THIS IS THE ACTIVITIES", activities)

    const activityTitles = activities.map((activity) => {
        return activity.title
    })



    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('Ice Bear wants at least 1 character')
        if (title?.length > 50) error.push('Ice Bear wants a shorter title')
        if (title?.startsWith(" ")) error.push('Ice Bear does not want empty title.')
        if (activityTitles.includes(title)) error.push('Ice Bear already made that activity in this folder.')
        setErrors(error);
    }, [title, date])


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
                context,
                date
            }

            dispatch(createOneActivity(payload))
            setTitle('')
            setContext('')
            setDate('')
            setErrors([])
            setShowForm(false)

        }
    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <>
            <div>
                This is the form to create an activity.
            </div>
            <div>
                <button onClick={() => {
                    if (showForm) {
                        setShowForm(false)
                    } else {
                        setShowForm(true)
                    }
                }}>
                    Add an Activity
                </button>
            </div>
            {showForm ? <div>
                <form onSubmit={onSubmit}>
                    <h2>Create Your Activity</h2>
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
                                onKeyDown={(e) => e.preventDefault()}
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
            </div> : null}

        </>
    )
}

export default ActivityForm
