// src/env.ts
import dotenv from 'dotenv'
dotenv.config()

function requiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Variável de ambiente ${key} não definida`)
  }
  return value
}

export const env = {
  port:  '',
  databaseUrl:  '',
  chaveAcesso:  '',
  chaveRefresh:  ''
}
