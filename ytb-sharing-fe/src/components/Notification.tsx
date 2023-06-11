import { BellOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Badge, Divider, Popover } from 'antd';
import { getNoti, markReaded } from '../api';
import { useSocket } from '../hooks/useSocket';
import { INotifi } from '../types';
import { useState } from 'react';

const Notification = () => {
  const { data, refetch } = useQuery<INotifi[]>(['noti'], { queryFn: getNoti });
  const { mutate } = useMutation({ mutationFn: markReaded, onSuccess: () => refetch() });

  useSocket({
    event: 'noti',
    handleEvent: (e: any) => {
      console.log(e);
      refetch();
    },
  });

  const markRead = (id: string) => mutate(id);

  const content = (
    <div className="content">
      {data?.map((item) => (
        <div key={item?._id} className="box" onClick={() => markRead(item?._id)}>
          <p className={!item.isReaded ? 'unread' : undefined}>
            <b>Sender</b>: {item.nameSender}
          </p>
          <p className="title">
            <b>Title</b>: {item.title}
          </p>
          <Divider />
        </div>
      ))}
    </div>
  );

  const unreadCount = () => data?.filter((item) => !item.isReaded);

  return (
    <div className="notification-app">
      <Popover placement="bottomLeft" style={{ maxWidth: 100 }} content={content} overlayClassName="noti-popover">
        <Badge size="default" count={unreadCount()?.length || 0}>
          <BellOutlined style={{ fontSize: 22 }} />
        </Badge>
      </Popover>
    </div>
  );
};

export default Notification;
