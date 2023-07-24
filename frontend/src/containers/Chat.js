import React, { useState, useRef, useEffect, useCallback } from "react";
import WebSocketInstance from "../websocket";
import Hoc from "../hoc/hoc";
import { connect } from 'react-redux';
import { useParams } from "react-router";
import Profile from "./Profile";

function Chat(props) {

    const [message, setMessage] = useState('');
    const messageEl = useRef(null);

    useEffect(() => {
        console.log('empty USEEFECT');
        messageEl?.current?.scrollIntoView({ behavior: 'smooth' });
    });

    let { chatID } = useParams();
	const initialiseChat = () => {
        waitForSocketConnection(() => {
        //   WebSocketInstance.addCallbacks(populateMessages, addMessage)
          WebSocketInstance.fetchMessages(
            props.username, 
            chatID
          );
        });

		WebSocketInstance.connect(chatID);
	}

    useEffect(() => {
        console.log("username/chatid USEEFECT");
        initialiseChat();

        return(() => {
            WebSocketInstance.disconnect();
        });
    }, [props.username, chatID])

    const waitForSocketConnection = (callback) => {
        setTimeout(
            function() {
                if (WebSocketInstance.state() === 1) {
                    console.log('connection is made.');
                    callback();
                    return;
                }
                else {
                    console.log('wait for connection..');
                    waitForSocketConnection(callback);
                }
        }, 100);
    }

    // const addMessage = (m) => {
    //     console.log(messages, "messages in addmessage")

    //     setMessages(prevMessages => [...prevMessages, m]);
    // }

    // const populateMessages = (ml) => {
    //     console.log(messages, "messages in populate")

    //     setMessages(ml.reverse())
    // }

    const sendMessageHandler = event => {
        event.preventDefault();
        const m = {
            from: props.username,
            content: message,
            chatId: chatID
        }
        WebSocketInstance.newChatMessage(m);
        setMessage('');
    }

    const messageChangeHandler = event => {
        setMessage(event.target.value);
    }

    const renderTimestamp = timestamp => {
        let prefix = ''; 
        const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000);
        if (timeDiff < 1) { // less than one minute ago
            prefix = 'just now...';
        } else if (timeDiff < 60 && timeDiff > 1) { // less than sixty minutes ago
            prefix = `${timeDiff} minutes ago`;
        } else if (timeDiff < 24*60 && timeDiff > 60) { // less than 24 hours ago
            prefix = `${Math.round(timeDiff/60)} hours ago`;
        } else { // less than 7 days ago
            prefix = `${Math.round(timeDiff/(60*24))} days ago`;
        }
        return prefix
    }

    const renderMessages = (list) => {
        console.log('chatjs mein aaya');
        const currentUser = props.username;
        return list.map((m, i, arr) => (
            <li 
                key={m.id} 
                style={{marginBottom: arr.length - 1 === i ? '300px' : '15px'}}
                className={m.author === currentUser ? 'sent' : 'replies'}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" />
                <p>
                    {m.content}
                    <br />
                    <small>
                        {renderTimestamp(m.timestamp)}
                    </small>
                </p>
            </li>
        ))
    }
    
    return (
        props.username && 
        <Hoc>
            <Profile chatId={chatID} />
            <div className="messages" ref={messageEl}>
                <ul id="chat-log">
                    {
                        props.messages &&
                        renderMessages(props.messages)
                    }
                </ul>
            </div>
            <div className="message-input">
                <form onSubmit={sendMessageHandler}>
                    <div className="wrap">
                        <input 
                            onChange={messageChangeHandler}
                            value={message}
                            id="chat-message-input" 
                            type="text" 
                            placeholder="Write your message..." 
                        />
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button id="chat-message-submit" className="submit">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div> 
                </form>
            </div>
        </Hoc>
    );
};

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        messages: state.message.messages,
    }
}

export default connect(mapStateToProps)(Chat);