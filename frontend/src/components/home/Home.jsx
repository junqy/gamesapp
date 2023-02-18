import React, { useEffect, useState, useRef } from "react";
import { message, Row, Col, Menu, Space } from "antd";
import * as GamesService from "../../api/services/rawg-services/GamesService";
import Games from "../games/Games";
import { useDispatch, useSelector } from "react-redux";
import { addGamesPage, setGames } from "../../state";
import useOnScreen from "../../hooks/useOnScreen";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function getItem(label, key, children, icon) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem("Wszystkie gry", "/"),
    getItem("Navigation Two", "2"),
    getItem("Navigation Two", "sub1", [
        getItem("Option 3", "3"),
        getItem("Option 4", "4"),
    ]),
    getItem("Navigation Three", "sub2", [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
    ]),
];

const spinIcon = (
    <LoadingOutlined
    style={{
        fontSize: 32,
    }}
    spin
/>
)

function Home({ loading, setLoading }) {
    const bottomRef = useRef(null);
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(1);
    const isBottom = useOnScreen(bottomRef);

    const getGames = async () => {
        setLoading(true)
        const response = await GamesService.getGames(page);
        setLoading(false)
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

    useEffect(() => {
        getGames();
    }, [isBottom]);

    return (
        <>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={4}>
                    <Menu
                        defaultSelectedKeys={["/"]}
                        defaultOpenKeys={["sub1"]}
                        items={items}
                        mode="inline"
                    />
                </Col>
                <Col xs={24} md={20}>
                    <Games games={games} />
                </Col>
                <Col ref={bottomRef} xs={24}>
                    <Space
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        {loading && (
                            <Spin indicator={spinIcon} />
                        )}
                    </Space>
                </Col>
            </Row>
        </>
    );
}

export default Home;
