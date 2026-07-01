import React, { useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'axios'
import apiClient from '../../api/api'

const RegisterUser = ({ onSuccess }) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleSenhaChange = (e) => setSenha(e.target.value)
    const handleConfirmSenhaChange = (e) => setConfirmSenha(e.target.value)

    const [isSenhaMatch, setIsSenhaMatch] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const isSenhaValid = () => senha.length >= 4 && senha === confirmSenha

    const resetForm = () => {
        setEmail('')
        setSenha('')
        setConfirmSenha('')
        setIsSenhaMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isSenhaValid()) {
            setIsSenhaMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await apiClient.post('/cadastro', { email, senha })

            setIsSaving(false)
            resetForm()
            toast.success('Usuário Criado com Sucesso!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error('Erro ao criar usuário', error)
            toast.error('Erro ao criar o usuário!', {
                autoClose: 3000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-cyan-900 rounded-xl'>

            <h2 className='text-cyan-100 text-2xl font-bold mb-6 text-center'>Cadastre-se:</h2>

            <form onSubmit={handleSubmit}>

                <div className='flex flex-col justify-evenly gap-2'>

                    <fieldset>
                        <label htmlFor='email' className='block text-white text-sm font-medium mb-1'>
                            E-mail:
                        </label>

                        <input type='email' id='email' value={email} required
                            onChange={handleEmailChange}
                            className='w-full p-2 rounded-lg text-white font-semibold border border-white focus:border-0  focus:outline-none focus:ring-2 focus:ring-cyan-500'
                        />
                    </fieldset>

                    <fieldset>

                        <label htmlFor='senha' className='block text-white text-sm font-medium mb-1'>
                            Senha:
                        </label>

                        <input type='password' id='senha' minLength={4} value={senha} required onChange={handleSenhaChange}
                            className='w-full p-2 rounded-lg text-white font-semibold border border-white focus:border-0  focus:outline-none focus:ring-2 focus:ring-cyan-500' />

                    </fieldset>

                    <fieldset>

                        <label htmlFor='confirmSenha' className='block text-white text-sm font-medium mb-1'>
                            Confirmar Senha:
                        </label>

                        <input type='password' id='confirmSenha' minLength={4} required value={confirmSenha} onChange={handleConfirmSenhaChange}
                            className='w-full p-2 rounded-lg text-white font-semibold border border-white focus:border-0  focus:outline-none focus:ring-2 focus:ring-cyan-500' />

                        {!isSenhaMatch && (
                            <p className='text-red-500 text-sm mt-1'>As senhas não correspondem</p>
                        )}
                    </fieldset>

                </div>



                <div>

                    <button type='submit' disabled={isSaving}
                        className={`w-full p-2 rounded-lg font-bold text-white mt-4 ${isSaving ? 'bg-cyan-300 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-500 cursor-pointer'} transition-colors`}
                    >
                        {isSaving ? "Salvando ..." : "Criar Usuário"}

                    </button>

                </div>

            </form>

        </div>
    )
}
export default RegisterUser