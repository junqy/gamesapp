import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
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
            const game = state.gamesPlayed.find((item) => item.id === action.payload.id)
            state.gamesPlayed.pop(game)
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
        addFriend: (state, action) => {
            state.friends.push(action.payload.friend);
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
        addGameComment: (state, action) => {
            state.gameComments.push(action.payload.comment);
        },
        removeGameComment: (state, action) => {
            const comment = state.gameComments.find((item) => item.id === action.payload.id)
            state.gameComments.pop(comment)
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
    addGameComment,
    removeGameComment
} = authSlice.actions;
export default authSlice.reducer;
