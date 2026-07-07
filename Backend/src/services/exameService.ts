import type { Exame } from "../prisma/generated/prisma/client";
import { exameRepository, type ExameRepository } from "../repository/exameRepository";


export class ExameService {

    constructor(private readonly repository: ExameRepository) { }

    async listarTdsExames(
        pagina?: number,
        limite?: number,
        pacienteId?: number
    ) {

        const exames = await this.repository.listarTdsExames(
            pagina,
            limite,
            pacienteId
        )

        return exames
    }

    async buscarExameId(idExame: number) {

        const exame = await this.repository.buscarExameId(idExame)

        return exame
    }

    async criarExame(ddsExame: Exame) {
        return await this.repository.criarExame({
            nome: ddsExame.nome,
            data_exame: ddsExame.data_exame,
            horario: ddsExame.horario,
            tipo_exame: ddsExame.tipo_exame,
            laboratorio: ddsExame.laboratorio,
            url_documento: ddsExame.url_documento,
            resultado: ddsExame.resultado,
            paciente_id: ddsExame.paciente_id
        });
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
