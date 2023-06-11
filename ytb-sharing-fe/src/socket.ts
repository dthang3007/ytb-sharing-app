import io from 'socket.io-client';

let socketIo: any;

export default class Socket {
  getInstance = (email: string) => {
    if (socketIo == null) {
      socketIo = io('http://localhost:9000', {
        secure: true,
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
