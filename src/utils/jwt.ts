import { Buffer } from 'buffer';

interface JwtPayload {
    exp: number;
    [key: string]: any;
  }

  export const isTokenExpired = (token: string): boolean => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(Buffer.from(base64, 'base64').toString()) as JwtPayload;
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch (e) {
      console.log('Invalid token', e);
      return true;
    }
  };
  