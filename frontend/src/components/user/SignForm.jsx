import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Space, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import * as UserCredentialsService from '../../api/services/UserCredentialsService'
const { Title } = Typography

function SignForm() {
    const { pathname } = useLocation()

    const onFinish = async (values) => {
        if (pathname === '/sign_in') {
            const userObject = {
                email: values.email,
                password: values.password
            }

            const response = await UserCredentialsService.authenticate(userObject)
            console.log(response)
        }
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        pathname === '/sign_in' ?
        <Row type="flex" justify="center" align="middle" style={{minHeight: '60vh'}}>
            <Col xs={22} md={14} lg={8} xl={6}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Space style={{width: '100%', justifyContent: 'center'}}>
                            <UserOutlined style={{ fontSize: 24, marginBottom: 10 }}/>
                            <Title level={3} align="center">Logowanie</Title>
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Wprowadź swój email!',
                            },
                            {
                                type: 'email',
                                message: 'Wprowadź poprawny email!',
                            },
                        ]}
                    >
                        <Input prefix={"@"} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Wprowadź swoje hasło',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Hasło"
                        />
                    </Form.Item>
            
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}>
                            Zaloguj się
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Space style={{width: '100%', justifyContent: 'center'}} >
                            lub <Link to='/sign_up'>Zarejestruj się</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        :
        <Row type="flex" justify="center" align="middle" style={{minHeight: '60vh'}}>
            <Col xs={22} md={14} lg={8} xl={6}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Space style={{width: '100%', justifyContent: 'center'}}>
                            <UserOutlined style={{ fontSize: 24, marginBottom: 10 }}/>
                            <Title level={3} align="center">Rejestracja</Title>
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Wprowadź nazwę użytkownika!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nazwa użytkownika" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Wprowadź swój email!',
                            },
                            {
                                type: 'email',
                                message: 'Wprowadź poprawny email!',
                            },
                        ]}
                    >
                        <Input prefix={"@"} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Wprowadź swoje hasło!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Hasło"
                        />
                    </Form.Item>
                    <Form.Item
                        name="passwordConfirm"
                        rules={[
                            {
                            required: true,
                            message: 'Wprowadź ponownie swoje hasło!',
                            },
                            ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Podane hasła nie są zgodne!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Powtórz hasło"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button" style={{width: "100%"}}>
                            Zarejestruj się
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Space style={{width: '100%', justifyContent: 'center'}} >
                            lub <Link to='/sign_in'>Zaloguj się</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default SignForm