import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import apiClient from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";

const MedicalRecordList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 3;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get("/pacientes");
                setPatients(response.data);
            } catch (error) {
                console.error("Erro ao obter dados dos pacientes:", error);
            }
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(
        (patient) =>
            patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm) ||
            (patient.convenio ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    // Paginação
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

    const currentPatients = filteredPatients.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    );

    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    return (
        <section className="p-6 bg-gray-50 rounded-lg shadow-md">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Listagem de Prontuários
            </h2>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                label="Buscar paciente"
                placeholder="Digite o id, nome, e-mail ou convênio"
            />

            <ul className="space-y-4">

                {
                    currentPatients.length > 0 ? (
                        currentPatients.map((patient) => (
                            <li
                                key={patient.id}
                                className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                            >
                                <p className="text-sm text-gray-500">
                                    <strong className="text-gray-700">
                                        Registro:
                                    </strong>{" "}
                                    {patient.id}
                                </p>

                                <p className="text-gray-700">
                                    <strong>Nome:</strong> {patient.nome}
                                </p>

                                <p className="text-gray-700">
                                    <strong>Convênio:</strong> {patient.convenio}
                                </p>

                                <Link
                                    to={`/pacientes/${patient.id}`}
                                    className="inline-block mt-2 text-cyan-700 font-semibold hover:underline"
                                >
                                    Ver detalhes
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-600 text-center py-6">
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

        </section>
    );
};

export default MedicalRecordList;