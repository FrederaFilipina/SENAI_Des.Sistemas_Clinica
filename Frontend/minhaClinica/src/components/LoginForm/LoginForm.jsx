import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useAuth } from "../../context/AuthContext"
import apiClient from "../../api/api"
import Modal from "../Modal/Modal"
import RegisterUser from "../RegisterUser/RegisterUser"
import { toast } from 'react-toastify'
import ResetPassword from "../ResetPassword/ResetPassword"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const { login, user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await apiClient.post('/login', { email, senha })
            const { accessToken, refreshToken } = response.data

            if (!accessToken) {
                toast.error('Usuário desconhecido. Verifique o e-mail e senha informados!', {
                    autoClose: 3000,
                    hideProgressBar: true
                })
                return
            }

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            login(email)

            toast.success('Login realizado com sucesso', {
                autoClose: 2500
            })

            setTimeout(() => navigate('/dashboard'), 2000)

        } catch (error) {
            toast.error('Erro ao se conectar com o Servidor!', {
                autoClose: 3000
            })

        }
    }
    return (
        <div className='max-w-md mx-auto mt-10 bg-cyan-950 p-8 rounded-3xl shadow-lg'>

            <h2 className='text-2xl font-bold text-center text-cyan-100 py-5'>
                Faça seu LOGIN!
            </h2>

            <form onSubmit={handleLogin}
                className='space-y-4'>

                <fieldset>

                    <label htmlFor="email"
                        className='block text-sm font-medium text-white mb-1'> E-mail
                    </label>

                    <input type="email" id="email" value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className='text-cyan-500 font-semibold w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500' />

                </fieldset>

                <fieldset>

                    <label htmlFor="senha"
                        className='block text-sm font-medium text-white mb-1'> Senha
                    </label>

                    <div className="relative">

                        <input type={mostrarSenha ? "text" : "password"} id="senha" minLength={4}
                        value={senha} required onChange={(e) => setSenha(e.target.value)}
                        className='text-cyan-500 w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500' />

                        <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-700 hover:text-cyan-500" title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}> 
                        {mostrarSenha ? <FaEye /> : < FaEyeSlash />}
                        </button>

                    </div>

                </fieldset>

                <button type="submit"
                    className='w-full bg-cyan-900 text-white font-bold p-2 rounded-lg hover:bg-cyan-500 transition-colors'>
                    ENTRAR!
                </button>

            </form>

            <div className='flex justify-between mt-4 text-sm py-5'>

                <button onClick={() => setIsModalOpen(true)}
                    className='text-white font-semibold hover:underline cursor-pointer'>
                    Criar Conta
                </button>

                <button
                    onClick={() => setIsResetPasswordOpen(true)}
                    className='text-white font-semibold hover:underline cursor-pointer'
                >
                    Alterar Senha
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterUser onSuccess={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} > <ResetPassword />
            </Modal>



        </div>
    )
}
export default LoginForm