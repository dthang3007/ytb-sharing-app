import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Space } from 'antd';

import { useNavigate } from 'react-router-dom';
import { createVideo } from '../../api';
import { MSG_LINK_VIDEO, RGX_LINK_VIDEO_YTB } from '../../constants';
import { CreateVideoParams } from '../../types';
type Props = {};

const FormShareVideo = () => {
  const { mutate, isLoading } = useMutation({ mutationFn: createVideo });
  const navigate = useNavigate();
  const onFinish = (values: CreateVideoParams) =>
    mutate(values, {
      onSuccess: (data: any) => {
        navigate('/');
      },
    });

  return (
    <div className="share">
      <h2>Share</h2>
      <Form disabled={isLoading} labelCol={{ span: 5 }} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Link"
          name="link"
          rules={[
            {
              required: true,
              message: 'Please input your link!',
            },
            {
              pattern: RGX_LINK_VIDEO_YTB,
              message: MSG_LINK_VIDEO,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input />
        </Form.Item>
        <div className="grp-btn">
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default FormShareVideo;
