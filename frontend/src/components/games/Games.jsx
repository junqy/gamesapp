import React from "react";
import { Card, List, Badge, Space, Button } from "antd";
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Games({ games, isUserGames, addRemoveGame, isAuthUserProfile, loading }) {
    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 4,
            }}
            dataSource={games}
            renderItem={(item) => (
                <List.Item style={{ padding: 0 }}>
                    {isUserGames && isAuthUserProfile && (
                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Button
                                shape="circle"
                                size="large"
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => addRemoveGame(item.id)}
                                disabled={loading}
                            />
                        </Space>
                    )}
                    <NavLink to={`/game/${item.id}`}>
                        <Card
                            actions
                            hoverable
                            cover={
                                <img
                                    alt="gameImg"
                                    src={item.background_image}
                                />
                            }
                        >
                            <Meta
                                title={item.name}
                                description={item.genres?.map((genre) =>
                                    item.genres[item.genres.length - 1].id ===
                                    genre.id
                                        ? genre.name
                                        : genre.name + " / "
                                )}
                                avatar={
                                    <Badge
                                        count={item.metacritic}
                                        color={
                                            item.metacritic > 74
                                                ? "#52c41a"
                                                : item.metacritic > 50
                                                ? "#faad14"
                                                : ""
                                        }
                                    />
                                }
                            />
                        </Card>
                    </NavLink>
                </List.Item>
            )}
        />
    );
}

export default Games;
