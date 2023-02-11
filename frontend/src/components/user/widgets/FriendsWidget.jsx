import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Avatar, List, message, Card, Button, Space } from "antd";
import VirtualList from "rc-virtual-list";
import { useDispatch, useSelector } from "react-redux";
import * as UserDetailsService from "../../../api/services/UserDetailsService";
import { setFriends, setUserFriends } from "../../../state";

function FriendsWidget({ userId, currentUser, loading, setLoading }) {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends);
    const [messageApi, contextHolder] = message.useMessage();
    const isAuthUserProfile = currentUser === userId;

    const getFriends = async () => {
        setLoading(true);
        const response = await UserDetailsService.getUserFriends(userId);
        setLoading(false);
        if (!response.error) {
            dispatch(setFriends({ friends: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    const addRemoveFriend = async (friendId) => {
        setLoading(true);
        const response = await UserDetailsService.addRemoveFriend(
            userId,
            friendId
        );
        setLoading(false);
        if (!response.error) {
            dispatch(setFriends({ friends: response }));
            dispatch(setUserFriends({ friends: response }));
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd aktualizacji danych.",
            });
        }
    };

    const calculateListHeight = (count) => {
        if (count < 2) {
            return 70;
        } else if (count === 2) {
            return 130;
        } else if (count === 3) {
            return 200;
        } else {
            return 260;
        }
    };

    useEffect(() => {
        getFriends();
    }, [userId]);

    return (
        <>
            {contextHolder}
            <Card title="Lista znajomych">
                {friends.length > 0 ? (
                    <List size="small">
                        <VirtualList
                            data={friends}
                            height={calculateListHeight(friends.length)}
                            itemHeight={47}
                            itemKey="_id"
                        >
                            {(item) => (
                                <List.Item key={item._id}>
                                    <List.Item.Meta
                                        avatar={
                                            item.picture ? (
                                                <Avatar src={item.picture} />
                                            ) : (
                                                <Avatar
                                                    icon={<UserOutlined />}
                                                    shape="square"
                                                />
                                            )
                                        }
                                        title={
                                            <Link to={`/user/${item._id}`}>
                                                {item.username}
                                            </Link>
                                        }
                                        description={item.email}
                                    />
                                    {isAuthUserProfile && (
                                        <Button
                                            disabled={loading}
                                            icon={<MinusCircleOutlined />}
                                            onClick={() =>
                                                addRemoveFriend(item._id)
                                            }
                                        />
                                    )}
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                ) : (
                    <Space
                        size={10}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        Użytkownik nie ma żadnych znajomych.
                    </Space>
                )}
            </Card>
        </>
    );
}

export default FriendsWidget;
