import { Modal } from 'antd';
import React, { useState } from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import * as messageActions from '../store/actions/messages';

const AddChatModal = (props) => {
  console.log("modal renedering")
  props.getUserContacts(props.username, props.token);

  return (
    
      <Modal
        centered 
        footer={null}
        open={props.isVisible}
        onCancel={props.close}
      >
        <Form  />
      </Modal>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserContacts: (username, token) => dispatch(messageActions.getUserContacts(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChatModal);