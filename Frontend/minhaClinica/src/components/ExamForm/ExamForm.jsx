import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import Modal from "../Modal/Modal"
import apiClient from "../../api/api"

function ExamsForm() {
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        type: "",
        laboratory: "",
        documentUrl: "",
        results: "",
    })

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patients")
                setPatientes(response.data)
            } catch (error) {
                console.log("Error ao obeter dados do paciente", error)
            }
        }
        fetchPatients()
    }, [])

    const handleSearchChange = (e) => setSearchTerm(e.target.value)
    const filteredPatients = patients.filter(
        (patient) =>
            patient.fullName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || patient.id.toString().includes(searchTerm)
    )
    const hanfleSelectPatient = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const resetForm = () => {
        setFormData({
            name: "",
            date: "",
            time: "",
            type: "",
            laboratory: "",
            documentUrl: "",
            results: "",

        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedPatient) return
        try {
            setIsSaving(true)

            const dataToSave = {
                patientID: selectedPatient.id,
                ...formData
            }

            await apiClient.get("/exams", dataToSave)

            toast.success("Exame cadastrado com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()

        } catch (error) {
            console.error("Erro ao cadastrar exame!")
            toast.error("Erro ao cadastrar exame", {
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }

    return (
        <section className="p-6 text-gray-800">

            <div className='mb-6'>
                <label className="block text-sm font-semibold mb-2">
                    Buscar paciente para cadastrar o exame
                </label>

                <input type='text' value={searchTerm} onChange={handleSearchChange}
                placeholder="Digite o nome ou o registro do paciente"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-sky-600 outline-none"/>
            </div>

            <ul className='space-y-3'>
                {
                    filteredPatients.map((patient) => (
                        <li key={patient.id}
                        className='p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition'>
                            <div>
                                <p className='text-sm'>
                                    <strong>Registro:</strong> {patient.id}
                                </p>
                                <p className='text-sm'>
                                    <strong>Nome:</strong> {patient.fullName}
                                </p>
                                <p className='text-sm'>
                                    <strong>Convênio:</strong> {patient.healthInsurance}
                                </p>
                            </div>

                            <button onClick={() => hanfleSelectPatient(patient)}
                            className='bg-cyan-700 text-white px-3 rounded-lg hover:bg-cyan-600 cursor-pointer'>
                                Selecionar
                            </button>
                        </li>
                    ))
                }
            </ul>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {
                    selectedPatient && (
                        <>
                            <h2 className='text-lg font-bold mb-4 text-cyan-700'>
                                Cadastrar exame para: {selectedPatient.fullName}</h2>

                            <div className='mb-4 text-sm text-gray-700'>
                                <p>
                                    <strong>E-mail:</strong> {selectedPatient.email}
                                </p>
                                <p>
                                    <strong>Telefone:</strong>{selectedPatient.phone}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-4'>

                                <div>
                                    <label htmlFor='reason' className='block text-sm font-mediummb-1'>
                                        Exame:
                                    </label>
                                    <input type='text' name='name' id='reason' value={formData.name}
                                    onChange={handleInputChange} required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                </div>

                                <div className='grid grid-cols-2 gap-4'>

                                    <div>
                                        <label htmlFor='date' className='block text-sm font-mediummb-1'>
                                            Data:
                                        </label>
                                        <input type='date' name='date' id='date' value={formData.date}
                                        onChange={handleInputChange} required
                                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                    </div>

                                    <div>{/*Hora */}
                                        <label htmlFor='time' className='block text-sm font-mediummb-1'>
                                            Horário:
                                        </label>
                                        <input type='time' name='time' id='time' value={formData.time}
                                        onChange={handleInputChange} required
                                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor='type' className='block text-sm font-mediummb-1'>
                                        Tipo:
                                    </label>
                                    <input type='text' name='type' id='type' value={formData.type}
                                    onChange={handleInputChange} required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                </div>

                                <div>
                                    <label htmlFor='laboratory' className='block text-sm font-mediummb-1'>
                                        Laboratório:
                                    </label>
                                    <textarea name='laboratory' id='laboratory' value={formData.laboratory} rows={2} 
                                    onChange={handleInputChange} required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none resize-none'/>
                                </div>

                                <div>
                                    <label htmlFor='documentUrl' className='block text-sm font-mediummb-1'>
                                        URL da Documentação:
                                    </label>
                                    <input type='text' name='documentUrl' id='documentUrl' value={formData.documentUrl} 
                                    onChange={handleInputChange} required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                </div>

                                <div>
                                    <label htmlFor='results' className='block text-sm font-mediummb-1'>
                                        Resultados:
                                    </label>
                                    <input type='text' name='results' id='results' value={formData.results}
                                    onChange={handleInputChange} required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'/>
                                </div>

                                <div className='flex justify-end gap-3 pt-4'>
                                    <button type='button' onClick={handleCloseModal}
                                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'>
                                        Fechar
                                    </button>

                                    <button type='submit' disabled={isSaving}
                                    className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition'>

                                        {isSaving ? "Salvando...." : "Salvar"}

                                    </button>
                                </div>

                            </form>
                        </>
                    )
                }
            </Modal>

        </section>

    )
}
export default ExamsForm