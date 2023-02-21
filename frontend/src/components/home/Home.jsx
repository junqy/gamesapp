import React, { useEffect, useState, useRef } from "react";
import { message, Row, Col, Space } from "antd";
import * as GamesService from "../../api/services/rawg-services/GamesService";
import Games from "../games/Games";
import { useDispatch, useSelector } from "react-redux";
import { addGamesPage, setGames } from "../../state";
import useOnScreen from "../../hooks/useOnScreen";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../loading/Spinner";

function Home({ loading, setLoading }) {
    const bottomRef = useRef(null);
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(1);
    const isBottom = useOnScreen(bottomRef);
    const { pathname } = useLocation();
    const { name } = useParams();
    const [dataEnd, setDataEnd] = useState(false);

    const getGames = async (param, id) => {
        if (dataEnd) {
            return null;
        }
        setLoading(true);
        const response = await GamesService.getGames(page, param, id);
        setLoading(false);
        if (response.next === null) {
            setDataEnd(true);
        }
        if (!response.error) {
            if (page === 1) {
                dispatch(setGames({ games: response.results }));
                setPage(2);
            } else if (isBottom) {
                dispatch(addGamesPage({ games: response.results }));
                setPage(page + 1);
            }
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const handleQueryParams = () => {
        if (pathname.startsWith("/genres")) {
            getGames("genres", name);
        } else if (pathname.startsWith("/tags")) {
            getGames("tags", name);
        } else if (pathname.startsWith("/developers")) {
            getGames("developers", name);
        } else if (pathname.startsWith("/platforms")) {
            getGames("platforms", name);
        } else {
            getGames();
        }
    };

    useEffect(() => {
        dispatch(setGames({ games: [] }));
        setPage(1);
        setDataEnd(false)
    }, [pathname]);

    useEffect(() => {
        handleQueryParams();
    }, [isBottom]);

    return (
        <>
            {contextHolder}
            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <Games games={games} isUserGames={false}/>
                </Col>
                <Col ref={bottomRef} xs={24}>
                    <Space
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        {loading && <Spinner />}
                    </Space>
                </Col>
            </Row>
        </>
    );
}

export default Home;
