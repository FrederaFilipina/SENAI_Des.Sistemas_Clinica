import type { Exame, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";


export class ExameRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTdsExames(pagina?: number, limite?: number) {
        
        const existePaginacao = pagina! && limite!
        if(!existePaginacao) return await prisma.exame.findMany()
        
        const exames = await prisma.exame.findMany({
            skip:(pagina-1) * limite,
            take: limite
        })

        const total = await prisma.exame.count()
        const ttlPgs = Math.ceil(total / limite)

        return {
            exames,
            total,
            ttlPgs
        }
    }

    async buscarExameId(idExame: number) {

        const exame = await prisma.exame.findUnique({
            where:{
                id: idExame,
                include: {paciente: true}
            }
        })

        return exame
    }

    async criarExame(ddsExame: Partial<Exame>) {

        return await this.prisma.exame.create({
            data: {
                tipo_exame: ddsExame.tipo_exame || "",
                valor: ddsExame.valor || "",
                descricao: ddsExame.descricao || "",
                data_exame: new Date(ddsExame.data_exame || ""),
                resultado: ddsExame.resultado || ""
            }
        })
    }

    async atualizarExame(idExame: number, atualizarDados: Omit<Exame, 'id'>){

        const ddsExameAtualizados = await prisma.exame.update({
            data: {
                ...atualizarDados,
                data_exame: new Date(atualizarDados.data_exame)
            }, where:{
                id: idExame
            }
        })

        return ddsExameAtualizados
    }

    async deletarExame(idExame: number) {

        const exame = await prisma.exame.delete({
            where:{
                id: idExame
            }
        })

        return exame 
    }
}

export const exameRepository = new ExameRepository(prisma)
