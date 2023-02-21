import React from "react";
import { Avatar, Card, Button, message, theme } from "antd";
import {
    UserOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import * as UserDetailsService from "../../../api/services/UserDetailsService";
import * as UserNotificationsService from "../../../api/services/UserNotificationsService";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setUserFriends, addFriend } from "../../../state";
import {
    serializeUserFriendsList,
    serializeFriendsListRemove,
} from "../../../helpers/serializers/UserFriendsSerializer";

const { Meta } = Card;
const { useToken } = theme;

function DataWidget(props) {
    const { token } = useToken();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const currentUserData = useSelector((state) =>
        state.user
            ? state.user
            : { username: null, email: null, picture: null, friends: [] }
    );
    const { username, email, picture, friends } = currentUserData;
    const friendsFromProfile = useSelector((state) => state.friends);
    const isFriend = friends.includes(props.userId);
    const isAuthUserProfile = props.currentUser === props.userId;

    const addRemoveFriend = async () => {
        props.setLoading(true);
        const response = await UserDetailsService.addRemoveFriend(
            props.currentUser,
            props.userId
        );
        props.setLoading(false);
        if (!response.error) {
            dispatch(
                setUserFriends({ friends: serializeUserFriendsList(response) })
            );
            dispatch(
                !isFriend
                    ? addFriend({
                          friend: {
                              _id: props.currentUser,
                              username: username,
                              picture: picture,
                              email: email,
                          },
                      })
                    : setFriends({
                          friends: serializeFriendsListRemove(
                              friendsFromProfile,
                              props.currentUser
                          ),
                      })
            );
            if (!isFriend) {
                const notificationResponse =
                    await UserNotificationsService.create({
                        username: username,
                        toUserId: props.userId,
                    });
                if (!notificationResponse.error) {
                    return true;
                } else {
                    messageApi.open({
                        type: "error",
                        content: "Wystąpił błąd pobierania danych.",
                    });
                }
            }
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd aktualizacji danych.",
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Card
                title="Użytkownik"
                extra={
                    !props.isAuth ? null : isAuthUserProfile ? null : !isFriend ? (
                        <Button
                            onClick={() => addRemoveFriend()}
                            icon={<UserAddOutlined />}
                            disabled={props.loading}
                        >
                            Dodaj do znajomych
                        </Button>
                    ) : (
                        <Button
                            onClick={() => addRemoveFriend()}
                            icon={<UserDeleteOutlined />}
                            danger
                            disabled={props.loading}
                        >
                            Usuń ze znajomych
                        </Button>
                    )
                }
            >
                <Meta
                    avatar={
                        props.avatarUrl ? (
                            <Avatar
                                src={props.avatarUrl}
                                shape="square"
                                size={64}
                            />
                        ) : (
                            <Avatar
                                icon={<UserOutlined />}
                                shape="square"
                                size={64}
                            />
                        )
                    }
                    title={props.username}
                    description={props.email}
                />
            </Card>
        </>
    );
}

export default DataWidget;
