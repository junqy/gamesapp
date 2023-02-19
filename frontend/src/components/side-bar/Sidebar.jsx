import React from "react";
import { Row, Col, Menu } from "antd";
import { Outlet, useLocation } from "react-router-dom";

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

function Sidebar() {
    const location = useLocation();
    const { pathname } = location;

    return (
        <Row gutter={[24, 24]}>
            <Col xs={24} md={8} lg={6} xl={4}>
                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={["sub1"]}
                    items={items}
                    mode="inline"
                />
            </Col>
            <Col xs={24} md={16} lg={18} xl={20}>
                <Outlet />
            </Col>
        </Row>
    );
}

export default Sidebar;
