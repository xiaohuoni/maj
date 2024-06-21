// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { keepaliveEmitter } from './context';

export function dropByCacheKey(path: string) {
  keepaliveEmitter.emit({
    type: 'dropByCacheKey',
    payload: {
      path,
    },
  });
}
export function closeTab(path: string) {
  keepaliveEmitter.emit({
    type: 'closeTab',
    payload: {
      path,
    },
  });
}
export function closeAllTabs() {
  keepaliveEmitter.emit({ type: 'closeAllTabs' });
}
