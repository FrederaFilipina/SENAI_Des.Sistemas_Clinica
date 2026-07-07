import { useState, useEffect } from "react"
import apiClient from "../../api/api"
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router"
import SearchBar from "../SearchBar/SearchBar"

const PatientsList = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [ages, setAges] = useState({})

    // Paginação
    const [currentPage, setCurrentPage] = useState(1)
    const patientsPerPage = 5

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    const calculateAge = (birthdate) => {
        if (!birthdate) return "-"

        const today = new Date()
        const birthdateDate = new Date(birthdate)

        let age = today.getFullYear() - birthdateDate.getFullYear()

        const monthDiff = today.getMonth() - birthdateDate.getMonth()

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
        ) {
            age--
        }

        return age
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get("/pacientes")

                if (!response) return

                const patientsData = response.data

                const calculatedAges = {}

                patientsData.forEach((patient) => {
                    calculatedAges[patient.id] = calculateAge(
                        patient.data_nascimento
                    )
                })

                setAges(calculatedAges)
                setPatients(patientsData)

            } catch (error) {
                console.error("Erro ao obter os dados de paciente", error)
            }
        }

        fetchPatients()
    }, [])

    const filteredPatients = patients.filter((patient) =>
        [
            patient.nome,
            patient.email,
            patient.telefone,
            patient.convenio,
        ]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    // Paginação
    const indexOfLastPatient = currentPage * patientsPerPage
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage

    const currentPatients = filteredPatients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    )

    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)

    return (
        <div className="bg-white shadow rounded-2xl p-6 mt-8">

            <h2 className="text-xl font-semibold text-cyan-800 mb-4">
                Informações Rápidas de Pacientes
            </h2>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                label="Encontre o paciente"
                placeholder="Digite o nome, e-mail, telefone ou convênio"
            />

            {
                currentPatients.length > 0 ? (
                    <ul className="divide-y divide-gray-200">

                        {
                            currentPatients.map((patient) => (
                                <li
                                    key={patient.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
                                >
                                    <div className="flex items-center gap-4">

                                        <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
                                            <FaUserAlt size={20} />
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {patient.nome}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {patient.email}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {patient.telefone}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="text-sm text-gray-600 mt-2 sm:mt-0 text-right">

                                        <p>
                                            <strong>Idade: </strong>
                                            {ages[patient.id] || "-"} anos
                                        </p>

                                        <p>
                                            <strong>Plano: </strong>
                                            {patient.convenio || "-"}
                                        </p>

                                        <Link
                                            to={`/pacientes/${patient.id}`}
                                            className="text-cyan-700 font-semibold hover:underline"
                                        >
                                            Ver detalhes
                                        </Link>

                                    </div>

                                </li>
                            ))
                        }

                    </ul>
                ) : (
                    <p className="text-gray-500 text-center py-6">
                        Nenhum paciente encontrado
                    </p>
                )
            }

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

        </div>
    )
}

export default PatientsList