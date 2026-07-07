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
            rg: ddsPaciente.rg,
            sexo: ddsPaciente.sexo,
            data_nascimento: new Date(ddsPaciente.data_nascimento),
            estado_civil: ddsPaciente.estado_civil,
            naturalidade: ddsPaciente.naturalidade,
            telefone: ddsPaciente.telefone,
            email: ddsPaciente.email,
            contato_emergencia: ddsPaciente.contato_emergencia,
            alergias: ddsPaciente.alergias,
            cuidados_especiais: ddsPaciente.cuidados_especiais,
            convenio: ddsPaciente.convenio,
            numero_convenio: ddsPaciente.numero_convenio,
            validade_convenio: new Date(ddsPaciente.validade_convenio),
            endereco: ddsPaciente.endereco
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
