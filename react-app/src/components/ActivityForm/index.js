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

    const currentYear = new Date().getFullYear()
    const maxYear = new Date().getFullYear() + 5



    useEffect(() => {
        const error = [];
        if (title?.length < 1) error.push('Ice Bear wants at least 1 character')
        if (title?.length > 50) error.push('Ice Bear wants a shorter title')
        if (title?.startsWith(" ")) error.push('Ice Bear does not want empty title.')
        if (context?.length > 255) error.push('Ice Bear wants a shorter context.')
        if (Number(date.slice(0, 4)) < currentYear) error.push('Ice Bear can only make activities from current year to future.')
        if (Number(date.slice(0, 4)) > maxYear) error.push('Ice Bear cannot make activities far from present.')
        if (activityTitles.includes(title)) error.push('Ice Bear already made that activity in this folder.')
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
            <div className='activity-form-img-caption-button-form-container'>
                <img src='https://mystickermania.com/cdn/stickers/we-bare-bears/wbb-ice-bear-shopping-512x512.png' alt=''></img>
                <div className='activity-form-activity-form-show-button'>
                    <div className='activity-form-add-activity-into'>
                        Add an activity

                    </div>
                    <div className='activity-form-options-button-container'>
                        <button onClick={() => {
                            if (showForm) {
                                setShowForm(false)
                            } else {
                                setShowForm(true)
                            }
                        }}>
                            <img className='folder-form-new-folder-form-button' src='https://icon-library.com/images/add-on-icon/add-on-icon-1.jpg' alt=''></img>
                        </button>
                    </div>


                    {showForm ? <div>
                        <form onSubmit={onSubmit}>
                            <h2 className='create-activity-form-header'>Create Your Activity</h2>
                            {show ?

                                errors.length > 0 ?
                                    <>
                                        {errors.map(error => {
                                            return (
                                                <>
                                                    <div className='create-activity-errorsArray'
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
                                        required
                                        className='create-activity-form-title-input'
                                        placeholder='Activity Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input type='text'
                                        className='create-activity-form-context-input'
                                        placeholder='Activity Context'
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input type='date'
                                        className='create-activity-form-date-input'
                                        onKeyDown={(e) => e.preventDefault()}
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className='create-activity-form-submit-button-container'>
                                    <button className='create-activity-form-submit-button'
                                        type='submit'
                                    >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div> : null}
                </div>
            </div>
        </>
    )
}

export default ActivityForm
