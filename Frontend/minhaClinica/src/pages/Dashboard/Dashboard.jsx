import ConsultsCounter from "../../components/Counters/ConsultsCounter"
import ExamsCounter from "../../components/Counters/ExamesCounter"
import PatientsCounter from "../../components/Counters/PatientsCounter"
import PatientsList from "../../components/PatientsList/PatientsList"


const Dashboard = () => {
    return (
        <div>
            <h1 className='text-xl font-bold text-cyan-800 mb-6'>Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
                <PatientsCounter />
                <ConsultsCounter />
                <ExamsCounter />
            </div>
            
            <PatientsList />

        </div>
    )
}

export default Dashboard