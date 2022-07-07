import './FoldersList.css'


const FoldersList = () => {

    return (
        <>
            <h3>
                List of Folders
            </h3>
            <div>
                Today's Activities Folder
                <div>
                    Activities for the current day and can be hidden so only the title of folder will be displayed.
                </div>
            </div>
            <div>
                Upcoming Acitivities Folder
                <div>
                    Activities for events in the future or can be hidden so only title of folder will be displayed.
                </div>
            </div>
        </>
    )
}

export default FoldersList
