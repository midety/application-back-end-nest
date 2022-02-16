import {
  Environment,
  EnvironmentVariables,
  validationSchema,
} from './env.validation';
import dotenvExpand from 'dotenv-expand';

const { parsed } = dotenvExpand({ parsed: process.env });

const validationResult = validationSchema.validate(parsed, {
  stripUnknown: true,
});

if (validationResult.error) {
  console.error(validationResult.error.message);
  process.exit(0);
}

const { value: envValue } = validationResult;

export = {
  type: 'postgres',
  url: envValue[EnvironmentVariables.POSTGRES_URL],
  entities:
    envValue[EnvironmentVariables.NODE_ENV] === Environment.Production
      ? ['dist/**/*.entity.js']
      : ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'src/modules',
  },
  synchronize: false,
};
