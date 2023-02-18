import React from "react";
import { Card, List } from "antd";

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
                    <Card
                        hoverable
                        cover={
                            <img alt="gameImg" src={item.background_image} />
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
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}

export default Games;
