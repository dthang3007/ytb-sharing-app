import io from 'socket.io-client';
import { BASE_URL } from './api';

let socketIo: any;

export default class Socket {
  getInstance = (email: string) => {
    if (socketIo == null) {
      socketIo = io(BASE_URL, {
        secure: true,
        path: '/notification',
        reconnection: true,
        rejectUnauthorized: false,
        transports: ['websocket'],
        query: {
          email,
        },
      });

      socketIo.on('connect', () => {
        console.log('connect=', 'connect');
      });
      socketIo.on('disconnect', () => {
        console.log('------------disconnect-socket------------');
      });
    }
    return socketIo;
  };

  removeInstance = () => {
    socketIo = null;
  };
}
