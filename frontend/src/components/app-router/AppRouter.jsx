import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Navbar from "../navbar/Navbar";
import Games from "../games/Games";
import { Layout, Grid, Typography } from "antd";
import Profile from "../user/Profile";
import SignForm from "../user/SignForm";
import Sidebar from "../side-bar/Sidebar";
import Game from "../games/Game";
import FiltersPage from "../Filters/FiltersPage";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;
const { Link } = Typography

function AppRouter({ isAuth, currentUser, loading, setLoading }) {
    const breakpoints = useBreakpoint();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    marginBottom: 10,
                    backgroundColor: "white",
                    padding: breakpoints.xxl ? "0 200px" : 0,
                }}
            >
                <Navbar
                    isAuth={isAuth}
                    currentUser={currentUser}
                    loading={loading}
                    setLoading={setLoading}
                />
            </Header>
            <Content style={{ padding: breakpoints.xxl ? "16px 216px" : 16 }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Sidebar
                                loading={loading}
                                setLoading={setLoading}
                            />
                        }
                    >
                        <Route
                            path=""
                            element={
                                <Home
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/platforms"
                            element={
                                <FiltersPage
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/genres"
                            element={
                                <FiltersPage
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/tags"
                            element={
                                <FiltersPage
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/developers"
                            element={
                                <FiltersPage
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/platforms/:name"
                            element={
                                <Home
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/genres/:name"
                            element={
                                <Home
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/tags/:name"
                            element={
                                <Home
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/developers/:name"
                            element={
                                <Home
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            }
                        />
                        <Route
                            path="/game/:id"
                            element={
                                <Game
                                    loading={loading}
                                    setLoading={setLoading}
                                    currentUser={currentUser}
                                    isAuth={isAuth}
                                />
                            }
                        />
                    </Route>
                    <Route
                        path="/user/:id"
                        element={
                            <Profile
                                currentUser={currentUser}
                                loading={loading}
                                setLoading={setLoading}
                                isAuth={isAuth}
                            />
                        }
                    />
                    <Route
                        path="/sign_in"
                        element={!isAuth ? <SignForm /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/sign_up"
                        element={!isAuth ? <SignForm /> : <Navigate to="/" />}
                    />
                </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>GAMES DATA: <Link href="https://rawg.io/apidocs" target="_blank">RAWG.IO API</Link> </Footer>
        </Layout>
    );
}

export default AppRouter;
