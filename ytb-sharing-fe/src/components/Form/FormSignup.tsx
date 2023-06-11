import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Modal, Space } from 'antd';

import { toast } from 'react-toastify';
import { signup } from '../../api';
import { MSG_PASSWORD, RGX_PASSWORD } from '../../constants';
import { Signup } from '../../types';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSignUp: () => void;
};

const FormSignup = ({ isOpen, onClose, onSuccessSignUp }: Props) => {
  const { mutate, isLoading } = useMutation({ mutationFn: signup });
  const onFinish = (values: Signup) =>
    mutate(values, {
      onSuccess: onSuccessSignUp,
    });

  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={<></>}
      onCancel={onClose}
      className="modal-login"
      destroyOnClose={true}
    >
      <h2>Register</h2>
      <Form disabled={isLoading} labelCol={{ span: 5 }} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
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

export default FormSignup;
