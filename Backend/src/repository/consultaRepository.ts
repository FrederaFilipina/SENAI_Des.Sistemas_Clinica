import type { Consulta, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ConsultaRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTdsConsultas(pagina?: number, limite?: number) {
        
        const existePaginacao = pagina! && limite!
        if(!existePaginacao) {
            return await prisma.consulta.findMany({
                include: { paciente: true }
            })
        }
        
        const consultas = await prisma.consulta.findMany({
            skip:(pagina-1) * limite,
            take: limite,
            include: { paciente: true }
        })

        const total = await prisma.consulta.count()
        const ttlPgs = Math.ceil(total / limite)

        return {
            consultas,
            total,
            ttlPgs
        }
    }

    async buscarConsultaId(idConsulta: number) {

        const consulta = await prisma.consulta.findUnique({
            where:{
                id: idConsulta
            },
            include: { paciente: true }
        })

        return consulta
    }

    async criarConsulta(ddsConsulta: Partial<Consulta>) {

        return await this.prisma.consulta.create({
            data: {
                motivo: ddsConsulta.motivo || "",
                data_consulta: new Date(ddsConsulta.data_consulta || ""),
                observacoes: ddsConsulta.observacoes || "",
                medico_responsavel_id: ddsConsulta.medico_responsavel_id!,
                paciente_id: ddsConsulta.paciente_id!
            }
        })
    }

    async atualizarConsulta(idConsulta: number, atualizarDados: Omit<Consulta, 'id'>){

        const ddsConsultaAtualizados = await prisma.consulta.update({
            data: {
                ...atualizarDados,
                data_consulta: new Date(atualizarDados.data_consulta)
            }, 
            where:{
                id: idConsulta
            }
        })

        return ddsConsultaAtualizados
    }

    async deletarConsulta(idConsulta: number) {

        const consulta = await prisma.consulta.delete({
            where:{
                id: idConsulta
            }
        })

        return consulta 
    }
}

export const consultaRepository = new ConsultaRepository(prisma)
