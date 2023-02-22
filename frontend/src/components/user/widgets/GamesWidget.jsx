import React, { useEffect } from "react";
import * as UserDetailsService from "../../../api/services/UserDetailsService";
import * as GamesService from "../../../api/services/rawg-services/GamesService";
import { useDispatch, useSelector } from "react-redux";
import { removeGame, setGamesPlayed, setUserGames } from "../../../state";
import { message, Card, Space } from "antd";
import Games from "../../games/Games";

function GamesWidget({ userId, currentUser, loading, setLoading }) {
    const dispatch = useDispatch();
    const gamesPlayed = useSelector((state) => state.gamesPlayed);
    const [messageApi, contextHolder] = message.useMessage();
    const isAuthUserProfile = currentUser === userId;

    const getUserGames = async () => {
        let gamesFetched = [];
        const response = await UserDetailsService.getUserGames(userId);
        if (!response.error) {
            const responses = await Promise.all(
                response.map(async (id) => {
                    const res = await GamesService.getGameDetails(id);
                    gamesFetched = [...gamesFetched, res];
                })
            );
            dispatch(setGamesPlayed({ games: gamesFetched }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const addRemoveGame = async (gameId) => {
        setLoading(true);
        const response = await UserDetailsService.addRemoveGame(userId, gameId);
        setLoading(false);
        if (!response.error) {
            dispatch(removeGame({ id: gameId }));
            dispatch(setUserGames({ games: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    useEffect(() => {
        getUserGames();
    }, [userId]);

    return (
        <>
            {contextHolder}
            <Card title="Lista gier">
                {gamesPlayed.length > 0 ? (
                    <Games
                        games={gamesPlayed}
                        isUserGames={true}
                        addRemoveGame={addRemoveGame}
                        isAuthUserProfile={isAuthUserProfile}
                        loading={loading}
                    />
                ) : (
                    <Space
                        size={10}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        Użytkownik nie ma żadnych gier na liście.
                    </Space>
                )}
            </Card>
        </>
    );
}

export default GamesWidget;
