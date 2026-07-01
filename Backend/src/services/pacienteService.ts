import type { Paciente } from "../prisma/generated/prisma/client";
import { pacienteRepository, type PacienteRepository } from "../repository/pacienteRepository";

export class PacienteService {

    constructor(private readonly repository: PacienteRepository) { }

    async listarTdsPacientes(pagina?: number, limite?: number) {
        return await this.repository.listarTdsPacientes(pagina, limite)
    }

    async buscarPacienteId(idPaciente: number) {
        return await this.repository.buscarPacienteId(idPaciente)
    }

    async criarPaciente(ddsPaciente: Paciente) {
        return await this.repository.criarPaciente({
            nome: ddsPaciente.nome,
            cpf: ddsPaciente.cpf,
            telefone: ddsPaciente.telefone,
            email: ddsPaciente.email,
            data_nascimento: new Date(ddsPaciente.data_nascimento),
            sexo: ddsPaciente.sexo,
            responsavel: ddsPaciente.responsavel
        })
    }

    async atualizarPaciente(idPaciente: number, atualizarDados: Omit<Paciente, 'id'>) {
        return await this.repository.atualizarPaciente(idPaciente, atualizarDados)
    }

    async deletarPaciente(idPaciente: number) {
        return await this.repository.deletarPaciente(idPaciente)
    }
}

export const pacienteService = new PacienteService(pacienteRepository);
