import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router'
import { toast } from "react-toastify";
import apiClient from "../../api/api";

const PatientDetails = () => {

    const { id } = useParams
    const [patient, setPatient] = useState({})
    const [consults, setConsults] = useState([])
    const [exams, setExams] = useState([])
    const [editingConsult, setEditingConsult] = useState(null)
    const [editConsultData, setEditConsultData] = useState({
        reason: "",
        date: "",
        time: "",
        description: "",
        medication: "",
        dosagePrecautions: "",
    })
    const [isEditingConsult, setIsEditingConsult] = useState(null)
    const [editingExam, setEditingExam] = useState(null)
    const [editExamData, setEditExamData] = useState({
        name: "",
        date: "",
        time: "",
        type: "",
        laboratory: "",
        documentUrl: "",
        results: "",
    })
    const [isEditingExam, setIsEditingExam] = useState(null)

    useEffect(()=>{
        const fetchPatientDetails = async () =>{
            try{
                const patientRes = await apiClient.get(`/patients/${id}`)
                const consultsRes = await apiClient.get(`/consults?patientId=${id}`)
                const examsRes = await apiClient.get(`/exams?patientId=${id}`)

                setPatient(patientRes.data)
                setConsults(consultsRes.data)
                setExams(examsRes.data)
            } catch (error){
                console.error("Erro ao obter os detalhes do paciente", error)
            }
        }
        fetchPatientDetails()
    },[id])

    return (
        <>
        {patient.id}
        </>

    )
}
export default PatientDetails