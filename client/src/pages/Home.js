import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Auth from "../utils/auth";

// Import Pages and components
import Dashboard from '../components/Dashboard';
import AppHeader from '../components/Header';
import CaseList from '../components/CaseList';

// Import icons from Ant Design
import {
    HomeOutlined,
    ProfileOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import CaseItem from '../components/CaseItem';
const { Header, Content, Footer, Sider } = Layout;


const Home = () => {

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate("/login")
        }
    }
    )


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo"><h1>LOGO</h1></div>
                <Menu theme="dark" defaultSelectedKeys={[]} mode="inline"
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    items={[
                        { label: "Home", key: "/", icon: <HomeOutlined /> },
                        { label: "Cases", key: "/cases", icon: <ProfileOutlined /> },
                    ]}>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    <AppHeader />
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 500,
                        }}
                    >

                        {/* <Routes>
                            <Route path="/" element={<Dashboard />}></Route>
                            <Route path="/cases" element={<CaseList />}></Route>
                            <Route path="/cases/:id" element={<CaseItem />}></Route>
                        </Routes> */}

                        {<CaseList />}

                    </div>
                </Content>


                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Made with Love ©2022
                </Footer>

            </Layout>
        </Layout>
    );
}

export default Home;
