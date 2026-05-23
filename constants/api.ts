import { Platform } from 'react-native';

// Configuração da API
// IMPORTANTE: Atualize o IP abaixo conforme o IP da sua máquina
// Para descobrir o IP: execute 'ipconfig' no Windows ou 'ifconfig' no Linux/Mac
const SERVER_IP = '192.168.101.12'; // ← ATUALIZE ESTE IP SE MUDAR

export const API_CONFIG = {
  BASE_URL:
    Platform.OS === 'web'
      ? 'http://localhost:5001/api'
      : `http://${SERVER_IP}:5001/api`,

  // URLs específicas para facilitar manutenção
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  POSTS: '/posts',
};;
