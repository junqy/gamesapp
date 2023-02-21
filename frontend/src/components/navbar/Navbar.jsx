import "./Navbar.css";
import React from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Grid } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import Notifications from "../notifications/Notifications";
import Searchbar from "./Searchbar";
import LogoBig from "../../icons/LogoBig";

const { useBreakpoint } = Grid;

function Navbar({ isAuth, currentUser, loading, setLoading }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { pathname } = location;
    const breakpoints = useBreakpoint();

    return (
        <Menu
            mode="horizontal"
            style={{ display: "flex" }}
            selectedKeys={[pathname]}
        >
            <Menu.Item key="/" style={{ top: 12 }}>
                <Link to="/">
                    <LogoBig style={{ width: 150 }} />
                </Link>
            </Menu.Item>

            {!breakpoints.xs && (
                <Menu.Item
                    style={{ width: "50%", cursor: "default" }}
                    key="searchBar"
                >
                    <Searchbar loading={loading} setLoading={setLoading} />
                </Menu.Item>
            )}
            {breakpoints.md ? (
                <>
                    <Menu.SubMenu
                        key="submenuBig"
                        style={{ marginLeft: "auto" }}
                        icon={<UserOutlined style={{ marginLeft: 10 }} />}
                    >
                        {isAuth ? (
                            <>
                                <Menu.Item key="/user">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to={`/user/${currentUser}`}
                                    >
                                        Profil
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="logout"
                                    onClick={() => dispatch(setLogout())}
                                >
                                    <Link style={{ fontWeight: 600 }} to="/">
                                        Wyloguj
                                    </Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item key="/sign_in">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to="/sign_in"
                                    >
                                        Logowanie
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/sign_up">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to="/sign_up"
                                    >
                                        Rejestracja
                                    </Link>
                                </Menu.Item>
                            </>
                        )}
                    </Menu.SubMenu>
                </>
            ) : (
                <>
                    <Menu.SubMenu
                        key="submenuSmall"
                        style={{ marginLeft: "auto" }}
                        icon={<UserOutlined />}
                    >
                        {isAuth ? (
                            <>
                                <Menu.Item key="/user">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to={`/user/${currentUser}`}
                                    >
                                        Profil
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="logout"
                                    onClick={() => dispatch(setLogout())}
                                >
                                    <Link style={{ fontWeight: 600 }} to="/">
                                        Wyloguj
                                    </Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item key="/sign_in">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to="/sign_in"
                                    >
                                        Logowanie
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/sign_up">
                                    <Link
                                        style={{ fontWeight: 600 }}
                                        to="/sign_up"
                                    >
                                        Rejestracja
                                    </Link>
                                </Menu.Item>
                            </>
                        )}
                    </Menu.SubMenu>
                </>
            )}
            {isAuth && (
                <Menu.Item key="notificationMenu">
                    <Notifications />
                </Menu.Item>
            )}
        </Menu>
    );
}

export default Navbar;
