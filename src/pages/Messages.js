import React from 'react';
import { Form, Input, Button } from 'antd';
import './Messages.css';

function Messages() {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const loginMethod = (id, pw) => {};

  const handleSendButton = () => {
    loginMethod('', '');
    localStorage.setItem('loginClicked', 'clicked');
  };

  return (
    <Form
      className='textPage'
      {...layout}
      name='basic'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label='' name=''></Form.Item>

      <Form.Item className='textBox' label='' name='textBox'>
        <Input
          placeholder='text'
          /*onChange={event => getPassword(event.target.value)}*/
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          className='SubmitSend'
          type='primary'
          htmlType='submit'
          onClick={handleSendButton}
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Messages;
