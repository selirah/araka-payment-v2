import { message } from 'antd';

export const toast = (type: string, info: string) => {
  switch (type) {
    case 'info':
      message.info(info);
      break;
    case 'success':
      message.success(info);
      break;
    case 'error':
      message.error(info);
  }
};
