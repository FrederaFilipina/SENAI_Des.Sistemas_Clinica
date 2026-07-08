import React, { useState } from 'react'
import { toast } from 'react-toastify'
import apiClient from '../../api/api'

const RegisterUser = ({ onSuccess }) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
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
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-cyan-900 mb-6">
        Crie sua conta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset>
          <label htmlFor="email" className="block text-sm font-medium text-cyan-800 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
            placeholder="seuemail@exemplo.com"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="senha" className="block text-sm font-medium text-cyan-800 mb-1">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            minLength={4}
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
            placeholder="Digite sua senha"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="confirmSenha" className="block text-sm font-medium text-cyan-800 mb-1">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmSenha"
            minLength={4}
            required
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            className="w-full p-3 rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
            placeholder="Repita sua senha"
          />
          {!isSenhaMatch && (
            <p className="text-red-500 text-sm mt-1">As senhas não correspondem</p>
          )}
        </fieldset>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-3 rounded-lg font-bold text-white transition-colors shadow-md ${
            isSaving
              ? 'bg-cyan-300 cursor-not-allowed'
              : 'bg-cyan-700 hover:bg-cyan-900 cursor-pointer'
          }`}
        >
          {isSaving ? 'Salvando...' : 'Criar Usuário'}
        </button>
      </form>
    </div>
  )
}

export default RegisterUser
