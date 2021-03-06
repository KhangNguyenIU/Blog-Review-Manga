export const config = () => ({
  port: Number(process.env.PORT) || 8000,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  
    database: process.env.DB_DATABASE,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [`dist/**/**/*.entity{.ts,.js}`],
    synchronize: Boolean(process.env.TYPEORM_SYNC) || true,
  },
});
