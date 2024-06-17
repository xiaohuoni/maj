import { JsHooks } from '@umijs/mako/binding';

interface CJsHooks extends Omit<JsHooks, 'load'> {
  load?: (
    filePath: string,
    config: any,
  ) => Promise<{ content: string; type: 'css' | 'js' } | void> | void;
}

// 为了给 mako 的插件，塞入一些公用数据
export const registerMakoPlugin = ({
  config,
  plugin,
}: {
  plugin: CJsHooks;
  config: any;
}) => {
  return { ...plugin, load: (path: string) => plugin.load?.(path, config) };
};
