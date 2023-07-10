import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as actions from './store/actions/auth';
import BaseRouter from './routes';
import Sidepanel from './containers/Sidepanel';
import Profile from './containers/Profile';
import Chat from './containers/Chat';
import Hoc from './hoc/hoc';

class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return(
            <BrowserRouter>
                <div id="frame">
                    <Sidepanel />
                    <div className="content">
                        <Profile />
                        <Routes>
                            <Route path="/:chatID" exact element={<Chat />} />
                        </Routes>                      
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(null, mapDispatchToProps)(App);