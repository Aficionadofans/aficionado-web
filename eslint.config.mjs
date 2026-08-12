import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import oxlint from 'eslint-plugin-oxlint'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  oxlint.configs['flat/recommended'],
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'check-*.js',
    'check-*.ts',
    'sync-mux.ts',
    'test-*.js',
    'test-*.ts',
    'test/**/*.js',
    'test/**/*.ts',
    'utility/**/*.js',
    'utility/**/*.ts',
  ]),
])

export default eslintConfig
