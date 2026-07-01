import type { Consulta } from "../prisma/generated/prisma/client";
import { consultaRepository, type ConsultaRepository } from "../repository/consultaRepository";

export class ConsultaService {

    constructor(private readonly repository: ConsultaRepository) { }

    async listarTdsConsultas(pagina?: number, limite?: number) {
        const consultas = await this.repository.listarTdsConsultas(pagina, limite)
        return consultas
    }

    async buscarConsultaId(idConsulta: number) {
        const consulta = await this.repository.buscarConsultaId(idConsulta)
        return consulta
    }

    async criarConsulta(ddsConsulta: Consulta) {
        const consultaCriada = await this.repository.criarConsulta({
            motivo: ddsConsulta.motivo,
            data_consulta: new Date(ddsConsulta.data_consulta),
            observacoes: ddsConsulta.observacoes,
            medico_responsavel_id: ddsConsulta.medico_responsavel_id,
            paciente_id: ddsConsulta.paciente_id
        })

        return consultaCriada
    }

    async atualizarConsulta(idConsulta: number, atualizarDados: Omit<Consulta, 'id'>) {
        const ddsConsultaAtualizados = await this.repository.atualizarConsulta(idConsulta, atualizarDados)
        return ddsConsultaAtualizados
    }

    async deletarConsulta(idConsulta: number) {
        const consultaDeletada = await this.repository.deletarConsulta(idConsulta)
        return consultaDeletada
    }
}

export const consultaService = new ConsultaService(consultaRepository);
