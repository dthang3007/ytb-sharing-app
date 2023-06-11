import { useEffect } from 'react';
import Socket from '../socket';
import { useAuthStore } from '../store/useAuthStore';

export enum EVENT_SOCKET {
  BUY_SUCCED_GCASH = 'buy',
}

export const useSocket = ({
  event,
  handleEvent,
}: {
  event: string | string[];
  handleEvent: any;
  dependences?: any;
  nonAuthen?: boolean;
}) => {
  const { auth } = useAuthStore.getState();
  const email = auth.email;
  useEffect(() => {
    if (email) {
      const socketIo = new Socket();
      const socketInstance = socketIo.getInstance(email);
      if (email) {
        if (typeof event === 'string') {
          socketInstance.on(event, handleEvent);
        }
      }
      return () => {
        if (email) {
          if (typeof event === 'string') {
            socketInstance.off(event, handleEvent);
          }
        }
      };
    }
  }, [email]);
};
