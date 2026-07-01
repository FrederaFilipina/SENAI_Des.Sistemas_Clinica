import express from 'express'
import cors from 'cors'
import { auth } from './middleware/auth'
import { authRoute } from './routes/authRoute'
import { usuarioRoute } from './routes/usuarioRoute'
import { exameRouter } from './routes/exameRoute'
import { env } from './env'

console.log("DATABASE_URL Aqui:", process.env.DATABASE_URL)

const app = express()
app.use(express.json())
app.use(cors())

const port = env.port || 5000

app.get('/', (req, res) => {
  res.send("Hello world")
})

// Rotas públicas
app.use(authRoute)

// Middleware de autenticação
app.use(auth)

// Rotas privadas
app.use(usuarioRoute)
app.use(exameRouter)

app.listen(port, () => {
  console.log(`༼ つ ◕_◕ ༽つ Servidor da Clinica Fullstack está ativo na porta ${port}`)
})