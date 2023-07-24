import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/hoc';

class Profile extends React.Component { 
    render() {
        const chatID = Number(this.props.chatId);
        const chat = this.props.chats.filter(function(val) {
            return val.id === chatID;
        });

        return (
            chat.length > 0
            ?
            <div className="contact-profile">
            {
                <Hoc>
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>{chat[0].participants[1]}</p>
                    <div className="social-media">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
            </Hoc>
            }
            </div>
            :
            null
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        chats: state.message.chats
    }
}

export default connect(mapStateToProps)(Profile);