import React, { useEffect, useState } from "react";
import {
    message,
    Row,
    Col,
    Space,
    Card,
    Typography,
    theme,
    Tooltip,
    Button,
    Tag,
    Rate,
    Badge,
    Progress,
} from "antd";
import {
    CalendarOutlined,
    PlusCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import * as GamesService from "../../api/services/rawg-services/GamesService";
import {
    handlePlatformIcon,
    handlePlatformSimplify,
} from "../../helpers/HandlePlatformIcon";
import convertDate from "../../helpers/HandleDateFormat";
import { FaThumbsUp, FaThumbsDown, FaPoop } from "react-icons/fa";
import { GiGoat } from "react-icons/gi";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

const customIcons = {
    1: <FaPoop />,
    2: <FaThumbsDown />,
    3: <FaThumbsUp />,
    4: <GiGoat />,
};

function Game() {
    const { token } = useToken();
    const [game, setGame] = useState(null);
    const [gameDb, setGameDb] = useState(null);
    const [gameTrailers, setGameTrailers] = useState(null);
    const [ellipsis, setEllipsis] = useState({ rows: 3 });
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();

    const getGameFromApi = async () => {
        const response = await GamesService.getGameDetails(id);
        if (!response.error) {
            console.log(response);
            setGame(response);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const getGame = async () => {
        const response = await GamesService.getGameDatabase(id);
        if (!response.error) {
            setGameDb(response);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const getGameTrailers = async () => {
        const response = await GamesService.getGameTrailers(id);
        if (!response.error) {
            console.log(response.results);
            setGameTrailers(response.results);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const handlePlatforms = (arr) => {
        const platforms = [];
        arr?.map((platform) => platforms.push(platform.platform.slug));
        const simplifiedPlatforms = platforms.map((platform) =>
            handlePlatformSimplify(platform)
        );
        const filteredPlatforms = simplifiedPlatforms.filter(
            (item, index) => simplifiedPlatforms.indexOf(item) === index
        );
        return filteredPlatforms.map((platform) => (
            <div
                key={platform}
                style={{
                    fontSize: 20,
                    paddingTop: 5,
                    color: token.colorTextSecondary,
                }}
            >
                {handlePlatformIcon(platform)}
            </div>
        ));
    };

    useEffect(() => {
        getGameFromApi();
        getGame();
        getGameTrailers();
    }, []);

    const setExpanded = () => {
        setEllipsis(false);
    };

    const setCollapsed = () => {
        setEllipsis({ rows: 3 });
    };

    if (!game) return null;

    return (
        <>
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Space
                        size={15}
                        style={{
                            borderRadius: token.borderRadiusLG,
                            backgroundColor: token.colorBgElevated,
                            boxShadow: token.boxShadow,
                            width: "100%",
                            padding: "3px 8px 2px 8px",
                            marginBottom: 6,
                            justifyContent: "space-between",
                        }}
                    >
                        <Tooltip title="Data wydania">
                            <Text type="secondary">
                                <CalendarOutlined />{" "}
                                {game.released
                                    ? convertDate(game.released)
                                    : "TBA"}
                            </Text>
                        </Tooltip>
                        <Space>
                            <Tooltip title="Średni czas przejścia">
                                <Tag
                                    icon={<ClockCircleOutlined />}
                                    color="#00c1c1d6"
                                    style={{ marginRight: 2 }}
                                >
                                    {game.playtime}h
                                </Tag>
                            </Tooltip>
                            {handlePlatforms(game.platforms)}
                        </Space>
                    </Space>
                    <Card
                        bordered={false}
                        cover={
                            <img alt="gameImg" src={game.background_image} />
                        }
                    >
                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Title level={2}>{game.name}</Title>
                            <Progress
                                type="circle"
                                percent={game.metacritic}
                                strokeColor={
                                    game.metacritic > 74
                                        ? "#52c41a"
                                        : game.metacritic > 50
                                        ? "#faad14"
                                        : ""
                                }
                                width={50}
                                format={(percent) => `${percent}`}
                            />
                        </Space>
                        <Text type="secondary">Gatunek </Text>
                        <div style={{ marginBottom: 8 }}>
                            {game.genres?.map((tag) => (
                                <Tag
                                    color="cyan"
                                    style={{ marginBottom: 3 }}
                                    key={tag.id}
                                >
                                    {tag.name}
                                </Tag>
                            ))}
                        </div>
                        <Text type="secondary">Tagi </Text>
                        <div style={{ marginBottom: 10 }}>
                            {game.tags?.map((tag) => (
                                <Tag style={{ marginBottom: 3 }} key={tag.id}>
                                    {tag.name}
                                </Tag>
                            ))}
                        </div>
                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Rate
                                style={{ color: "cyan" }}
                                character={({ index }) =>
                                    customIcons[index + 1]
                                }
                            />
                            <Button icon={<PlusCircleOutlined />}>
                                Dodaj do biblioteki
                            </Button>
                        </Space>
                    </Card>
                    <Card style={{ marginTop: 6 }}>
                        <Space direction="vertical" size={2}>
                            <Title level={4}>Opis [EN]</Title>
                            <Paragraph
                                type={ellipsis ? "secondary" : "primary"}
                                ellipsis={ellipsis}
                            >
                                {game.description_raw}
                            </Paragraph>
                            {ellipsis ? (
                                <Button
                                    size="small"
                                    onClick={setExpanded}
                                    style={{ float: "right" }}
                                >
                                    Rozwiń
                                </Button>
                            ) : (
                                <Button
                                    size="small"
                                    onClick={setCollapsed}
                                    style={{ float: "right" }}
                                >
                                    Zwiń
                                </Button>
                            )}
                        </Space>
                        <Row>
                            <Col xs={24} md={12}>
                                <Text type="secondary">Platformy </Text>
                                <div style={{ marginBottom: 8 }}>
                                    {game.platforms?.map((tag) => (
                                        <Tag
                                            style={{ marginBottom: 3 }}
                                            key={tag.platform.id}
                                        >
                                            {tag.platform.name}
                                        </Tag>
                                    ))}
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <Text type="secondary">Developerzy </Text>
                                <div style={{ marginBottom: 8 }}>
                                    {game.developers?.map((tag) => (
                                        <Tag
                                            style={{ marginBottom: 3 }}
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </Tag>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    {gameTrailers?.length > 0 ?
                    <Card
                        cover={
                            <video controls autoPlay muted width="100%">
                                <source
                                    src={gameTrailers[0].data[480] ? gameTrailers[0].data[480] : "empty"}
                                    type="video/mp4"
                                />
                                Sorry, your browser doesn't support embedded
                                videos.
                            </video>
                        }
                    ></Card> : <Card></Card>
                }
                </Col>
            </Row>
        </>
    );
}

export default Game;
