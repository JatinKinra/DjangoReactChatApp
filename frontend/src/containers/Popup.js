import { Modal } from 'antd';
import React, { useState } from 'react';
import Form from './Form';

const AddChatModal = (props) => {
  console.log("modal renedering")

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
export default AddChatModal;