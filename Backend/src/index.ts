import express from 'express'
import cors from 'cors'
import { auth } from './middleware/auth'
import { authRoute } from './routes/authRoute'
import { usuarioRoute } from './routes/usuarioRoute'
import { exameRouter } from './routes/exameRoute'
import { consultaRouter } from './routes/consultaRoute'
import { env } from './env'   // importa o env centralizado
import { pacienteRouter } from './routes/pacienteRoute'
import { medicamentoRouter } from './routes/medicamentoRoute'


const app = express()
app.use(express.json())
app.use(cors())

// usa a porta definida no .env, com fallback para 5000
const port = env.port || 5000

app.get('/', (req, res) => {
  res.send("Hello world")
})

// Rotas públicas
app.use(authRoute)

// Middleware de autenticação (protege as rotas abaixo)
app.use(auth)

// Rotas privadas
app.use(usuarioRoute)
app.use(exameRouter)
app.use(consultaRouter)
app.use(pacienteRouter)
app.use(medicamentoRouter)

app.listen(port, () => {
  console.log(`༼ つ ◕_◕ ༽つ Servidor da Clinica Fullstack está ativo na porta ${port}`)
})

