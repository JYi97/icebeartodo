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

    const currentYear = new Date().getFullYear()
    const maxYear = new Date().getFullYear() + 5

    // const filteredActivityT
    // comepare target with titles and if title matches then check id of activity and if target matches activity then it is okay

    // console.log("THIS IS THE ACTIVITIES TITLES ARRAY ", activityTitlesandIDs)

    const dispatch = useDispatch();

    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('Ice Bear wants a title with at least 1 character')
        if (title?.length > 50) error.push('Ice Bear wants a shorter title.')
        if (title?.startsWith(" ")) error.push('Ice Bear does not want empty title.')
        if (context?.length > 255) error.push('Ice Bear wants a shorter context.')
        // console.log("THIS IS THE ACTIVITIES IN THE USEEFFECT", activitiesObjects, activityId)
        if (Number(date.slice(0, 4)) < currentYear) error.push('Ice Bear can only make activities from current year to future.')
        if (Number(date.slice(0, 4)) > maxYear) error.push('Ice Bear cannot make activities far from present.')
        if (activitiesObjects[title] && activitiesObjects[title] !== activityId) {
            error.push('Ice Bear already made an activity with that title')
        }
        setErrors(error);
    }, [title, context, date])

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
            // console.log("THIS IS THE PAYLOAD", payload)
            await dispatch(editOneActivity(payload))
            await history.push(`/activities/${activityId}`)
            setShowForm(false)
        }

    }



    useEffect(() => {

    }, [onSubmit])

    return (
        <>
            <div className='edit-activity-img-options-button-container'>
                <div className='edit-activity-title'>
                    <div className='activity-details-page-activity-details'>
                        <div className='activity-details-page-activity-title'>
                            {activity.title}
                        </div>
                        <div className='activity-details-page-activity-context'>
                            {activity.context}
                        </div>
                        <div className='activity-details-page-activity-date'>
                            {activity.date}
                        </div>
                    </div>

                    {/* <div>
                        <button className='edit-activity-options-button' onClick={() => {
                            if (showForm) {
                                setShowForm(false)
                            } else {
                                setShowForm(true)
                            }
                        }}>
                            Options
                        </button>
                        <div className='edit-activity-icebear-img1'>
                            <img src='https://i.pinimg.com/originals/01/50/bb/0150bb30e1e7804130e1112a59116a44.png' alt=''></img>
                        </div>
                    </div> */}

                    {showForm ? <form onSubmit={onSubmit}>
                        {show ?
                            errors.length > 0 ?
                                <>
                                    {errors.map(error => {
                                        return (
                                            <>
                                                <div className='edit-activity-form-errors'
                                                    key={error}>{error}</div>
                                            </>
                                        )
                                    })}

                                </>
                                : null

                            : null}
                        <div>
                            <div>
                                <input type='text'
                                    className='edit-activity-form-title-input'
                                    required
                                    placeholder='Activity Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type='text'
                                    className='edit-activity-form-context-input'
                                    placeholder='Activity Context'
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type='date'
                                    className='edit-activity-form-date-input'
                                    onKeyDown={(e) => e.preventDefault()}
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button className='edit-activity-form-edit-button'
                                type='submit'
                            >Edit</button>
                            <button className='edit-activity-form-delete-button'
                                onClick={() => {
                                    dispatch(deleteOneActivity(activityId))
                                    setTitle('')
                                    setContext('')
                                    setDate('')
                                    history.push(`/folders/${activity.folderId}`)
                                }}
                            >Delete
                            </button>
                        </div>
                    </form>

                        : null}
                    <div>
                        <div className='edit-activity-options-button-container'>
                            <button className='edit-activity-options-button' onClick={() => {
                                if (showForm) {
                                    setShowForm(false)
                                } else {
                                    setShowForm(true)
                                }
                            }}>
                                <img className='activity-form-options-button' src='https://cdn-icons-png.flaticon.com/512/109/109733.png' alt=''></img>
                            </button>

                        </div>
                        <div className='edit-activity-icebear-img1'>
                            <img src='https://i.pinimg.com/originals/01/50/bb/0150bb30e1e7804130e1112a59116a44.png' alt=''></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className='activities-details-page-practice-quote-container'>
                <div className='activities-details-page-practice-quote'>
                    Hone your skills and become a master like Ice Bear.
                </div>
            </div>
            <div className='activities-details-page-icebear-images-container'>
                <div>
                    <img className='activities-details-page-icebear-img2' src='https://s3.getstickerpack.com/storage/uploads/sticker-pack/we-bare-bears-1/sticker_7.png?b06d21a7be7c7c698a041705a4cf0bb0&d=200x200' alt=''></img>
                </div>
                <div>
                    <img className='activities-details-page-icebear-img3' src='https://tlgrm.eu/_/stickers/346/2a1/3462a144-2d9f-47cb-9515-a63b7c7f46ff/5.jpg' alt=''></img>
                </div>
                <div>
                    <img className='activities-details-page-icebear-img3' src='https://chpic.su/_data/stickers/w/wbbicebear/wbbicebear_041.webp' alt=''></img>
                </div>
            </div>
        </>
    )
}

export default EditActivityForm
