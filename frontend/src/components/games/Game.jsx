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
    Progress,
    Carousel,
    Image,
    List,
    Avatar,
    Form,
    Mentions,
    Divider,
    Statistic,
    Grid,
} from "antd";
import { Comment } from "@ant-design/compatible";
import {
    CalendarOutlined,
    PlusCircleOutlined,
    ClockCircleOutlined,
    RedditOutlined,
    UserOutlined,
    MinusCircleOutlined,
    LikeOutlined,
    LikeFilled,
    DeleteOutlined,
    StarFilled,
} from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";
import * as GamesService from "../../api/services/rawg-services/GamesService";
import * as UserDetailsService from "../../api/services/UserDetailsService";
import * as GameCommentsService from "../../api/services/GameCommentsService";
import {
    handlePlatformIcon,
    handlePlatformSimplify,
} from "../../helpers/HandlePlatformIcon";
import { convertDate, calculateHours } from "../../helpers/HandleDateFormat";
import { FaWindows } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setGameComments,
    setUserGames,
    likeComment,
    removeGameComment,
    setGameDb,
} from "../../state";
import Spinner from "../loading/Spinner";
import "./Game.css";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

function Game({ loading, setLoading, currentUser, isAuth }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { token } = useToken();
    const [game, setGame] = useState(null);
    const gameDb = useSelector((state) => state.gameDb);
    const [gameTrailers, setGameTrailers] = useState(null);
    const [gameScreenshots, setGameScreenshots] = useState(null);
    const [gameReddits, setGameReddits] = useState(null);
    const [ellipsis, setEllipsis] = useState({
        description: { rows: 3 },
        requirements: { rows: 3 },
    });
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();
    const currentUserGames = useSelector((state) =>
        state.user ? state.user.gamesPlayed : []
    );
    const gameComments = useSelector((state) => state.gameComments);
    const isUserGame = currentUserGames.includes(id);
    const breakpoints = useBreakpoint();

    const getGameFromApi = async () => {
        const response = await GamesService.getGameDetails(id);
        if (!response.error) {
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
            dispatch(setGameDb({ gameDb: response[0] }));
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
            setGameTrailers(response.results);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const getGameScreenshots = async () => {
        const response = await GamesService.getGameScreenshots(id);
        if (!response.error) {
            setGameScreenshots(response.results);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const getGameReddits = async () => {
        const response = await GamesService.getGameReddits(id);
        if (!response.error) {
            setGameReddits(response.results);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const getGameComments = async () => {
        const response = await GameCommentsService.getGameComments(id);
        if (!response.error) {
            dispatch(setGameComments({ comments: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const addComment = async (values) => {
        const commentObj = {
            userId: currentUser,
            gameId: id,
            content: values.content,
        };
        setLoading(true);
        const response = await GameCommentsService.addComment(commentObj);
        setLoading(false);
        if (!response.error) {
            form.resetFields();
            dispatch(setGameComments({ comments: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const likeDislikeComment = async (id, userId) => {
        setLoading(true);
        const response = await GameCommentsService.likeDislikeComment(id, {
            userId: userId,
        });
        setLoading(false);
        if (!response.error) {
            dispatch(likeComment({ id: id, likes: response.likes }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const removeUserComment = async (id) => {
        setLoading(true);
        const response = await GameCommentsService.removeComment(id);
        setLoading(false);
        if (!response.error) {
            dispatch(removeGameComment({ id: id }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const addRemoveGame = async (gameId) => {
        setLoading(true);
        const response = await UserDetailsService.addRemoveGame(
            currentUser,
            gameId
        );
        setLoading(false);
        if (!response.error) {
            dispatch(setUserGames({ games: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const rateGame = async (value) => {
        setLoading(true);
        const response = await GamesService.rateGame(id, {
            userId: currentUser,
            rate: value,
        });
        setLoading(false);
        if (!response.error) {
            dispatch(setGameDb({ gameDb: response }));
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

    const handleUsersMentions = (arr) => {
        const simplifiedUsers = arr.map((comment) => comment.username);
        const filteredUsers = simplifiedUsers.filter(
            (item, index) => simplifiedUsers.indexOf(item) === index
        );
        return filteredUsers.map((item) => ({
            value: item,
            label: item,
        }));
    };

    const handleRateLabel = (index) => {
        switch (index) {
            case 0:
                return "Fatalna";
            case 1:
                return "Może być";
            case 2:
                return "Dobra";
            case 3:
                return "Świetna!";
            default:
                break;
        }
    };

    const handleRateAverage = (ratings) => {
        const sumValues = Object.values(ratings).reduce(
            (a, b) => parseInt(a) + parseInt(b),
            0
        );
        const length = Object.keys(ratings).length;
        return sumValues / length;
    };

    const handleUserRating = (rate) => {
        switch (rate) {
            case "1":
                return <StarFilled />;
            case "2":
                return (
                    <>
                        <StarFilled />
                        <StarFilled />
                    </>
                );
            case "3":
                return (
                    <>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                    </>
                );
            case "4":
                return (
                    <>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                    </>
                );
            default:
                break;
        }
    };

    const handleSystemRequirements = (arr) => {
        const platform = arr?.find((item) => item.platform.slug === "pc");
        const minimumReq = platform?.requirements.minimum
            ? platform.requirements.minimum
            : null;
        const recommendedReq = platform?.requirements.recommended
            ? platform.requirements.recommended
            : null;
        if (!recommendedReq || !minimumReq) return null;
        const indexMin = minimumReq?.indexOf("Additional Notes:");
        const indexRec = recommendedReq?.indexOf("Additional Notes:");
        const minimumReqTruncated = minimumReq?.slice(0, indexMin);
        const maximumReqTruncated = recommendedReq?.slice(0, indexRec);

        return (
            <Space
                direction="vertical"
                style={{
                    marginTop: 10,
                    marginLeft: 5,
                    marginBottom: 20,
                    width: "100%",
                }}
            >
                <Text type="secondary">Minimalne</Text>
                <Paragraph ellipsis={ellipsis.requirements}>
                    {minimumReqTruncated.replace("Minimum:", "")}
                </Paragraph>
                <Text type="secondary">Rekomendowane</Text>
                <Paragraph ellipsis={ellipsis.requirements}>
                    {maximumReqTruncated.replace("Recommended:", "")}
                </Paragraph>
                {ellipsis.requirements ? (
                    <Button
                        name="requirements"
                        size="small"
                        onClick={(e) => setExpanded(e)}
                        style={{ float: "right" }}
                    >
                        Rozwiń
                    </Button>
                ) : (
                    <Button
                        name="requirements"
                        size="small"
                        onClick={(e) => setCollapsed(e)}
                        style={{ float: "right" }}
                    >
                        Zwiń
                    </Button>
                )}
            </Space>
        );
    };

    useEffect(() => {
        getGameFromApi();
        getGame();
        getGameTrailers();
        getGameScreenshots();
        getGameReddits();
        getGameComments();
    }, []);

    const setExpanded = (e) => {
        setEllipsis({
            ...ellipsis,
            [e.currentTarget.name]: false,
        });
    };

    const setCollapsed = (e) => {
        setEllipsis({
            ...ellipsis,
            [e.currentTarget.name]: { rows: 3 },
        });
    };

    if (!game || !gameDb)
        return (
            <Space style={{ width: "100%", justifyContent: "center" }}>
                <Spinner />
            </Space>
        );

    return (
        <>
            {contextHolder}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Space
                        size={15}
                        style={{
                            borderRadius: token.borderRadiusLG,
                            backgroundColor: token.colorBgElevated,
                            boxShadow: token.boxShadow,
                            width: "100%",
                            padding: "1px 8px 2px 8px",
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
                                    color="#28BEE0"
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
                            game.background_image ? (
                                <img
                                    alt="gameImg"
                                    src={game.background_image}
                                />
                            ) : null
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
                                percent={game.metacritic ? game.metacritic : 0}
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
                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                                marginBottom: breakpoints.xs ? 0 : 10,
                            }}
                            direction={
                                breakpoints.xs ? "vertical" : "horizontal"
                            }
                        >
                            <Space direction="vertical" size={0}>
                                <Text type="secondary">Ocena</Text>
                                <Rate
                                    count={4}
                                    disabled={!isAuth || loading}
                                    onChange={rateGame}
                                    value={
                                        !isAuth
                                            ? null
                                            : gameDb?.ratings[currentUser]
                                            ? gameDb?.ratings[currentUser]
                                            : null
                                    }
                                    character={({ index }) => (
                                        <Tooltip title={handleRateLabel(index)}>
                                            <StarFilled />
                                        </Tooltip>
                                    )}
                                />
                            </Space>
                            <Space direction="vertical" size={0} style={{marginTop: 8}}>
                                <Text type="secondary">Gatunek </Text>
                                <div style={{ marginBottom: 8}}>
                                    {game.genres?.map((tag) => (
                                        <Link
                                            to={`/genres/${tag.id}`}
                                            key={tag.id}
                                        >
                                            <Tag
                                                color="blue"
                                                style={{
                                                    marginBottom: 3,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {tag.name}
                                            </Tag>
                                        </Link>
                                    ))}
                                </div>
                            </Space>
                        </Space>
                        <Text type="secondary">Tagi </Text>
                        <div style={{ marginBottom: 10 }}>
                            {game.tags?.map((tag) => (
                                <Link to={`/tags/${tag.id}`} key={tag.id}>
                                    <Tag
                                        style={{
                                            marginBottom: 3,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {tag.name}
                                    </Tag>
                                </Link>
                            ))}
                        </div>

                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Space>
                                <Statistic
                                    title="Średnia ocen"
                                    prefix={
                                        <StarFilled
                                            style={{
                                                color: token.colorWarningHover,
                                            }}
                                        />
                                    }
                                    value={
                                        Object.keys(gameDb?.ratings).length > 0
                                            ? handleRateAverage(
                                                  gameDb.ratings
                                              ) + "/4"
                                            : 0
                                    }
                                />
                            </Space>
                            {!isAuth ? null : isUserGame ? (
                                <Button
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => addRemoveGame(game.id)}
                                    disabled={loading}
                                >
                                    Usuń z biblioteki
                                </Button>
                            ) : (
                                <Button
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => addRemoveGame(game.id)}
                                    disabled={loading}
                                >
                                    Dodaj do biblioteki
                                </Button>
                            )}
                        </Space>
                    </Card>
                    <Card style={{ marginTop: 6 }}>
                        <Space direction="vertical" size={2}>
                            <Title level={4}>Opis [EN]</Title>
                            <Paragraph
                                type={
                                    ellipsis.description
                                        ? "secondary"
                                        : "primary"
                                }
                                ellipsis={ellipsis.description}
                            >
                                {game.description_raw}
                            </Paragraph>
                            {ellipsis.description ? (
                                <Button
                                    name="description"
                                    size="small"
                                    onClick={(e) => setExpanded(e)}
                                    style={{ float: "right" }}
                                >
                                    Rozwiń
                                </Button>
                            ) : (
                                <Button
                                    name="description"
                                    size="small"
                                    onClick={(e) => setCollapsed(e)}
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
                                        <Link
                                            to={`/platforms/${tag.platform.id}`}
                                            key={tag.platform.id}
                                        >
                                            <Tag
                                                style={{
                                                    marginBottom: 3,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {tag.platform.name}
                                            </Tag>
                                        </Link>
                                    ))}
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <Text type="secondary">Developerzy </Text>
                                <div style={{ marginBottom: 8 }}>
                                    {game.developers?.map((tag) => (
                                        <Link
                                            to={`/developers/${tag.id}`}
                                            key={tag.id}
                                        >
                                            <Tag
                                                style={{
                                                    marginBottom: 3,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {tag.name}
                                            </Tag>
                                        </Link>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        cover={
                            gameTrailers?.length > 0 ? (
                                <>
                                    <video
                                        controls
                                        autoPlay
                                        muted
                                        width="100%"
                                        style={{
                                            borderTopLeftRadius:
                                                token.borderRadiusLG,
                                            borderTopRightRadius:
                                                token.borderRadiusLG,
                                        }}
                                    >
                                        <source
                                            src={
                                                gameTrailers[0].data[480]
                                                    ? gameTrailers[0].data[480]
                                                    : "empty"
                                            }
                                            type="video/mp4"
                                        />
                                        Sorry, your browser doesn't support
                                        embedded videos.
                                    </video>
                                    <Space
                                        style={{
                                            width: "100%",
                                            justifyContent: "center",
                                            paddingTop: 4,
                                        }}
                                    >
                                        <Image.PreviewGroup>
                                            {gameScreenshots?.map((image) => (
                                                <Image
                                                    src={image.image}
                                                    key={image.id}
                                                    width={"33.3%"}
                                                    style={{
                                                        borderRadius:
                                                            token.borderRadiusLG,
                                                        padding: 2,
                                                    }}
                                                />
                                            ))}
                                        </Image.PreviewGroup>
                                    </Space>
                                </>
                            ) : (
                                <Image.PreviewGroup>
                                    <Carousel autoplay infinite={false}>
                                        {gameScreenshots?.map((image) => (
                                            <Image
                                                src={image.image}
                                                key={image.id}
                                            />
                                        ))}
                                    </Carousel>
                                </Image.PreviewGroup>
                            )
                        }
                    >
                        {handleSystemRequirements(game.platforms) && (
                            <Space
                                style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text type="secondary">
                                    Wymagania systemowe
                                </Text>
                                <FaWindows
                                    style={{
                                        fontSize: 20,
                                        color: token.colorTextSecondary,
                                    }}
                                />
                            </Space>
                        )}
                        {handleSystemRequirements(game.platforms)}
                        <Space style={{ width: "100%" }}>
                            <Text type="secondary">Reddit - posty</Text>
                        </Space>
                        <List
                            itemLayout="horizontal"
                            dataSource={gameReddits?.slice(0, 5)}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            item.image ? (
                                                <Avatar
                                                    size="large"
                                                    shape="square"
                                                    src={item.image}
                                                />
                                            ) : (
                                                <Avatar
                                                    size="large"
                                                    shape="square"
                                                >
                                                    <RedditOutlined />
                                                </Avatar>
                                            )
                                        }
                                        title={
                                            <Paragraph ellipsis={{ rows: 2 }}>
                                                <Link
                                                    href={item.url}
                                                    target="_blank"
                                                >
                                                    {item.name}
                                                </Link>
                                            </Paragraph>
                                        }
                                        description={
                                            <>
                                                <UserOutlined />{" "}
                                                {item.username.replace(
                                                    "/u/",
                                                    ""
                                                )}
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24}>
                    <Card title="Komentarze">
                        {gameComments?.length > 0 ? (
                            gameComments.map((item) => (
                                <Comment
                                    author={
                                        <NavLink to={`/user/${item.userId}`}>
                                            <span className="user-link">
                                                {item.username}
                                            </span>
                                        </NavLink>
                                    }
                                    actions={[
                                        <Tooltip
                                            title={
                                                Object.keys(
                                                    item?.likes
                                                ).includes(currentUser)
                                                    ? "Nie lubię"
                                                    : "Polub"
                                            }
                                        >
                                            <span
                                                onClick={
                                                    isAuth
                                                        ? () =>
                                                              likeDislikeComment(
                                                                  item._id,
                                                                  currentUser
                                                              )
                                                        : null
                                                }
                                            >
                                                {Object.keys(
                                                    item?.likes
                                                ).includes(currentUser) ? (
                                                    <LikeFilled />
                                                ) : (
                                                    <LikeOutlined />
                                                )}
                                                <span
                                                    style={{ paddingLeft: 8 }}
                                                >
                                                    {
                                                        Object.keys(item?.likes)
                                                            .length
                                                    }
                                                </span>
                                            </span>
                                        </Tooltip>,
                                        isAuth &&
                                            item.userId === currentUser && (
                                                <Tooltip title="Usuń">
                                                    <span
                                                        onClick={() =>
                                                            removeUserComment(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <DeleteOutlined />
                                                    </span>
                                                </Tooltip>
                                            ),
                                    ]}
                                    avatar={
                                        <NavLink to={`/user/${item.userId}`}>
                                            <Avatar
                                                alt="avatar"
                                                style={{
                                                    backgroundColor: "#28BEE0",
                                                }}
                                            >
                                                {item.username[0].toUpperCase()}
                                            </Avatar>
                                        </NavLink>
                                    }
                                    content={item.content}
                                    datetime={
                                        <>
                                            <Tooltip
                                                title={convertDate(
                                                    item.createdAt
                                                )}
                                            >
                                                {calculateHours(item.createdAt)}
                                            </Tooltip>
                                            {gameDb.ratings[item.userId] ? (
                                                <span
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    Ocena gry:{" "}
                                                    {handleUserRating(
                                                        gameDb.ratings[
                                                            item.userId
                                                        ]
                                                    )}
                                                </span>
                                            ) : null}
                                        </>
                                    }
                                    key={item._id}
                                />
                            ))
                        ) : (
                            <Text type="secondary">
                                Gra nie ma żadnych komentarzy.
                            </Text>
                        )}
                        <Divider />
                        <Form
                            layout="horizontal"
                            form={form}
                            onFinish={addComment}
                        >
                            <Form.Item
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Wprowadź komentarz",
                                    },
                                ]}
                            >
                                <Mentions
                                    disabled={!isAuth}
                                    rows={3}
                                    placeholder="Wprowadź swój komentarz (użyj @ aby komuś odpowiedzieć)"
                                    options={handleUsersMentions(gameComments)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" disabled={!isAuth || loading}>
                                    Dodaj komentarz
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Game;
