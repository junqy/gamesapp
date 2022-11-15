import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Navbar from '../navbar/Navbar'
import Games from '../games/Games'
import { Layout, Grid } from 'antd';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function AppRouter() {
    const breakpoints = useBreakpoint()

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header style={{ marginBottom: 10, backgroundColor: 'white', padding: breakpoints.xxl ? '0 200px' : 0}}>
                <Navbar />
            </Header>
            <Content style={{ padding: breakpoints.xxl ? '0 220px' : 20 }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/games' element={<Games />} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: 'center'}}>
                GAMEBAG ©2022
            </Footer>
        </Layout>
    )
}

export default AppRouter