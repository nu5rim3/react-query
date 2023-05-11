import React from 'react'
import { Layout, Space } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '7vh',
    paddingInline: 50,
    lineHeight: '64px',
    // backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '86vh',
    // lineHeight: '120px',
    color: '#fff',
    // backgroundColor: '#108ee9',
    padding: 20
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '7vh',
    backgroundColor: '#7dbcea',
};


const MainLayout = () => {
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header style={headerStyle}>React query with antd</Header>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
                <Footer style={footerStyle}>nu5rim3</Footer>
            </Layout>
        </Space>
    )
}

export default MainLayout;