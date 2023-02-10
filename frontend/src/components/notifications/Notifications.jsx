import React, { useEffect, useState }  from 'react'
import { BellOutlined } from '@ant-design/icons'
import { Dropdown, message, Badge, Button, Divider, Space, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as UserNotificationsService from '../../api/services/UserNotificationsService'
import { setNotifications, setNotificationsEmpty } from '../../state';

const { useToken } = theme;

function Notifications() {
    const { token } = useToken();
    const menuStyle = {
        boxShadow: 'none',
    };
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        marginTop: 28
    };

    const dispatch = useDispatch()
    const notifications = useSelector((state) => state.user.notifications)
    const userId = useSelector((state) => state.user._id)
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleOpenChange = (flag) => {
      setOpen(flag);
    };

    const handleDeleteNotification = async (e) => {
        const response = await UserNotificationsService.remove(e.key)
        if (!response.error) {
            const notificationsFiltered = notifications.filter((item) => item.key !== e.key)
            dispatch(setNotifications({ notifications: notificationsFiltered }))
        } else {
            messageApi.open({
                type: 'error',
                content: 'Wystąpił błąd, spróbuj ponownie.'
            })
        }
    }

    const getNotifications = async () => {
        const response = await UserNotificationsService.getEntities(userId)
        const notificationList = []
        if (!response.error){
            for (const item of response) {
                const element = { label: `Użytkownik ${item.username} dodał cię do znajomych.`, key: item._id, danger: true }
                notificationList.push(element)
            }
            dispatch(setNotifications({ notifications: notificationList }))
        } else {
            messageApi.open({
                type: 'error',
                content: 'Wystąpił błąd, spróbuj ponownie.'
            })
        }
        
    }

    const handleDeleteAll = async () => {
        const response = await UserNotificationsService.removeAll()
        if (!response.error) {
            dispatch(setNotificationsEmpty())
        } else {
            messageApi.open({
                type: 'error',
                content: 'Wystąpił błąd, spróbuj ponownie.'
            })
        }
    }

    useEffect(() => {
        getNotifications()
        console.log(notifications)
    }, [])

    return (
        <Dropdown
            style={{ display: 'flex' }}
            menu={{
                items: notifications,
                onClick: handleDeleteNotification,
            }}
            onOpenChange={handleOpenChange}
            open={open}
            dropdownRender={(menu) => (
                notifications?.length > 0 ?
                    <div style={contentStyle}>
                    {React.cloneElement(menu, {
                    style: menuStyle,
                    })}
                        <Button 
                            block 
                            type="primary" 
                            danger
                            onClick={() => handleDeleteAll()}
                        >
                            Usuń wszystko
                        </Button>
                    </div> : <></>
            )}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Badge count={notifications?.length > 0 ? notifications.length : 0}>
                        <BellOutlined />
                    </Badge>
                </a>
        </Dropdown>
    )
}

export default Notifications