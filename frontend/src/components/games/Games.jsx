import React from "react";
import { Card, List, Badge } from "antd";
import { NavLink } from "react-router-dom";

const { Meta } = Card;

function Games({ games }) {
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
                    <NavLink to={`/game/${item.id}`}>
                        <Card
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
