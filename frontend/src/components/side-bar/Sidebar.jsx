import React from "react";
import { Row, Col, Menu, Grid, Space } from "antd";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { FaUserFriends, FaCrosshairs, FaGamepad, FaTag } from "react-icons/fa";
import Searchbar from "../navbar/Searchbar";

const { useBreakpoint } = Grid;

function getItem(label, key, children, icon) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(
        <NavLink to="/">Wszystkie gry</NavLink>,
        "/",
        "",
        <AiFillAppstore />
    ),
    getItem(<Link to="/genres">Gatunki</Link>, "/genres", "", <FaCrosshairs />),
    getItem(
        <Link to="/platforms">Platformy</Link>,
        "/platforms",
        "",
        <FaGamepad />
    ),
    getItem(<Link to="/tags">Tagi</Link>, "/tags", "", <FaTag />),
    getItem(
        <Link to="/developers">Developerzy</Link>,
        "/developers",
        "",
        <FaUserFriends />
    ),
];

function Sidebar({ loading, setLoading }) {
    const location = useLocation();
    const { pathname } = location;
    const breakpoints = useBreakpoint();

    return (
        <Row gutter={[24, 24]}>
            <Col xs={24} md={8} lg={6} xl={4}>
                {breakpoints.xs && (
                    <Space
                        direction="vertical"
                        style={{ width: "100%", marginBottom: 10 }}
                    >
                        <Searchbar loading={loading} setLoading={setLoading} />
                    </Space>
                )}
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
