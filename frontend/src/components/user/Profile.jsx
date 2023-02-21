import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Row, Col, Space } from "antd";
import * as UserDetailsService from "../../api/services/UserDetailsService";
import DataWidget from "./widgets/DataWidget";
import FriendsWidget from "./widgets/FriendsWidget";
import GamesWidget from "./widgets/GamesWidget";
import Spinner from "../loading/Spinner";

function Profile({ currentUser, loading, setLoading, isAuth }) {
    const [user, setUser] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();

    const getUser = async () => {
        const response = await UserDetailsService.getUserEntity(id);
        if (!response.error) {
            setUser(response);
        } else {
            messageApi.open({
                type: "error",
                content: "Wystąpił błąd pobierania danych.",
            });
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    if (!user)
        return (
            <Space style={{ width: "100%", justifyContent: "center" }}>
                <Spinner />
            </Space>
        );

    return (
        <>
            {contextHolder}
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <DataWidget
                        isAuth={isAuth}
                        username={user.username}
                        email={user.email}
                        avatarUrl={user.picture}
                        userId={id}
                        currentUser={currentUser}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <FriendsWidget
                        userId={id}
                        currentUser={currentUser}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Col>
                <Col xs={24}>
                    <GamesWidget
                        userId={id}
                        currentUser={currentUser}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Profile;
