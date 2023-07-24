import { Button, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { withRouter } from '../hoc/withRouter';
import * as navActions from '../store/actions/nav';
import * as messageActions from '../store/actions/messages';
import { connect } from 'react-redux';


function AddChatForm(props) {
  const [contact, setContact] = useState('');
  // var options = [];

  // const getContacts = () => {
  //   axios.defaults.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Token ${props.token}`
  //   };
  //   axios
  //     .get(`http://127.0.0.1:8000/chat/contact/?username=${props.username}`)
  //     .then(res => {
  //       var list = [];
  //       res.data.forEach(function (val, index) {
  //         console.log(val, index);
  //         list.push(
  //           {
  //             value: val,
  //             label: val,
  //           }
  //         )
  //       });
  //       options = list;
  //       return list;
  //     });
  // }
  
  // useEffect(() => {
  //   getContacts();
  // });

  const onFinish = (values) => {
    const participants = [contact, props.username]
    console.log(participants);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    axios
      .post("http://127.0.0.1:8000/chat/create/", {
        messages: [],
        participants: participants
      })
      .then(res => {
        props.closeAddChatPopup();
        props.getUserChats(props.username, props.token);
      })
      .catch(err => {
        console.error(err);
      });
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const onChange = (value) => {
      console.log(`selected ${value}`);
      setContact(value);
    };
    const onSearch = (value) => {
      console.log('search:', value);
    };

  return (
    <Form
    layout="inline"
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      rules={[
        {
          required: true,
          message: 'Please input username!',
        },
      ]}
    >
      <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            style={{ width: "100%" }}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={props.contacts}
        />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 4,
        span: 14,
      }}
    >
      <Button type="primary" htmlType="submit">
        Start a chat
      </Button>
    </Form.Item>

  </Form>
  )
  }; 

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    contacts: state.message.contacts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChatForm);