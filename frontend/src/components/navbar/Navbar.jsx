import './Navbar.css'
import React from 'react'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Menu, Typography, Grid  } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const breakpoints = useBreakpoint()
    console.log(pathname)
    return (
        <Menu mode='horizontal' style={{justifyContent: 'flex-end', alignItems: 'center'}} selectedKeys={[pathname]}>
                <Menu.Item key='/'>
                   <Link to='/'><Title level={4} style={{fontWeight: 700, margin: '18px 0px 19px 0'}}>GAMEBAG</Title></Link>
                </Menu.Item>
                <Menu.Item style={{ flex: 1 }} key='searchBar' >
                    <Search placeholder="wpisz wyszukiwaną frazę" allowClear style={{marginTop: 15}}/>
                </Menu.Item>
                
                {!breakpoints.xs ? 
                <>
                <Menu.Item key='/games' >
                    <Link style={{fontWeight: 600}} to='/games'>Biblioteka Gier</Link>
                </Menu.Item>
                <Menu.SubMenu key='submenuBig' icon={<UserOutlined style={{ marginLeft: 10 }}/>} style={{ float: 'right' }}>
                    <Menu.Item key='/user'>
                        <Link style={{fontWeight: 600}} to='/user'>Użytkownik</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                </> :
                <Menu.SubMenu key='submenuSmall' icon={<MenuOutlined style={{ marginLeft: 10 }}/>} style={{ float: 'right' }}>
                    <Menu.Item key='/games' >
                        <Link style={{fontWeight: 600}} to='/games'>Biblioteka Gier</Link>
                    </Menu.Item>
                    <Menu.Item key='/user'>
                        <Link style={{fontWeight: 600}} to='/user'>Użytkownik</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                }
        </Menu>
    )
}

export default Navbar