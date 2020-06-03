import React from 'react';
import EditRounded from '@material-ui/icons/EditRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from 'react-router-dom';
import {
    Layout,
    Menu,
} from 'antd';
import Forms from './../Forms/Forms';
const {
    Content, Footer, Sider,
  } = Layout;
class Home extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0">
                            <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Link to="/">
                                <HomeRounded />
                                    <span className="nav-text">Home</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/form">
                                <EditRounded />
                                    <span className="nav-text">Forms</span>
                                </Link>
                            </Menu.Item>
                            </Menu>
                    </Sider>
                    <Layout style={{minHeight: '100vh' }}>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                            <Switch>
                                <Route exact path="/">
                                    <h1 style={{ textAlign: 'center' }} >This is a simple project</h1>
                                </Route>
                                <Route path="/form" component={Forms}/>
                            </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>M.Mahdi Ahangaran & Armin Mazloomi ©2020</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
export default Home;