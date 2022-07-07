import './homepage.css'
import FoldersList from '../FoldersList'
import TodayActivities from '../TodayActivities'

const HomePage = () => {

    return (
        <>
            <h1> Ice Bear's To-Do List</h1>
            <div>
                <FoldersList />
            </div>
            <div>
                <TodayActivities />
            </div>
        </>
    )
}

export default HomePage
