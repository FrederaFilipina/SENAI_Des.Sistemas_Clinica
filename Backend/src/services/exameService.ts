import type { Exame } from "../prisma/generated/prisma/client";
import { exameRepository, type ExameRepository } from "../repository/exameRepository";


export class ExameService {

    constructor(private readonly repository: ExameRepository) { }

    async listarTdsExames(pagina?: number, limite?: number) {

        const exames = await this.repository.listarTdsExames(pagina, limite)

        return exames
    }

    async buscarExameId(idExame: number) {

        const exame = await this.repository.buscarExameId(idExame)

        return exame
    }

    async criarExame(ddsExame: Exame) {

        const exameCriado = await this.repository.criarExame({
            tipo_exame: ddsExame.tipo_exame,
            valor: ddsExame.valor,
            descricao: ddsExame.descricao,
            data_exame: new Date(ddsExame.data_exame),
            resultado: ddsExame.resultado,
            pacienteId: ddsExame.pacienteId
        })

        return exameCriado
    }



    async atualizarExame(idExame: number, atualizarDados: Omit<Exame, 'id'>) {

        const ddsExameAtualizados = await this.repository.atualizarExame(idExame, atualizarDados)

        return ddsExameAtualizados
    }

    async deletarExame(idExame: number) {

        const exameDeletado = await this.repository.deletarExame(idExame)

        return exameDeletado
    }
}

export const exameService = new ExameService(exameRepository);
