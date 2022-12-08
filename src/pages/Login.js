import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './Login.css';
import { useHistory, useState } from 'react-router-dom';
import { login, getUsers, api } from '../services/Services';

function Login() {
  const [email, setEmail] = useState('');

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

  const state = {
    pw: '',
    userName: ''
  };

  const setUsername = value => {
    localStorage.setItem('username', value);
    state.userName = value;
  };

  const getPassword = value => {
    state.pw = value;
  };

  let history = useHistory();

  const [errorM, setErrorM] = useState('');

  const loginMethod = (id, pw) => {
    console.log('hello');

    login(id, pw).then(res => {
      // If failed
      if (res.status !== 200) {
        console.log('wrong creddentials');
        setErrorM('Wrong credentials');
      } else {
        setErrorM('');
        // console.log({
        //   username: res.data.result.user.username,
        //   email: res.data.result.user.email,
        //   full_name: res.data.result.user.name + res.data.result.user.surname,
        //   token: res.data.result.token
        // });
        localStorage.setItem('user_info', {
          username: res.data.result.user.username,
          email: res.data.result.user.email,
          full_name: res.data.result.user.name + res.data.result.user.surname,
          token: res.data.result.token
        });
        history.push('/home');
      }
    });

    // let token = (await api.post(LOGIN_API_URL, info)).data;
  };

  const handleLoginButton = () => {
    loginMethod(localStorage.getItem('username'), state.pw);
  };

  return (
    <Form
      className='page'
      {...layout}
      name='basic'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className='errorM'>{errorM}</div>
      <Form.Item
        label='username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input
          placeholder='username'
          onChange={event => setUsername(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        className='password'
        label='password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password
          placeholder='password'
          onChange={event => getPassword(event.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          className='SubmitLogin'
          type='primary'
          htmlType='submit'
          onClick={handleLoginButton}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
