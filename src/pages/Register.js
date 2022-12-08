import React from 'react';
import { register } from '../services/Services';
import { Form, Input, Button } from 'antd';
import './Register.css';
import { useHistory } from 'react-router-dom';

function Register() {
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
    name: '',
    surname: '',
    username: '',
    email: ''
  };

  const getName = value => {
    state.name = value;
  };

  const getSurname = value => {
    state.surname = value;
  };

  const getUsername = value => {
    state.username = value;
  };

  const getEmail = value => {
    state.email = value;
  };

  const getPassword = value => {
    state.pw = value;
  };

  const [errorMes, setErrorMes] = useState('');

  const registerMethod = (name, surname, username, email, password) => {
    register(name, surname, username, email, password).then(res => {
      // If failed
      if (res.status !== 200) {
        console.log('User already exists with given email or username.');
        setErrorMes('User already exists with given email or username.');
      } else {
        setErrorMes('');
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
  };

  let history = useHistory();

  const handleRegisterButton = () => {
    registerMethod(
      state.name,
      state.surname,
      state.username,
      state.email,
      state.password
    );
    history.push('/');
  };

  return (
    <Form
      className='page'
      {...layout}
      name='basic'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className='errorMes'>{errorMes}</div>
      <Form.Item
        label='name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input your name!'
          }
        ]}
      >
        <Input
          placeholder='name'
          onChange={event => getName(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label='surname'
        name='surname'
        rules={[
          {
            required: true,
            message: 'Please input your surname!'
          }
        ]}
      >
        <Input
          placeholder='surname'
          onChange={event => getSurname(event.target.value)}
        />
      </Form.Item>

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
          onChange={event => getUsername(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label='email'
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your email!'
          }
        ]}
      >
        <Input
          placeholder='email'
          onChange={event => getEmail(event.target.value)}
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
          className='SubmitRegister'
          type='primary'
          htmlType='submit'
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
