import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Modal, Space } from 'antd';

import { signin } from '../../api';
import { MSG_PASSWORD, RGX_PASSWORD } from '../../constants';
import { Signin } from '../../types';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSignin: (access_token: string, email: string) => void;
};

const FormLogin = ({ isOpen, onClose, onSuccessSignin }: Props) => {
  const { mutate, isLoading } = useMutation({ mutationFn: signin });

  const onFinish = (values: Signin) => {
    mutate(values, {
      onSuccess: (data: any) => {
        onSuccessSignin(data?.access_token, data?.email);
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={<></>}
      onCancel={onClose}
      className="modal-login"
      destroyOnClose={true}
    >
      <h2>Login</h2>
      <Form disabled={isLoading} labelCol={{ span: 5 }} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              pattern: RGX_PASSWORD,
              message: MSG_PASSWORD,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="grp-btn">
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default FormLogin;
