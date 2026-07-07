import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IMaskInput } from 'react-imask';
import apiClient from '../../api/api';

function RegisterFormPatient() {
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        rg: "",
        sexo: "",
        data_nascimento: "",
        estado_civil: "",
        naturalidade: "",
        telefone: "",
        email: "",
        contato_emergencia: "",
        alergias: "",
        cuidados_especiais: "",
        convenio: "",
        numero_convenio: "",
        validade_convenio: "",
        endereco: {
            cep: "",
            cidade: "",
            estado: "",
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            referencia: ""
        }
    })

    const [isSaving, setIsSaving] = useState(false)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleAddressChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }))
    }
    const fetchAddressData = async (cep) => {
        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            setFormData((prev) => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    cep: data.cep || "",
                    cidade: data.localidade || "",
                    estado: data.uf || "",
                    rua: data.logradouro || "",
                    complemento: data.complemento || "",
                    bairro: data.bairro || ""
                }
            }))

        } catch (error) {
            console.log("Erro ao buscar endereço", error)
        }
    }
    const handleCepBlur = (e) => {
        const cep = e.target.value.replace(/\D/g, "")
        if (cep.length === 8) fetchAddressData(cep)

    }
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const maxBirthDate = yesterday.toISOString().split("T")[0]
    const validadeDate = () => {
        const selectedDate = new Date(formData.birthdate)
        const today = new Date()

        today.setHours(0, 0, 0, 0)

        if (selectedDate >= today) {
            toast.error("A data de nascimento deve ser anterior à data atual.", {
                autoClose: 2000,
                hideProgressBar: true
            })
            return
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validadeDate()

        setIsSaving(true)

        try {
            await apiClient.post("/pacientes", formData)

            toast.success("Paciente cadastrado com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            setFormData({
                nome: "",
                cpf: "",
                rg: "",
                sexo: "",
                data_nascimento: "",
                estado_civil: "",
                naturalidade: "",
                telefone: "",
                email: "",
                contato_emergencia: "",
                alergias: "",
                cuidados_especiais: "",
                convenio: "",
                numero_convenio: "",
                validade_convenio: "",
                endereco: {
                    cep: "",
                    cidade: "",
                    estado: "",
                    rua: "",
                    numero: "",
                    complemento: "",
                    bairro: "",
                    referencia: ""
                }
            })

        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.status);
            console.log(error.response?.data);


            toast.error("Erro ao Salvar os dados!", {
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }


    return (
        <form onSubmit={handleSubmit}
            className='space-y-6 text-gray-800' autoComplete='off'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                <fieldset>
                    <label htmlFor='nome' className='block text-sm font-medium mb-1'>Nome Completo</label>
                    <input type='text' name='nome' id='nome' value={formData.nome}
                        onChange={handleInputChange} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='sexo' className='block text-sm font-medium mb-1'>Gênero</label>

                    <select name='sexo' value={formData.sexo} onChange={handleInputChange} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'>
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>

                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor='data_nascimento' className='block text-sm font-medium mb-1'>Data de Nascimento</label>
                    <input type='date' name='data_nascimento' id='data_nascimento' value={formData.data_nascimento} onBlur={validadeDate}
                        onChange={handleInputChange} max={maxBirthDate} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='cpf' className='block text-sm font-medium mb-1'>CPF</label>
                    <IMaskInput mask="000.000.000-00" name='cpf' minLength={14} id='cpf' value={formData.cpf}
                        onAccept={(value) => setFormData((prev) => ({ ...prev, cpf: value }))}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='rg' className='block text-sm font-medium mb-1'>RG:</label>
                    <input type='text' name='rg' id='rg' value={formData.rg} onChange={handleInputChange} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>

                    <label htmlFor='estado_civil' className='block text-sm font-medium mb-1'>Estado Civil</label>

                    <select name='estado_civil' value={formData.estado_civil} onChange={handleInputChange} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'>

                        <option value="">Selecione</option>
                        <option value="solteiro(a)">Solteiro(a)</option>
                        <option value="casado(a)">Casado(a)</option>
                        <option value="divorciado(a)">Divorciado(a)</option>
                        <option value="viuvo(a)">Viúvo(a)</option>

                    </select>

                </fieldset>

                <fieldset>
                    <label htmlFor='telefone' className='block text-sm font-medium mb-1'>
                        Telefone
                    </label>
                    <IMaskInput mask="(00) 00000-0000" name='telefone' id='telefone' value={formData.telefone}
                        onAccept={(value) => setFormData((prev) => ({ ...prev, telefone: value }))}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='contato_emergencia' className='block text-sm font-medium mb-1'>
                        Contato de Emergência
                    </label>
                    <IMaskInput mask="(00) 00000-0000" name='contato_emergencia' id='contato_emergencia' value={formData.contato_emergencia} onAccept={(value) => setFormData((prev) => ({ ...prev, contato_emergencia: value }))}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='email' className='block text-sm font-medium mb-1'>
                        Email:
                    </label>
                    <input type='email' name='email' id='email' value={formData.email} onChange={handleInputChange} required className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='naturalidade' className='block text-sm font-medium mb-1'>Naturalidade:</label>
                    <input type='text' name='naturalidade' id='naturalidade' value={formData.naturalidade}
                        onChange={handleInputChange} required
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='alergias' className='block text-sm font-medium mb-1'>
                        Alergias?
                    </label>
                    <input type='text' name='alergias' id='alergias' value={formData.alergias}
                        onChange={handleInputChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='cuidados_especiais' className='block text-sm font-medium mb-1'>
                        Cuidados Especiais?
                    </label>
                    <input type='text' name='cuidados_especiais' id='cuidados_especiais' value={formData.cuidados_especiais}
                        onChange={handleInputChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='convenio' className='block text-sm font-medium mb-1'>
                        Convênio
                    </label>
                    <input type='text' name='convenio' id='convenio' value={formData.convenio}
                        onChange={handleInputChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='numero_convenio' className='block text-sm font-medium mb-1'>
                        Número do Convênio
                    </label>
                    <input type='text' name='numero_convenio' id='numero_convenio' value={formData.numero_convenio}
                        onChange={handleInputChange} className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='validade_convenio' className='block text-sm font-medium mb-1'>
                        Validade do Convênio
                    </label>
                    <input type='date' name='validade_convenio' id='validade_convenio'
                        value={formData.validade_convenio} onChange={handleInputChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='cep' className='block text-sm font-medium mb-1'>
                        CEP
                    </label>
                    <IMaskInput mask="00000-000" name='cep' id='cep' value={formData.endereco.cep} onBlur={handleCepBlur}
                        onAccept={(value) => handleAddressChange({ target: { name: "cep", value } })}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='rua' className='block text-sm font-medium mb-1'>
                        Rua
                    </label>
                    <input type='text' name='rua' id='rua' value={formData.endereco.rua}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='numero' className='block text-sm font-medium mb-1'>
                        Número
                    </label>
                    <input type='text' name='numero' id='numero' value={formData.endereco.numero}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='complemento' className='block text-sm font-medium mb-1'>
                        complemento
                    </label>
                    <input type='text' name='complemento' id='complemento' value={formData.endereco.complemento}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='referencia' className='block text-sm font-medium mb-1'>
                        Referência
                    </label>
                    <input type='text' name='referencia' id='referencia' value={formData.endereco.referencia}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='bairro' className='block text-sm font-medium mb-1'>
                        Bairro
                    </label>
                    <input type='text' name='bairro' id='bairro' value={formData.endereco.bairro}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='cidade' className='block text-sm font-medium mb-1'>
                        Cidade
                    </label>
                    <input type='text' name='cidade' id='cidade' value={formData.endereco.cidade}
                        onChange={handleAddressChange}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

                <fieldset>
                    <label htmlFor='estado' className='block text-sm font-medium mb-1'>
                        Estado
                    </label>
                    <input type='text' name='estado' id='estado' value={formData.endereco.estado}
                        onChange={handleAddressChange} disabled={true}
                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none' />
                </fieldset>

            </div >

            < div className='flex justify-end gap-3 pt-4' >
                <button type='submit' disabled={isSaving}
                    className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50'>

                    {isSaving ? "Salvando..." : "Salvar"}

                </button>
            </div >

        </form >
    )
}
export default RegisterFormPatient