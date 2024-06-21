import { address, getDevBanner as getUmiDevBanner } from '@umijs/utils';
import { renderUnicodeCompact } from 'uqr';

export const getDevBanner = (protocol: string, host: string, port: number) => {
  const ip = address.ip();
  const network = `${protocol}//${ip}:${port}`;
  const banner = getUmiDevBanner(protocol, host, port);

  const ansi = renderUnicodeCompact(network);
  const space = ' '.repeat(14);
  const QR = ansi
    .split('\n')
    .map((line) => space + line)
    .join('\n');
  return { ...banner, QR };
};
