# playground_typescript

## install

```bash
pnpm install
```

## run

```bash
pnpm build:live:for src/index.ts
```

## typeorm

```bash
# 初回のmigration作成
pnpm typeorm migration:generate --dataSource src/data-source.ts --pretty src/migration/FirstSchema

# 手動migration
cd src/typeorm
npx typeorm-ts-node-esm migration:run --dataSource src/data-source.ts
npx typeorm-ts-node-esm migration:generate --dataSource src/data-source.ts --pretty src/migration/XXX

# アプリで自動migration
pnpm typeorm:migration:generate_file src/migration/AddAgeToUser
pnpm typeorm:run:index

```

## references

- [Node.js &amp; TypeScript のプロジェクト作成 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/nodejs)
- [ECMAScript Modules · Jest](https://jestjs.io/docs/ecmascript-modules)
  - jest で ecmascript 使うために必要なオプション `NODE_OPTIONS=--experimental-vm-modules`
- [30 Seconds of Typescript- Inspired by 30-seconds-of-code](https://decipher.dev/30-seconds-of-typescript/)
