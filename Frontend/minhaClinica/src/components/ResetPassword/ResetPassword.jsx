import { useState } from "react"
import { toast } from "react-toastify"
import apiClient from "../../api/api"

function ResetPassword({ onSuccess }) {

    const [email, setEmail] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const [isSenhaMatch, setIsSenhaMatch] = useState(true)

    const resetForm = () => {
        setEmail("")
        setNovaSenha("")
        setConfirmarSenha("")
        setIsSenhaMatch(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!novaSenha || !confirmarSenha || !email) {
            toast.warning("Preencha todos os campos.")
            return
        }

        if (novaSenha.length < 4) {
            toast.warning("A senha deve possuir pelo menos 4 caracteres.")
            return
        }

        if (novaSenha !== confirmarSenha) {
            setIsSenhaMatch(false)
            return
        }


        try {

            setIsSaving(true)

            await apiClient.put("/reset-password", {
                email,
                senha: novaSenha
            })

            toast.success("Senha alterada com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            resetForm()

            if (onSuccess) {
                onSuccess()
            }

        } catch (error) {

            console.error(error)

            if (error.response?.status === 404) {
                toast.error("E-mail não encontrado.")
            } else {
                toast.error("Erro ao alterar a senha.", {
                    autoClose: 2000,
                    hideProgressBar: true
                })
            }

        } finally {

            setIsSaving(false)

        }
    }


    return (

        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">

            <h2 className="text-2xl font-bold text-center text-cyan-900 mb-6">
                Alterar Senha
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <fieldset>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-cyan-800 mb-1"
                    >
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
                    <label
                        htmlFor="novaSenha"
                        className="block text-sm font-medium text-cyan-800 mb-1"
                    >
                        Nova Senha
                    </label>
                    <input
                        type="password"
                        id="novaSenha"
                        minLength={4}
                        value={novaSenha}
                        required
                        onChange={(e) => {
                            setNovaSenha(e.target.value)
                            setIsSenhaMatch(true)
                        }}
                        className="w-full p-3 rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
                        placeholder="Digite sua nova senha"
                    />
                </fieldset>

                <fieldset>
                    <label
                        htmlFor="confirmarSenha"
                        className="block text-sm font-medium text-cyan-800 mb-1"
                    >
                        Confirmar Nova Senha
                    </label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        minLength={4}
                        value={confirmarSenha}
                        required
                        onChange={(e) => {
                            setConfirmarSenha(e.target.value)
                            setIsSenhaMatch(true)
                        }}
                        className="w-full p-3 rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
                        placeholder="Repita sua nova senha"
                    />
                    {!isSenhaMatch && (
                        <p className="text-red-500 text-sm mt-1">
                            As senhas não correspondem
                        </p>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={isSaving}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors shadow-md ${isSaving
                            ? "bg-cyan-300 cursor-not-allowed"
                            : "bg-cyan-700 hover:bg-cyan-900 cursor-pointer"
                        }`}
                >
                    {isSaving ? "Alterando..." : "Alterar Senha"}
                </button>
            </form>
        </div>


    )
}

export default ResetPassword