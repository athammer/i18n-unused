/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

import { resolveFile } from '../helpers/files';

import { RunOptions, RecursiveStruct } from '../types';

const defaultValues: RunOptions = {
  srcPath: '',
  excludeKey: '',
  marker: '[UNUSED]',
  srcExtensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
  translationKeyMatcher: /(?:[$ .](_|t|tc))\(.*?\)/gi,
  localeFileParser: (m: RecursiveStruct): RecursiveStruct =>
    (m.default || m) as RecursiveStruct,
};

export const initialize = async (
  inlineOptions: RunOptions,
): Promise<RunOptions> => {
  let config: RunOptions = { ...inlineOptions };

  try {
    const configFile = await resolveFile(
      `${process.cwd()}/i18n-unused.config.js`,
    );

    config = { ...configFile, ...inlineOptions };
  } catch (e) {}

  if (!config.localesPath) {
    throw new Error('Locales path is required');
  }

  if (!config.localesExtensions && !config.localeNameResolver) {
    config.localesExtensions = ['json'];
  }

  return { ...defaultValues, ...config };
};
