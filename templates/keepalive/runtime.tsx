// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
{{#hasRuntime}}
import { getKeepAlive } from 'src/runtime';
{{/hasRuntime}}
import { KeepAliveContext } from './context';

export const KeepAliveLayout = (props) => {
  const keepElements = React.useRef<any>({});
  const [cacheKeyMap, setCacheKeyMap] = React.useState({});
  const [keepalive, setKeepalive] = React.useState(['']);

  const init = async () => {
    try {

{{^hasRuntime}}
    const getKeepAlive = (config) => config;
{{/hasRuntime}}
      
      const rtconfig = await getKeepAlive(keepalive);
      setKeepalive(rtconfig);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  function dropByCacheKey(path: string) {
    if (keepElements.current[path.toLowerCase()]) {
      delete keepElements.current[path.toLowerCase()];
      setCacheKeyMap((cacheKeyMap) => ({
        ...cacheKeyMap,
        [path.toLowerCase()]: Math.random(),
      }));
    }
  }
  return (
    <KeepAliveContext.Provider
      value={ {
        keepalive,
        setKeepalive,
        keepElements,
        cacheKeyMap,
        dropByCacheKey,
      }}
      {...props}
    />
  );
};
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
