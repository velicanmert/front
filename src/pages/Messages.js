import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import './Messages.css';
import {
  ChatItem,
  MessageBox,
  MessageList,
  ChatList,
  Button
} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import Grid from '@react-css/grid';
import { io } from 'socket.io-client';
import axios from 'axios';
import { WS_URL } from '../services/Services';

const socket = io(WS_URL, {
  auth: {
    token: `Bearer ${localStorage.getItem('token')}`
  }
});

function Messages() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const user_info = localStorage.getItem('user_info');

  function fetchMessages(currentPage) {
    axios
      .get('http://inchat.webhop.me:3013/message/getmessages', {
        params: {
          friend_id: 4,
          page: currentPage
        },
        headers: {
          Authorization: `Bearer ${user_info.token}`
        }
      })
      .then(res => {
        let data = res.data.result;

        let refinedChat = data.map(item => {
          return {
            position: item.from_userid == 3 ? 'right' : 'left',
            type: 'text',
            title: item.from_userid,
            text: item.message,
            date: new Date(item.date)
          };
        });
        console.log(refinedChat);
        setMessages(refinedChat.concat(messages));
      });
  }

  useEffect(() => {
    fetchMessages(1);

    socket.on('connect', () => {
      console.log(socket.id);
    });
  }, []);

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

  const AddMessage = () => {
    setMessages(
      messages.concat({
        position: 'right',
        type: 'text',
        title: 'Kursat',
        text: message,
        color: '#FFF'
      })
    );

    socket.emit('send-message', 4, message);
    console.log(message.target);
    setMessage('');
  };

  const HandleScroll = scrollTop => {
    if (scrollTop == 0) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
      fetchMessages(currentPage);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <Grid columns='auto auto'>
        <ChatList
          className='chat-list'
          dataSource={[
            {
              avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
              alt: 'kursat_avatar',
              title: 'Kursat',
              subtitle:
                "Why don't we go to the No Way Home movie this weekend ?",
              date: new Date(),
              unread: 3
            }
          ]}
        />
        <Grid rows='500px 50px' style={{ height: 'inherit' }}>
          <MessageList
            className='message-list'
            lockable={false}
            onScroll={event => {
              HandleScroll(event.target.scrollTop);
            }}
            toBottomHeight={'100%'}
            dataSource={messages}
          />
          <Grid columns='auto 80px'>
            <Input
              placeholder='Type here...'
              multiline={true}
              itemRef={'test'}
              onChange={input => {
                setMessage(input.target.value);
              }}
              value={message}
            />
            <Button
              text={'Send'}
              className={'Send-Button'}
              onClick={() => AddMessage()}
              title='Send'
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Messages;
