import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class PacienteRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTdsPacientes(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if (!existePaginacao) {
            return await prisma.paciente.findMany({
                include: { Prontuario: true, Consulta: true, Exame: true }
            })
        }

        const pacientes = await prisma.paciente.findMany({
            skip: (pagina - 1) * limite,
            take: limite,
            include: { Prontuario: true, Consulta: true, Exame: true }
        })

        const total = await prisma.paciente.count()
        const ttlPgs = Math.ceil(total / limite)

        return { pacientes, total, ttlPgs }
    }

    async buscarPacienteId(idPaciente: number) {
        return await prisma.paciente.findUnique({
            where: { id: idPaciente },
            include: { Prontuario: true, Consulta: true, Exame: true }
        })
    }

    async criarPaciente(ddsPaciente: Partial<Paciente>) {
        return await this.prisma.paciente.create({
            data: {
                nome: ddsPaciente.nome || "",
                cpf: ddsPaciente.cpf || "",
                rg: ddsPaciente.rg || null,
                sexo: ddsPaciente.sexo || "",
                data_nascimento: new Date(ddsPaciente.data_nascimento!),
                estado_civil: ddsPaciente.estado_civil || "",
                naturalidade: ddsPaciente.naturalidade || "",
                telefone: ddsPaciente.telefone || "",
                email: ddsPaciente.email || "",
                contato_emergencia: ddsPaciente.contato_emergencia || null,
                alergias: ddsPaciente.alergias || "",
                cuidados_especiais: ddsPaciente.cuidados_especiais || "",
                convenio: ddsPaciente.convenio || "",
                numero_convenio: ddsPaciente.numero_convenio || "",
                validade_convenio: new Date(ddsPaciente.validade_convenio!),
                endereco: ddsPaciente.endereco || ""
            }
        })
    }

    async atualizarPaciente(idPaciente: number, atualizarDados: Omit<Paciente, 'id'>) {
        return await prisma.paciente.update({
            where: { id: idPaciente },
            data: {
                ...atualizarDados,
                data_nascimento: new Date(atualizarDados.data_nascimento),
                endereco: atualizarDados.endereco || ""
            }
        })
    }

    async deletarPaciente(idPaciente: number) {
        return await prisma.paciente.delete({
            where: { id: idPaciente }
        })
    }
}

export const pacienteRepository = new PacienteRepository(prisma)
