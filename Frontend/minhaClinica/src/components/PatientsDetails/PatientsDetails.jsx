import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import apiClient from '../../api/api'

const PatientDetails = () => {

    const formatDate = (date) => {
        if (!date) return ''

        const onlyDate = date.substring(0, 10)
        const [year, month, day] = onlyDate.split("-")

        return `${day}/${month}/${year}`
    }

    const sortByDate = (items, field, order) => {
        return [...items].sort((a, b) => {
            const dateA = new Date(a[field])
            const dateB = new Date(b[field])

            return order === "desc"
                ? dateB - dateA
                : dateA - dateB
        })
    }

    const { id } = useParams()

    const [patient, setPatient] = useState({})
    const [consults, setConsults] = useState([])
    const [exams, setExams] = useState([])

    // Ordenação independente
    const [consultSortOrder, setConsultSortOrder] = useState("desc")
    const [examSortOrder, setExamSortOrder] = useState("desc")

    // Paginação independente
    const [consultPage, setConsultPage] = useState(1)
    const [examPage, setExamPage] = useState(1)
    const itemsPerPage = 3

    const [editingConsult, setEditingConsult] = useState(null)
    const [editConsultData, setEditConsultData] = useState({
        motivo: '',
        data_consulta: '',
        horario: '',
        descricao: '',
        medicamento: '',
        dosagem_precaucoes: '',
    })

    const [isEditingConsult, setIsEditingConsult] = useState(false)
    const [editingExam, setEditingExam] = useState(null)
    const [editExamData, setEditExamData] = useState({
        nome: '',
        data_exame: '',
        horario: '',
        tipo: '',
        laboratorio: '',
        url_documento: '',
        resultado: '',
    })
    const [isEditingExam, setIsEditingExam] = useState(false)


    useEffect(() => {

        const fetchPatientDetails = async () => {

            try {
                const patientRes = await apiClient.get(`/pacientes/${id}`)
                const consultsRes = await apiClient.get(`/consultas?pacienteId=${id}`)
                const examsRes = await apiClient.get(`/exames?pacienteId=${id}`)

                setPatient(patientRes.data)
                setConsults(sortByDate(consultsRes.data, "data_consulta", consultSortOrder))
                setExams(sortByDate(examsRes.data, "data_exame", examSortOrder))

            } catch (error) {
                console.error('Erro ao obter os detalhes do paciente:', error)
            }
        }


        fetchPatientDetails()

    }, [id, consultSortOrder, examSortOrder])



    const paginatedConsults = consults.slice((consultPage - 1) * itemsPerPage, consultPage * itemsPerPage)
    const paginatedExams = exams.slice((examPage - 1) * itemsPerPage, examPage * itemsPerPage)
    const totalConsultPages = Math.ceil(consults.length / itemsPerPage)
    const totalExamPages = Math.ceil( exams.length / itemsPerPage )
    const handleEditConsult = (consult) => {

        setEditingConsult(consult)

        setEditConsultData({
            motivo: consult.motivo,
            data_consulta: consult.data_consulta.substring(0, 10),
            horario: consult.horario,
            descricao: consult.descricao,
            medicamento: consult.medicamento,
            dosagem_precaucoes: consult.dosagem_precaucoes
        })

        setIsEditingConsult(true)
    }

    const handleUpdateConsult = async (e) => { e.preventDefault()

        try {

            if (!editingConsult) return

            const updatedConsult = { ...editingConsult, ...editConsultData, }
            await apiClient.put( `/consultas/${editingConsult.id}`, updatedConsult )


            setConsults((prev) => prev.map((c) => c.id === editingConsult.id ? updatedConsult : c ) )
            toast.success( 'Consulta atualizada com sucesso!' )

            setIsEditingConsult(false)
            setEditingConsult(null)


        } catch {

            toast.error(
                'Erro ao atualizar a consulta!'
            )

        }
    }




    const handleDeleteConsult = async (id) => {

        try {
            await apiClient.delete( `/consultas/${id}` )
            setConsults((prev) => prev.filter( (c) => c.id !== id ) )
            toast.success( 'Consulta excluída com sucesso!' )

        } catch {
            toast.error( 'Erro ao excluir consulta!' )
        }
    }





    const handleEditExam = (exam) => {

        setEditingExam(exam)
        setEditExamData({

            nome: exam.nome,
            data_exame: exam.data_exame.substring(0, 10),
            horario: exam.horario,
            tipo: exam.tipo,
            laboratorio: exam.laboratorio,
            url_documento: exam.url_documento,
            resultado: exam.resultado

        })
        setIsEditingExam(true)
    }





    const handleUpdateExam = async (e) => {
        e.preventDefault()

        try {

            if (!editingExam) return

            const updatedExam = { ...editingExam, ...editExamData, }

            await apiClient.put( `/exames/${editingExam.id}`, updatedExam )

            setExams((prev) => prev.map((exam) => exam.id === editingExam.id ? updatedExam : exam ) )
            toast.success( 'Exame atualizado com sucesso!' )

            setIsEditingExam(false)
            setEditingExam(null)

        } catch {
            toast.error( 'Erro ao atualizar o exame!' )
        }

    }

    const handleDeleteExam = async (id) => {

        try {
            await apiClient.delete( `/exames/${id}` )

            setExams((prev) => prev.filter( (e) => e.id !== id ) )
            toast.success( 'Exame excluído com sucesso!' )

        } catch {
            toast.error( 'Erro ao excluir exame!' )
        }

    }

    if (!patient) {
        return <p>Carregando...</p>
    }



    return (
        <section className="p-6 max-w-5xl mx-auto">


            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">

                <h2 className="text-2xl font-semibold text-gray-800 mb-2"> {patient.nome} </h2>

                <p> <span className="font-semibold"> Convênio: </span> {patient.convenio} </p>
                <p> <span className="font-semibold"> Alergias: </span> {patient.alergias} </p>

            </div>

            {/* CONSULTAS */}

            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">

                <h3 className="text-xl font-semibold text-gray-700 mb-4"> Histórico de Consultas </h3>

                <div className="flex gap-3 mb-4">

                    <button onClick={() => {
                            setConsultSortOrder("desc")
                            setConsultPage(1)
                        }}
                        className={`px-3 py-1 rounded-lg text-sm ${consultSortOrder === "desc"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Mais recentes
                    </button>


                    <button onClick={() => {
                            setConsultSortOrder("asc")
                            setConsultPage(1)
                        }}
                        className={`px-3 py-1 rounded-lg text-sm ${consultSortOrder === "asc"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Mais antigas
                    </button>

                </div>



                {isEditingConsult ? (

                    <form
                        onSubmit={handleUpdateConsult}
                        className="space-y-4"
                    >

                        {Object.keys(editConsultData).map((key) => (

                            <div key={key}>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {key}
                                </label>


                                <input
                                    type={
                                        key.includes("data")
                                            ? "date"
                                            : key.includes("horario")
                                                ? "time"
                                                : "text"
                                    }
                                    value={editConsultData[key]}
                                    onChange={(e) =>
                                        setEditConsultData({
                                            ...editConsultData,
                                            [key]: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                        ))}



                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Salvar
                            </button>


                            <button
                                type="button"
                                onClick={() => setIsEditingConsult(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>


                ) : consults.length === 0 ? (

                    <p className="text-gray-500">
                        Nenhuma consulta encontrada.
                    </p>


                ) : (

                    paginatedConsults.map((c) => (

                        <div
                            key={c.id}
                            className="border rounded-xl p-4 mb-4 bg-gray-50"
                        >

                            <p>
                                <strong>Consulta:</strong> {c.motivo}
                            </p>


                            <p>
                                <strong>Data:</strong>{" "}
                                {formatDate(c.data_consulta)}
                                {" - "}
                                {c.horario}
                            </p>


                            <p>
                                <strong>Descrição:</strong> {c.descricao}
                            </p>


                            <p>
                                <strong>Medicação:</strong> {c.medicamento}
                            </p>


                            <p>
                                <strong>Dosagem e Precauções:</strong>{" "}
                                {c.dosagem_precaucoes}
                            </p>



                            <div className="flex gap-3 mt-3">

                                <button
                                    onClick={() => handleEditConsult(c)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                >
                                    Editar
                                </button>


                                <button
                                    onClick={() => handleDeleteConsult(c.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                                >
                                    Deletar
                                </button>

                            </div>


                        </div>

                    ))

                )}



                {consults.length > itemsPerPage && (

                    <div className="flex justify-center items-center gap-3 mt-6">


                        <button
                            disabled={consultPage === 1}
                            onClick={() =>
                                setConsultPage(prev => prev - 1)
                            }
                            className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
                        >
                            Anterior
                        </button>


                        <span>
                            Página {consultPage} de {totalConsultPages}
                        </span>


                        <button
                            disabled={consultPage === totalConsultPages}
                            onClick={() =>
                                setConsultPage(prev => prev + 1)
                            }
                            className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
                        >
                            Próxima
                        </button>


                    </div>

                )}

            </div>





            {/* EXAMES */}


            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">


                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Histórico de Exames
                </h3>



                <div className="flex gap-3 mb-4">


                    <button
                        onClick={() => {
                            setExamSortOrder("desc")
                            setExamPage(1)
                        }}
                        className={`px-3 py-1 rounded-lg text-sm ${examSortOrder === "desc"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        Mais recentes
                    </button>



                    <button
                        onClick={() => {
                            setExamSortOrder("asc")
                            setExamPage(1)
                        }}
                        className={`px-3 py-1 rounded-lg text-sm ${examSortOrder === "asc"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        Mais antigas
                    </button>


                </div>



                {isEditingExam ? (

                    <form
                        onSubmit={handleUpdateExam}
                        className="space-y-4"
                    >

                        {Object.keys(editExamData).map((key) => (

                            <div key={key}>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {key}
                                </label>


                                <input
                                    type={
                                        key.includes("data")
                                            ? "date"
                                            : key.includes("horario")
                                                ? "time"
                                                : "text"
                                    }
                                    value={editExamData[key]}
                                    onChange={(e) =>
                                        setEditExamData({
                                            ...editExamData,
                                            [key]: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                        ))}



                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Salvar
                            </button>


                            <button
                                type="button"
                                onClick={() => setIsEditingExam(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                Cancelar
                            </button>

                        </div>


                    </form>


                ) : exams.length === 0 ? (

                    <p className="text-gray-500">
                        Nenhum exame encontrado.
                    </p>


                ) : (

                    paginatedExams.map((exam) => (

                        <div
                            key={exam.id}
                            className="border rounded-xl p-4 mb-4 bg-gray-50"
                        >

                            <p>
                                <strong>Exame:</strong> {exam.nome}
                            </p>


                            <p>
                                <strong>Data:</strong>{" "}
                                {formatDate(exam.data_exame)}
                                {" - "}
                                {exam.horario}
                            </p>


                            <p>
                                <strong>Tipo:</strong> {exam.tipo}
                            </p>


                            <p>
                                <strong>Laboratório:</strong> {exam.laboratorio}
                            </p>


                            <p>
                                <strong>Documento:</strong>{" "}
                                {exam.url_documento}
                            </p>


                            <p>
                                <strong>Resultado:</strong>{" "}
                                {exam.resultado}
                            </p>



                            <div className="flex gap-3 mt-3">


                                <button
                                    onClick={() => handleEditExam(exam)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                >
                                    Editar
                                </button>



                                <button
                                    onClick={() => handleDeleteExam(exam.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                                >
                                    Deletar
                                </button>


                            </div>


                        </div>

                    ))

                )}




                {exams.length > itemsPerPage && (

                    <div className="flex justify-center items-center gap-3 mt-6">


                        <button
                            disabled={examPage === 1}
                            onClick={() =>
                                setExamPage(prev => prev - 1)
                            }
                            className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
                        >
                            Anterior
                        </button>


                        <span>
                            Página {examPage} de {totalExamPages}
                        </span>


                        <button
                            disabled={examPage === totalExamPages}
                            onClick={() =>
                                setExamPage(prev => prev + 1)
                            }
                            className="px-3 py-1 rounded-lg bg-gray-200 disabled:opacity-50"
                        >
                            Próxima
                        </button>


                    </div>

                )}


            </div>



            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
            />


        </section>
    )
}


export default PatientDetails