import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

const getUserChatsSuccess = chats => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats
  };
};

const getUserContactsSuccess = contacts => {
  var list = [];
  contacts.forEach(function (val, index) {
    console.log(val, index);
    list.push(
      {
        value: val,
        label: val,
      }
    )
  });

  return {
    type: actionTypes.GET_CONTACTS_SUCCESS,
    contacts: list
  };
};

export const getUserChats = (username, token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/chat/?username=${username}`)
      .then(res => dispatch(getUserChatsSuccess(res.data)));
  };
};

export const getUserContacts = (username, token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/chat/contact/?username=${username}`)
      .then(res => dispatch(getUserContactsSuccess(res.data)));
  };
};