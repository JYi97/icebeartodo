import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchActivitiesFolders } from '../../store/search';
import './searchbar.css';

function SearchBar({ currentUser }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const titles = useSelector(state => state?.search?.entries);
    const userId = currentUser.id
    // console.log("THIS IS THE TITLES IN SEARCH BAR", titles)

    const folderTitles = titles?.folder_titles?.map(folder => folder.title)

    const activityTitles = titles?.activity_titles?.map(activity => activity.title)

    // console.log("THIS IS THE FOLDER TITLES", folderTitles)
    // console.log("THIS IS THE ACTIVITIES TITLES", activityTitles)

    const folders = titles?.folder_titles

    const activities = titles?.activity_titles

    // console.log("THIS IS THE FOLDER", folders)
    // console.log("THIS IS THE ACTIVITIES", activities)


    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const folderResults = folders?.filter(folder => folder.title.toLowerCase().includes(search.toLowerCase()))
        const activityResults = activities?.filter(activity => activity.title.toLowerCase().includes(search.toLowerCase()))
        let results
        if (!folderResults && activityResults) {
            results = activityResults
            setSearchResults(results)
        }
        if (folderResults && !activityResults) {
            results = folderResults
            setSearchResults(results)
        }
        if (folderResults && activityResults) {
            results = folderResults.concat(activityResults)
            setSearchResults(results)
        }
        // console.log("THIS IS THE RESULTS IN THE SEARCH BAR USEEFFECT", results)

        // setSearchResults(results)
        // console.log("THIS IS THE SEARCH RESULTS AFTER THE SET SEARCH RESULT", searchResults)

        if (!results || search === '') {
            setSearchResults('')
        }
    }, [search])

    useEffect(() => {
        dispatch(searchActivitiesFolders(userId))
    }, [userId])

    return (
        <>
            <div className='search-bar-container'>
                <input
                    type='text'
                    name='search-bar'
                    placeholder='Search'
                    onChange={e => setSearch(e.target.value)}
                    onBlur={() => setSearchResults('')}
                    value={search}
                />
                <div className='search-bar-search-results'>
                    <ul>
                        {searchResults?.length > 0 && searchResults?.map(result => (
                            <>
                            {result.folderId ? <div
                            className='search-bar-dropdown'
                            key={result.id}
                            onMouseDown={()=>{
                                setSearch('')
                                setSearchResults([])
                                history.push(`/folders/${result.folderId}`)
                            }}>
                                <p>{result.title}</p>
                            </div> : <div
                            className='search-bar-dropdown'
                            key={result.id}
                            onMouseDown={()=>{
                                setSearch('')
                                setSearchResults([])
                                history.push(`/activities/${result.activityId}`)
                            }}><p>{result.title}</p>
                            </div>}
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SearchBar
