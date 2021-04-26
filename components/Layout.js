import Navbar from "./shared/Navbar"

import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

export default ({ children }) => {
    return (
        <>

            <Layout style={{ height: "100vh" }}>
                <Navbar />
                <Layout>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>

        </>
    )
}

