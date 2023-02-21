import React from "react";
import { Card, List } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const { Meta } = Card;

function Filters({ filters }) {
    const { pathname } = useLocation();

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
            dataSource={filters}
            renderItem={(item) => (
                <List.Item style={{ padding: 0 }}>
                    <NavLink to={`${pathname}/${item.id}`}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="background"
                                    src={item.image_background}
                                />
                            }
                        >
                            <Meta
                                title={item.name}
                                description={"Ilość: " + item.games_count}
                            />
                        </Card>
                    </NavLink>
                </List.Item>
            )}
        />
    );
}

export default Filters;
