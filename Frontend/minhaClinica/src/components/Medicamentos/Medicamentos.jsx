import { useState, useEffect } from 'react'
import apiClient from '../../api/api'
import Modal from '../Modal/Modal'
import SearchBar from '../SearchBar/SearchBar'
import { toast } from 'react-toastify'
import { FaPills, FaEdit, FaTrash } from 'react-icons/fa'

const Medicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentMedicamento, setCurrentMedicamento] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        nome: '',
        marca: '',
        fabricante: '',
        data_vencimento: ''
    })

    const itemsPerPage = 5

    // Fetch all medications
    const fetchMedicamentos = async () => {
        try {
            const response = await apiClient.get('/medicamentos')
            if (Array.isArray(response.data)) {
                setMedicamentos(response.data)
            } else if (response.data && Array.isArray(response.data.medicamentos)) {
                setMedicamentos(response.data.medicamentos)
            }
        } catch (error) {
            console.error('Erro ao buscar medicamentos:', error)
            toast.error('Erro ao carregar a lista de medicamentos.')
        }
    }

    useEffect(() => {
        fetchMedicamentos()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    // Filter medications
    const filteredMedicamentos = medicamentos.filter((med) => {
        const query = searchTerm.toLowerCase()
        return (
            med.nome.toLowerCase().includes(query) ||
            med.marca.toLowerCase().includes(query) ||
            med.fabricante.toLowerCase().includes(query)
        )
    })

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredMedicamentos.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredMedicamentos.length / itemsPerPage)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const openAddModal = () => {
        setFormData({
            nome: '',
            marca: '',
            fabricante: '',
            data_vencimento: ''
        })
        setIsAddModalOpen(true)
    }

    const openEditModal = (medicamento) => {
        setCurrentMedicamento(medicamento)
        const formattedDate = medicamento.data_vencimento
            ? new Date(medicamento.data_vencimento).toISOString().split('T')[0]
            : ''
        setFormData({
            nome: medicamento.nome,
            marca: medicamento.marca,
            fabricante: medicamento.fabricante,
            data_vencimento: formattedDate
        })
        setIsEditModalOpen(true)
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nome || !formData.marca || !formData.fabricante || !formData.data_vencimento) {
            toast.warning('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        setIsSaving(true)
        try {
            await apiClient.post('/medicamentos', formData)
            toast.success('Medicamento cadastrado com sucesso!')
            setIsAddModalOpen(false)
            fetchMedicamentos()
        } catch (error) {
            console.error('Erro ao cadastrar medicamento:', error)
            toast.error('Erro ao cadastrar medicamento.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        if (!formData.nome || !formData.marca || !formData.fabricante || !formData.data_vencimento) {
            toast.warning('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        setIsSaving(true)
        try {
            await apiClient.put(`/medicamentos/${currentMedicamento.id}`, formData)
            toast.success('Medicamento atualizado com sucesso!')
            setIsEditModalOpen(false)
            setCurrentMedicamento(null)
            fetchMedicamentos()
        } catch (error) {
            console.error('Erro ao atualizar medicamento:', error)
            toast.error('Erro ao atualizar medicamento.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este medicamento?')) {
            return
        }

        try {
            await apiClient.delete(`/medicamentos/${id}`)
            toast.success('Medicamento excluído com sucesso!')
            fetchMedicamentos()
        } catch (error) {
            console.error('Erro ao excluir medicamento:', error)
            toast.error('Erro ao excluir medicamento.')
        }
    }

    const formatDateDisplay = (dateString) => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    return (
        <section className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-cyan-800 flex items-center gap-2">
                    <FaPills /> Estoque de Medicamentos
                </h2>
                <button
                    onClick={openAddModal}
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center gap-2 self-start md:self-auto cursor-pointer"
                >
                    + Cadastrar Medicamento
                </button>
            </div>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                label="Buscar medicamento"
                placeholder="Pesquise por nome, marca ou fabricante"
            />

            {currentItems.length > 0 ? (
                <>
                    <div className="overflow-x-auto shadow-sm rounded-lg border bg-white mt-4">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-cyan-700 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">Nome</th>
                                    <th className="px-4 py-3 text-left">Marca</th>
                                    <th className="px-4 py-3 text-left">Fabricante</th>
                                    <th className="px-4 py-3 text-left">Data de Vencimento</th>
                                    <th className="px-4 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentItems.map((med) => (
                                    <tr key={med.id} className="border-b hover:bg-cyan-50 transition-colors">
                                        <td className="px-4 py-3 font-semibold">{med.id}</td>
                                        <td className="px-4 py-3">{med.nome}</td>
                                        <td className="px-4 py-3">{med.marca}</td>
                                        <td className="px-4 py-3">{med.fabricante}</td>
                                        <td className="px-4 py-3">{formatDateDisplay(med.data_vencimento)}</td>
                                        <td className="px-4 py-3 text-center flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(med)}
                                                className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-1 cursor-pointer"
                                                title="Editar"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(med.id)}
                                                className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                                                title="Excluir"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex gap-2 items-center justify-center mt-6">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Anterior
                            </button>
                            <span className="text-gray-600">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Próxima
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg border shadow-sm mt-4">
                    <p className="text-gray-500 italic">Nenhum medicamento encontrado.</p>
                </div>
            )}

            {/* Modal de Cadastro */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <h3 className="text-xl font-bold text-white mb-4">Cadastrar Medicamento</h3>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Nome do Medicamento *</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Marca *</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Fabricante *</label>
                        <input
                            type="text"
                            name="fabricante"
                            value={formData.fabricante}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Data de Vencimento *</label>
                        <input
                            type="date"
                            name="data_vencimento"
                            value={formData.data_vencimento}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition disabled:opacity-50 cursor-pointer"
                        >
                            {isSaving ? 'Salvando...' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal de Edição */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <h3 className="text-xl font-bold text-white mb-4">Editar Medicamento</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Nome do Medicamento *</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Marca *</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Fabricante *</label>
                        <input
                            type="text"
                            name="fabricante"
                            value={formData.fabricante}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Data de Vencimento *</label>
                        <input
                            type="date"
                            name="data_vencimento"
                            value={formData.data_vencimento}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 rounded-lg bg-cyan-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition disabled:opacity-50 cursor-pointer"
                        >
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    )
}

export default Medicamentos
