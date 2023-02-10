import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Navbar from '../navbar/Navbar'
import Games from '../games/Games'
import { Layout, Grid } from 'antd';
import AccountManagement from '../user/AccountManagement'
import SignForm from '../user/SignForm'

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function AppRouter({isAuth}) {
    const breakpoints = useBreakpoint()

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header style={{ marginBottom: 10, backgroundColor: 'white', padding: breakpoints.xxl ? '0 200px' : 0}}>
                <Navbar isAuth={isAuth}/>
            </Header>
            <Content style={{ padding: breakpoints.xxl ? '16px 216px' : 16 }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/user' element={isAuth ? <AccountManagement /> : <Navigate to="/sign_in" />} />
                    <Route path='/sign_in' element={!isAuth ? <SignForm /> : <Navigate to="/" />} />
                    <Route path='/sign_up' element={!isAuth ? <SignForm /> : <Navigate to="/" />} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: 'center'}}>
                GAMEBAG ©2022
            </Footer>
        </Layout>
    )
}

export default AppRouter