const serializeUserFriendsList = (data) => {
    const friendsList = []
    for (const item of data) {
        friendsList.push(item._id)
    }
    return friendsList
}

const serializeFriendsListRemove = (data, id) => {
    const friendsList = data.filter((item) => item._id !== id)
    return friendsList
}

export { serializeUserFriendsList, serializeFriendsListRemove }