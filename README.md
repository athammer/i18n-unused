# i18n-unused

![npm](https://img.shields.io/npm/v/i18n-unused?color=red&label=version)
![npm](https://img.shields.io/npm/dt/i18n-unused?color=green)

The tool for finding, analyzing and removing unused and missed i18n translations in your JavaScript project

## Installation

With npm:
```bash
npm install --save-dev i18n-unused
```

With yarn:
```bash
yarn add --dev i18n-unused
```

## Configuration

Add config `i18n-unused.config.js` to your root folder:

```javascript
module.exports = {
  localesPath: 'src/locales',
  srcPath: 'src',
};
```
### Configuration options

| Option name | <div style="width: 280px">Description</div> | Required | Type | <div style="min-width: 100px">Default value</div> |
| --- | --- | --- | --- | --- |
| localesPath           | path for searching locales files | yes | string | -
| srcPath               | path for searching files with translations using | no | string | `''` (same as run folder)
| srcExtensions         | allowed to read files extensions | no | string[] | ['js', 'ts', 'jsx', 'tsx', 'vue']
| localesExtensions     | allowed to read files extensions of locales | no | string[] | if not set `localeNameResolver`: ['json']
| localeNameResolver    | resolver for locale file name | no | RegExp, (name: string) => boolean | -
| localeFileParser  | resolve locale imports, for example if you use named imports from locales files, just wrap it to your own resolver | no | (module) => module | fn, return `module.default` or `module`
| translationKeyMatcher | matcher for searching translation keys in files | no | RegExp | RegExp, match `$_`, `$t`, `t`, `$tc` and `tc`
| excludeKey            | option to excluding some translations, for example if you set `excludeKey: '.props.'`, it'll ignore all flat keys with this value | no | string, string[] | -
| marker                | special string, it'll added via `mark-unused` | no | string | '[UNUSED]'
| gitCheck              | it'll show git change tree state | no | boolean | false

## Usage

Get help:
```bash
i18n-unused -h
```

Display unused translations:
```bash
i18n-unused display-unused
```

Mark unused translations via `[UNUSED]` or your marker from config (works only with `json` for now):
```bash
i18n-unused mark-unused
```

Remove unused translations (works only with `json` for now):
```bash
i18n-unused remove-unused
```

Sync translations (works only with `json` for now):
```bash
i18n-unused sync <source> <target>
```

Display missed translations:
```bash
i18n-unused display-missed
```

## Usage in code

### collectUnusedTranslations

If you use tool in code, you can run async function `collectUnusedTranslations`:

```javascript
import { collectUnusedTranslations } from 'i18n-unused';

const handleTranslations = async () => {
  const unusedTranslations = await collectUnusedTranslations(
    localesPaths, // paths to locale files
    srcFilesPaths, // paths to src files
    {
      localeFileParser: (module) => module, // optional, resolver for module
      excludeTranslationKey: ['.props.'], // optional, special string or sting[] to exclude flat translations
    },
  );
};
```

It'll return to you follow collect:

```javascript
{
  translations: [
    {
      localePath: 'locale_file_path',
      keys: ['unused_key'],
      count: 1,
    },
  ],
  totalCount: 1,
}
```

### collectMissedTranslations

If you use tool in code, you can run async function `collectMissedTranslations`:

```javascript
import { collectMissedTranslations } from 'i18n-unused';

const handleTranslations = async () => {
  const missedTranslations = await collectMissedTranslations(
    localesPaths, // paths to locale files
    srcFilesPaths, // paths to src files
    {
      localeFileParser: (module) => module, // optional, resolver for module
      excludeTranslationKey: ['.props.'], // optional, special string or sting[] to exclude flat translations
      translationKeyMatcher: /(?:[$ .](_|t|tc))\(.*?\)/ig, // optional, match translation keys in files
    },
  );
};
```

It'll return to you follow collect:

```javascript
{
  translations: [
    {
      filePath: 'src_file_path',
      staticKeys: ['missed_key'], // keys without ${} syntax
      dynamicKeys: ['missed_key'], // keys with ${} syntax
      staticCount: 1,
      dynamicCount: 1,
    },
  ],
  totalStaticCount: 1,
  totalDynamicCount: 1,
}
```

### generateFilesPaths

Also available async function `generateFilesPaths`:

```javascript
import { generateFilesPaths } from 'i18n-unused';

const handleFilesPaths = async () => {
  // return array of full paths to files
  const filesPaths = await generateFilesPaths(
    srcPath, // path where search files, example: 'src/locales'
    {
      extensions, // allowed files extensions, example: ['js', 'ts']
      fileNameResolver, // resolver for file name, see more info about 'localeNameResolver' option
    },
  );
};
```

## Action results

Next actions return `UnusedTranslations`:
  - `displayUnusedTranslations`
  - `removeUnusedTranslations`
  - `markUnusedTranslations`

Next actions return `MissedTranslations`:
- `displayMissedTranslations`

## What else?

If the tool helped you, please rate it on [github](https://github.com/mxmvshnvsk/i18n-unused), thx. I'll be glad to your PRs =)

## License

MIT License. [Maxim Vishnevsky](https://github.com/mxmvshnvsk)
