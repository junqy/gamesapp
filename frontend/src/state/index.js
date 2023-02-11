import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    friends: [],
    games: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setUserFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non existent");
            }
        },
        setFriends: (state, action) => {
            state.friends = action.payload.friends;
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload.friend)
        },
        setNotifications: (state, action) => {
            if (state.user) {
                state.user.notifications = action.payload.notifications;
            } else {
                console.error("user notifications non existent");
            }
        },
        setNotificationsEmpty: (state) => {
            if (state.user) {
                state.user.notifications = [];
            } else {
                console.error("user notifications non existent");
            }
        },
        setGames: (state, action) => {
            state.games = action.payload.games;
        },
    },
});

export const {
    setLogin,
    setLogout,
    setFriends,
    setUserFriends,
    addFriend,
    setNotifications,
    setNotificationsEmpty,
    setGames,
} = authSlice.actions;
export default authSlice.reducer;
