import { Avatar, Button, Popover, Space } from 'antd';
import FormLogin from './Form/FormLogin';
import { useState } from 'react';
import FormSignup from './Form/FormSignup';
import { useAuthStore } from '../store/useAuthStore';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const Header = () => {
  const { setAuth, auth } = useAuthStore();
  const naviage = useNavigate();

  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [isOpenModalSignup, setIsOpenModalSiginup] = useState(false);

  const onSuccessSignin = (access_token: string, email: string) => {
    setAuth({ accessToken: access_token, email });
    setIsOpenModalLogin(false);
  };
  const onSuccessSignup = () => {
    setIsOpenModalSiginup(false);
    setIsOpenModalLogin(true);
  };

  const backHome = () => naviage('/');
  const toShare = () => naviage('/share');

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={toShare}>Share</Button>
      <Button onClick={() => setAuth(null)}>Logout</Button>
    </div>
  );

  return (
    <header className="header-app">
      <div className="logo">
        <h1 style={{ cursor: 'pointer' }} onClick={backHome}>
          Funny Movies
        </h1>
      </div>
      <div className="action">
        <div className="group-btn">
          {auth ? (
            <Space>
              <Notification />
              <Popover content={content} title={auth.email}>
                <Avatar size={40} icon={<UserOutlined />} />
              </Popover>
            </Space>
          ) : (
            <Space>
              <Button onClick={() => setIsOpenModalLogin(true)}>Login</Button>
              <Button onClick={() => setIsOpenModalSiginup(true)}>Register</Button>
            </Space>
          )}
        </div>
      </div>
      <FormSignup
        isOpen={isOpenModalSignup}
        onClose={() => setIsOpenModalSiginup(false)}
        onSuccessSignUp={onSuccessSignup}
      />
      <FormLogin
        isOpen={isOpenModalLogin}
        onClose={() => setIsOpenModalLogin(false)}
        onSuccessSignin={onSuccessSignin}
      />
    </header>
  );
};

export default Header;
