import { Link, useNavigate, NavLink } from 'react-router'
import { MdDashboard, MdExitToApp, MdMenu, MdClose } from 'react-icons/md'
import { FaUserPlus, FaListAlt, FaCalendarCheck, FaPills } from 'react-icons/fa'
import { LiaClipboardListSolid } from "react-icons/lia"
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'


const SideMenu = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const handleLogout = () => { logout(), navigate('/') }
    const toggleMenu = () => { setIsCollapsed(!isCollapsed) }



    return (
        <aside
            className={`h-screen bg-gradient-to-b from-cyan-900 to-cyan-700 text-white flex flex-col justify-between transition-all duration-300 shadow-lg ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Topo */}
            <div className="p-4 flex items-center justify-between border-b border-cyan-600">
                {!isCollapsed && (
                    <h1 className="text-xl font-extrabold tracking-wide">Clínica +</h1>
                )}
                <button
                    onClick={toggleMenu}
                    className="text-white hover:text-cyan-300 focus:outline-none"
                >
                    {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <MdDashboard size={20} />
                            {!isCollapsed && <span>Início</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/prontuarios"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <FaCalendarCheck size={20} />
                            {!isCollapsed && <span>Prontuários</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/pacientes"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <FaUserPlus size={20} />
                            {!isCollapsed && <span>Registrar Paciente</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/consultas"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <MdMenu size={20} />
                            {!isCollapsed && <span>Consultas</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/exames"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <FaListAlt size={20} />
                            {!isCollapsed && <span>Exames</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/exames-list"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <LiaClipboardListSolid size={20} />
                            {!isCollapsed && <span>Lista de Exames</span>}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/medicamentos"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-cyan-600 text-white"
                                    : "text-gray-100 hover:bg-cyan-800 hover:text-cyan-200"
                                }`
                            }
                        >
                            <FaPills size={20} />
                            {!isCollapsed && <span>Medicamentos</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Rodapé */}
            <div className="p-4 border-t border-cyan-600">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:text-red-500 hover:bg-red-100 transition-colors w-full"
                >
                    <MdExitToApp size={20} />
                    {!isCollapsed && <span>Sair</span>}
                </button>
            </div>
        </aside>

    )
}

export default SideMenu