// import { winPath } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Module } from '../Module';
import { ModelUtils, getAllModels } from './modelUtils';

export default class Model extends Module {
  constructor(opts: any) {
    super(opts);
    this.name = 'model';
  }
  async generateFiles() {
    // model
    const models = await getAllModels(this.paths);

    // model.ts
    this.writeTmpFile({
      path: 'model.ts',
      content: ModelUtils.getModelsContent(models),
    });

    // index.tsx
    const indexContent = readFileSync(
      join(__dirname, '../../../templates/model.tsx'),
      'utf-8',
    );
    // .replace('fast-deep-equal', winPath(require.resolve('fast-deep-equal')));

    this.writeTmpFile({ path: 'index.tsx', content: indexContent });

    // runtime.tsx
    this.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React  from 'react';
import { Provider } from './';
import { models as rawModels } from './model';

export function ProviderWrapper(props: any) {
  const models = React.useMemo(() => {
    return Object.keys(rawModels).reduce((memo, key) => {
      memo[rawModels[key].namespace] = rawModels[key].model;
      return memo;
    }, {});
  }, []);
  return <Provider models={models} {...props}>{ props.children }</Provider>
}

export function dataflowProvider(container, opts) {
  return <ProviderWrapper {...opts}>{ container }</ProviderWrapper>;
}
      `,
    });
  }
}
