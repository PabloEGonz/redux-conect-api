import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../app/users/userSlice';


const FetchUsers = () => {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div><h1>Loading ...</h1></div>
        )
    }
    else if (error) {
        return (
            <div><h1>Something went wrong, error: {error}</h1></div>
        )
    }
    return (
        <div>{users.map((user) => {
            return <p key={user.login.uuid}>{user.name.first + ' ' + user.name.last}</p>
        })}</div>
    )
}
export default FetchUsers;