import { useState, useEffect } from 'react'
import apiClient from '../../api/api'

const ExamsList = () => {
    const [page, setPage] = useState(1)
    const [exams, setExams] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPagina, setTotalPagina] = useState(0)
    const limite = 10

    const start = (page - 1) * limite + 1
    const end = Math.min(page * limite, total)


    useEffect(() => {
        const fethExames = async () => {
            try {
                const response = await apiClient.get(`/exames?pagina=${page}&limite=${limite}`)
                console.log(response.data)
                if (response.data) {
                    setExams(response.data.exames)
                    setTotal(response.data.total)
                    setTotalPagina(response.data.ttlPgs)
                }
            } catch (error) {
                console.error("Erro ao listar exames", error)
            }
        }
        fethExames()
    }, [page])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4">📋 Lista de Exames</h2>
            {
                exams?.length ? (
                    <>
                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full border-collapse bg-white">
                                <thead className="bg-cyan-700 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">Tipo de Exame</th>
                                        <th className="px-4 py-2 text-left">Descrição</th>
                                        <th className="px-4 py-2 text-left">Data do Exame</th>
                                        <th className="px-4 py-2 text-left">Valor</th>
                                        <th className="px-4 py-2 text-left">Resultado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map((exame, index) => (
                                        <tr key={index} className="border-b hover:bg-cyan-50">
                                            <td className="px-4 py-2">{exame.id}</td>
                                            <td className="px-4 py-2">{exame.tipo_exame}</td>
                                            <td className="px-4 py-2">{exame.descricao}</td>
                                            <td className="px-4 py-2">{exame.data_exame}</td>
                                            <td className="px-4 py-2 font-semibold text-cyan-700">R$ {exame.valor}</td>
                                            <td className="px-4 py-2 italic">{exame.resultado}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex gap-3 items-center justify-center mt-6">
                            <span className="text-gray-700">
                                Mostrando {start} a {end} de {total}
                            </span>
                            {Array.from(Array(totalPagina)).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-3 py-1 rounded-lg text-white transition 
                                        ${i + 1 === page ? "bg-cyan-900" : "bg-cyan-600 hover:bg-cyan-700"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <span className="text-gray-500 italic">Sem dados disponíveis!</span>
                )
            }
        </div>
    )
}

export default ExamsList
