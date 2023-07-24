import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidepanel from './containers/Sidepanel';
import Profile from './containers/Profile';
import Chat from './containers/Chat';
import AddChatModal from './containers/Popup'; 
import * as authActions from './store/actions/auth';
import * as navActions from './store/actions/nav';
import * as messageActions from './store/actions/messages';
import WebSocketInstance from './websocket';
import { message } from 'antd';

class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    constructor(props) {
        super(props);
        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
            )
    }

    render() {
        return(
            <BrowserRouter>
                <div id="frame">
                    <Sidepanel />
                    <div className="content">
                        <AddChatModal 
                            isVisible = {this.props.showAddChatPopup}
                            close = {() => this.props.closeAddChatPopup()}
                        />
                        <Routes>
                            <Route path="/:chatID" exact element={<Chat />} />
                        </Routes>                      
                    </div>
                </div>
            </BrowserRouter>
        );
    };
}

const mapStateToProps = state => {
    return {
        showAddChatPopup: state.nav.showAddChatPopup,
        authenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authActions.authCheckState()),
        closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
        addMessage: message => dispatch(messageActions.addMessage(message)),
        setMessages: messages => dispatch(messageActions.setMessages(messages)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);