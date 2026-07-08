import ConsultsCounter from "../../components/Counters/ConsultsCounter"
import ExamsCounter from "../../components/Counters/ExamesCounter"
import PatientsCounter from "../../components/Counters/PatientsCounter"
import PatientsList from "../../components/PatientsList/PatientsList"


const Dashboard = () => {
    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                <PatientsCounter />
                <ConsultsCounter />
                <ExamsCounter />
            </div>

            <div>

                <PatientsList />

            </div>

        </div>
    )
}

export default Dashboard