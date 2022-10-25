import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import AppHeader from '../components/Header';
import CaseList from '../components/CaseList';


// Import icons from Ant Design
import {
    HomeOutlined,
    ProfileOutlined,
  } from '@ant-design/icons';
  
  import { Layout, Menu } from 'antd';
  const { Header, Content, Footer, Sider } = Layout;


const Home = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { currentPage } = useParams();

    return (
        <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
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
                minHeight: 360,
              }}
            >
                add content bcased on the paras? 
                /myprofile
                /cases
                /cases:id
                /cases:id/edit

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
