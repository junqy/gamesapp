import './Navbar.css'
import React, { useState } from 'react'
import { MenuOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import { Input, Menu, Typography, Grid, Dropdown  } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';
import Notifications from '../notifications/Notifications';

const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function Navbar({isAuth}) {
    const location = useLocation()
    const dispatch = useDispatch()
    const { pathname } = location;
    const breakpoints = useBreakpoint()

    const [open, setOpen] = useState(false);

    const handleOpenChange = (flag) => {
      setOpen(flag);
    };
    const items = [
      {
        label: 'Clicking me will not close the menu.',
        key: '1',
      },
      {
        label: 'Clicking me will not close the menu also.',
        key: '2',
      },
      {
        label: 'Clicking me will close the menu.',
        key: '3',
      },
    ];

    return (
        <Menu mode='horizontal' style={{ display: 'flex' }} selectedKeys={[pathname]}>
                {breakpoints.xs ?
                <Menu.Item key='/'>
                    <Link to='/'><Title level={4} style={{fontWeight: 700, margin: '18px 0px 19px 0'}}>GBAG</Title></Link>
                </Menu.Item>
                :
                <Menu.Item key='/'>
                   <Link to='/'><Title level={4} style={{fontWeight: 700, margin: '18px 0px 19px 0'}}>GAMEBAG</Title></Link>
                </Menu.Item>
                }
                <Menu.Item style={{ width: '50%', cursor: 'default' }} key='searchBar'>
                    <Search placeholder="wpisz wyszukiwaną frazę..." allowClear style={{marginTop: 16}}/>
                </Menu.Item>
                {breakpoints.md ? 
                <>
                    <Menu.Item key='/games' style={{ marginLeft: 'auto' }}>
                        <Link style={{fontWeight: 600}} to='/games'>Biblioteka Gier</Link>
                    </Menu.Item>
                    <Menu.SubMenu key='submenuBig' icon={<UserOutlined style={{ marginLeft: 10 }}/>}>
                        {isAuth ? 
                        <>
                            <Menu.Item key='/user'>
                                <Link style={{fontWeight: 600}} to='/user'>Użytkownik</Link>
                            </Menu.Item> 
                            <Menu.Item key='logout' onClick={() => dispatch(setLogout())}>
                                <Link style={{fontWeight: 600}} to='/'>Wyloguj</Link>
                            </Menu.Item>
                        </>
                        :
                        <>
                            <Menu.Item key='/sign_in'>
                                <Link style={{fontWeight: 600}} to='/sign_in'>Logowanie</Link>
                            </Menu.Item>
                            <Menu.Item key='/sign_up'>
                                <Link style={{fontWeight: 600}} to='/sign_up'>Rejestracja</Link>
                            </Menu.Item>
                        </>
                        }
                    </Menu.SubMenu>
                </> :
                <>
                <Menu.SubMenu key='submenuSmall' style={{ marginLeft: 'auto' }} icon={<MenuOutlined/>}>
                    <Menu.Item key='/games' >
                        <Link style={{fontWeight: 600}} to='/games'>Biblioteka Gier</Link>
                    </Menu.Item>
                    <Menu.Item key='/user'>
                        <Link style={{fontWeight: 600}} to='/user'>Użytkownik</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                </>
                }
                { isAuth &&
                <Menu.Item key='notificationMenu'>
                    <Notifications />
                </Menu.Item>
                }
        </Menu>
        
    )
}

export default Navbar