import { NetworkInfo } from 'react-native-network-info';

export const getLocalIp = async (): Promise<string> => {
  const ip = await NetworkInfo.getIPV4Address();
  return `http://${ip}:3001`;
};