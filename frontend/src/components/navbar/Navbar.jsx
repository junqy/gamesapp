import React from 'react'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Menu, Typography, Grid  } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const breakpoints = useBreakpoint()
    console.log(breakpoints)
    return (
        <Menu mode='horizontal' style={{justifyContent: 'flex-end', alignItems: 'center'}} selectedKeys={[pathname]}>
                <Menu.Item key='/'>
                    <Title level={4} style={{fontWeight: 700, margin: '18px 0px 19px 0'}}><Link to='/'>GAMEBAG</Link></Title>
                </Menu.Item>
                <Search placeholder="wpisz wyszukiwaną frazę" allowClear style={{ flex: 1 }} />
                {!breakpoints.xs ? 
                <>
                <Menu.Item key='/games' >
                    <Text style={{fontWeight: 600}}><Link to='/games'>Biblioteka Gier</Link></Text>
                </Menu.Item>
                <Menu.SubMenu icon={<UserOutlined style={{ marginLeft: 10 }}/>} style={{ float: 'right' }}>
                    <Menu.Item key='user'>item 3</Menu.Item>
                </Menu.SubMenu>
                </> :
                <Menu.SubMenu icon={<MenuOutlined style={{ marginLeft: 10 }}/>} style={{ float: 'right' }}>
                    <Menu.Item key='/games' >
                        <Text style={{fontWeight: 600}}><Link to='/games'>Biblioteka Gier</Link></Text>
                    </Menu.Item>
                    <Menu.Item key='user'>
                        <Text style={{fontWeight: 600}}>Użytkownik</Text>
                    </Menu.Item>
                </Menu.SubMenu>
                }
        </Menu>
    )
}

export default Navbar


// display: flex;
//   justify-content: space-between;
//   align-items: center;