import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    gameDb: null,
    friends: [],
    games: [],
    filters: [],
    gamesPlayed: [],
    gameComments: []
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
        setUserGames: (state, action) => {
            if (state.user) {
                state.user.gamesPlayed = action.payload.games;
            } else {
                console.error("user games non existent");
            }
        },
        removeGame: (state, action) => {
            const newGames = state.gamesPlayed.filter((item) => item.id !== action.payload.id)
            state.gamesPlayed = newGames
        },
        setGamesPlayed: (state, action) => {
            state.gamesPlayed = action.payload.games;
        },
        setUserPhoto: (state, action) => {
            if (state.user) {
                state.user.picture = action.payload.picture;
            } else {
                console.error("user photo non existent");
            }
        },
        setFriends: (state, action) => {
            state.friends = action.payload.friends;
        },
        removeFriend: (state, action) => {
            const newFriends = state.friends.filter((item) => item._id !== action.payload.id)
            state.friends = newFriends
        },
        addFriend: (state, action) => {
            state.friends = [...state.friends, action.payload.friend]
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
        setGameComments: (state, action) => {
            state.gameComments = action.payload.comments;
        },
        likeComment: (state, action) => {
            state.gameComments.map((item) => item._id === action.payload.id ? item.likes = action.payload.likes : item)
        },
        removeGameComment: (state, action) => {
            const newComments = state.gameComments.filter((item) => item._id !== action.payload.id)
            state.gameComments = newComments
        },
        addGamesPage: (state, action) => {
            state.games = [...state.games, ...action.payload.games];
        },
        setFilters: (state, action) => {
            state.filters = action.payload.filters;
        },
        addFiltersPage: (state, action) => {
            state.filters = [...state.filters, ...action.payload.filters];
        },
        setGameDb: (state, action) => {
            state.gameDb = action.payload.gameDb
        }
    },
});

export const {
    setLogin,
    setLogout,
    setFriends,
    setUserFriends,
    setUserPhoto,
    addFriend,
    setNotifications,
    setNotificationsEmpty,
    setGames,
    addGamesPage,
    setFilters,
    addFiltersPage,
    setUserGames,
    setGamesPlayed,
    removeGame,
    setGameComments,
    removeGameComment,
    likeComment,
    setGameDb,
    removeFriend
} = authSlice.actions;
export default authSlice.reducer;
