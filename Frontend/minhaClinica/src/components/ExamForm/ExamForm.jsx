import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Modal from "../Modal/Modal"
import apiClient from "../../api/api"
import SearchBar from "../SearchBar/SearchBar"

function ExamsForm() {

    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        nome: "",
        data_exame: "",
        horario: "",
        tipo_exame: "",
        laboratorio: "",
        url_documento: "",
        resultado: "",
    })

    // ============================
    // Paginação
    // ============================

    const [currentPage, setCurrentPage] = useState(1)
    const patientsPerPage = 5

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    // ============================
    // Buscar pacientes
    // ============================

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get("/pacientes")
                setPatients(response.data)
            } catch (error) {
                console.error("Erro ao obter dados do paciente", error)
            }
        }

        fetchPatients()
    }, [])

    // ============================
    // Pesquisa
    // ============================

    const filteredPatients = patients.filter((patient) =>
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toString().includes(searchTerm) ||
        (patient.convenio ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    // ============================
    // Paginação
    // ============================

    const indexOfLastPatient = currentPage * patientsPerPage
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage

    const currentPatients = filteredPatients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    )

    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)

    // ============================
    // Modal
    // ============================

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }

    // ============================
    // Formulário
    // ============================

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const resetForm = () => {
        setFormData({
            nome: "",
            data_exame: "",
            horario: "",
            tipo_exame: "",
            laboratorio: "",
            url_documento: "",
            resultado: "",
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedPatient) return

        try {

            setIsSaving(true)

            const dataToSave = {
                paciente_id: selectedPatient.id,
                ...formData
            }

            await apiClient.post("/exames", dataToSave)

            toast.success("Exame cadastrado com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()

        } catch (error) {

            console.error("Erro ao cadastrar exame!", error)

            toast.error("Erro ao cadastrar exame!", {
                autoClose: 2000,
                hideProgressBar: true
            })

        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="p-6 text-gray-800">

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                label="Buscar paciente para cadastrar o exame"
                placeholder="Digite o id, nome, e-mail ou convênio"
            />

            <ul className="space-y-3">
                {
                    currentPatients.length > 0 ? (
                        currentPatients.map((patient) => (
                            <li
                                key={patient.id}
                                className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition"
                            >
                                <div>
                                    <p className="text-sm">
                                        <strong>Registro:</strong> {patient.id}
                                    </p>

                                    <p className="text-sm">
                                        <strong>Nome:</strong> {patient.nome}
                                    </p>

                                    <p className="text-sm">
                                        <strong>Convênio:</strong> {patient.convenio}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleSelectPatient(patient)}
                                    className="bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 cursor-pointer"
                                >
                                    Selecionar
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-gray-500 py-8">
                            Nenhum paciente encontrado.
                        </li>
                    )
                }

            </ul>

            {
                totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>

                        {
                            Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded transition ${
                                        currentPage === index + 1
                                            ? "bg-cyan-900 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))
                        }

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Próxima
                        </button>

                    </div>
                )
            }

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                {
                    selectedPatient && (
                        <>
                            <h2 className="text-lg font-bold mb-4 text-white">
                                Cadastrar exame para: {selectedPatient.nome}
                            </h2>

                            <div className="mb-4 text-sm text-cyan-100">
                                <p>
                                    <strong>E-mail:</strong> {selectedPatient.email}
                                </p>

                                <p>
                                    <strong>Telefone:</strong> {selectedPatient.telefone}
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className="block text-cyan-500 text-sm font-medium mb-1"
                                    >
                                        Exame
                                    </label>

                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label
                                            htmlFor="data_exame"
                                            className="block text-cyan-500 text-sm font-medium mb-1"
                                        >
                                            Data
                                        </label>

                                        <input
                                            type="date"
                                            name="data_exame"
                                            id="data_exame"
                                            value={formData.data_exame}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="horario"
                                            className="block text-cyan-500 text-sm font-medium mb-1"
                                        >
                                            Horário
                                        </label>

                                        <input
                                            type="time"
                                            name="horario"
                                            id="horario"
                                            value={formData.horario}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label
                                        htmlFor="tipo_exame"
                                        className="block text-cyan-500 text-sm font-medium mb-1"
                                    >
                                        Tipo do exame
                                    </label>

                                    <input
                                        type="text"
                                        name="tipo_exame"
                                        id="tipo_exame"
                                        value={formData.tipo_exame}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="laboratorio"
                                        className="block text-cyan-500 text-sm font-medium mb-1"
                                    >
                                        Laboratório
                                    </label>

                                    <textarea
                                        name="laboratorio"
                                        id="laboratorio"
                                        rows={2}
                                        value={formData.laboratorio}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="url_documento"
                                        className="block text-cyan-500 text-sm font-medium mb-1"
                                    >
                                        URL do documento
                                    </label>

                                    <input
                                        type="text"
                                        name="url_documento"
                                        id="url_documento"
                                        value={formData.url_documento}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="resultado"
                                        className="block text-cyan-500 text-sm font-medium mb-1"
                                    >
                                        Resultado
                                    </label>

                                    <input
                                        type="text"
                                        name="resultado"
                                        id="resultado"
                                        value={formData.resultado}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full text-cyan-200 border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">

                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                                    >
                                        Fechar
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition"
                                    >
                                        {isSaving ? "Salvando..." : "Salvar"}
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