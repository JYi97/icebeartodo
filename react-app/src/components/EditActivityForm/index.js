import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editOneActivity, deleteOneActivity } from '../../store/activities';
import './editactivityform.css'


const EditActivityForm = ({ activityId, activity, activities }) => {
    const history = useHistory()
    const [title, setTitle] = useState(activity?.title)
    const [context, setContext] = useState(activity?.context)
    // const [date, setDate] = useState(activity?.date)
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const folderId = activity?.folderId
    // console.log(folderId, "THIS IS THE FOLDER ID I HOPE")
    // console.log("THIS IS THE ACTIVITY DATE IN THE EDIT ACTIVITY FORM", activity?.date)
    // console.log("THIS IS THE ACTIVITY DATE IN THE EDIT ACTIVITY FORM", activity?.date.split("/"))
    const activityDateArr = activity.date.split("/")

    let activityDateEditValue

    if (activityDateArr) {
        [activityDateArr[0], activityDateArr[1]] = [activityDateArr[1], activityDateArr[0]]
        activityDateEditValue = activityDateArr.reverse().join("-")
    }

    // console.log("THIS IS THE SWAPPED ACTIVITY DATE I HOPE", activityDateEditValue)

    const [date, setDate] = useState(activityDateEditValue)

    const activitiesObjects = {}
    const forEachActivities = activities.forEach((activity) => {
        activitiesObjects[activity.title] = activity.id
    })

    // const filteredActivityT
    // comepare target with titles and if title matches then check id of activity and if target matches activity then it is okay

    // console.log("THIS IS THE ACTIVITIES TITLES ARRAY ", activityTitlesandIDs)

    const dispatch = useDispatch();

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('You must put a name with at least 1 character')
        if (title?.length > 50) error.push('Please insert a shorter title')
        console.log("THIS IS THE ACTIVITIES IN THE USEEFFECT", activitiesObjects, activityId)
        if (activitiesObjects[title] !== activityId && activitiesObjects[title]) {
            error.push('Ice Bear wants a new title')
        }
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
                context,
                date,
                activityId
            }
            console.log("THIS IS THE PAYLOAD", payload)
            await dispatch(editOneActivity(payload))
            await history.push(`/activities/${activityId}`)
            setShowForm(false)
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
                <button onClick={() => {
                    if (showForm) {
                        setShowForm(false)
                    } else {
                        setShowForm(true)
                    }
                }}>
                    Edit Activity
                </button>
            </div>
            {showForm ? <form onSubmit={onSubmit}>
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
            </form> : null}
            <div>
                {/* <form onSubmit={onSubmit}>
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
                </form> */}
                <h3>
                    Remove this activity
                </h3>
                <div>
                    <button
                        onClick={() => {
                            dispatch(deleteOneActivity(activityId))
                            setTitle('')
                            setContext('')
                            setDate('')
                            history.push(`/folders/${activity.folderId}`)
                        }}
                    >Delete This Activity
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditActivityForm
