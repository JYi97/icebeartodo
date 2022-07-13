import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const FolderProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  const folderUserIDs = useSelector(state => Object.values(state?.folder?.userId))
  const userId = folderUserIDs[0]
  return (
    <Route {...props}>
      {(userId && user.id == userId) ? props.children  : <Redirect to='/home' />}
    </Route>
  )
};


export default FolderProtectedRoute;
