import logo from '../../assets/logo-clinica.png'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-700 via-cyan-900 to-black overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Container principal */}
      <div className="z-10 flex flex-col md:flex-row w-[90%] max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Lado esquerdo */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-10 text-white bg-gradient-to-b from-cyan-950 to-cyan-800">

          <img src={logo} alt="minhaClinica" className="mb-6 w-100 h-auto drop-shadow-xl" />
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide">Minha Clínica</h1>

        </div>

        {/* Lado direito */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-10 bg-gray-100">

          <div className="w-full max-w-md">
            <LoginForm />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
