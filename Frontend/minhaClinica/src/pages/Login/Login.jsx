
import logo from '../../assets/logo-clinica.png'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login =()=>{
    return(
        
        <div className='flex min-h-screen bg-cyan-900/50'>

            <div className='hidden md:flex w-1/2 bg-cyan-950 flex-col items-center justify-center p-8 rounded-r-[12%]'>
                
                <img src={logo} alt='minhaClinica' className='mb-6' />

            </div>

            <div className='flex w-full md:w-1/2 items-center justify-center p-8'>
            <LoginForm />
            </div>

        </div>
    )
}
export default Login