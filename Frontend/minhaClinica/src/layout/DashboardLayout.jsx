import { useAuth } from "../context/AuthContext"
import SideMenu from "../components/SideMenu/SideMenu"
import { Outlet } from "react-router"

const DashboardLayout = () => {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-100"> {/* altura total da tela */}

      <SideMenu />

      <main className="flex-1 flex flex-col h-screen"> {/* força o main a ter mesma altura */}
        
        {/* Cabeçalho */}
        <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md border-b border-gray-200">
          <h1 className="text-2xl font-bold text-cyan-800 tracking-wide">
            Painel do Sistema
          </h1>

          {user && (
            <div className="flex items-center gap-6">
              <span className="text-gray-700 font-medium">
                Bem-vindo, <span className="text-cyan-700">{user.email}</span>
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Sair
              </button>
            </div>
          )}
        </header>

        {/* Conteúdo principal */}
        <section className="flex-1 p-8  bg-gray-50">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default DashboardLayout
