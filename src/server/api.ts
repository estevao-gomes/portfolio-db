import { remultExpress } from "remult/remult-express";
import { BalancoController } from "../shared/BalancoController";
import { BalancoMes } from "../shared/Balanco";
import { Usina } from "../shared/Usina";
import { remult } from "remult";

interface createResultType {
  tipos: string[];
  anos: number[];
  usinas: string[];
}

function createResult({ tipos, anos, usinas }: createResultType) {
  const result = [];

  for (const tipo of tipos.keys()) {
    for (const usina of usinas.keys()) {
      for (const ano of anos.keys()) {
        for (let mes = 0; mes < 12; mes++) {
          result.push({
            usina: usinas[usina],
            tipo: tipos[tipo],
            data: new Date(anos[ano], mes, 1),
            resultado_MCP: tipos[tipo] !== "recurso" ? tipo + usina + ano : 0,
            resultado_Lastro:
              tipos[tipo] !== "recurso" ? tipo + usina + ano : 0,
          });
        }
      }
    }
  }
  return result;
}

export const api = remultExpress({
  controllers: [BalancoController],
  entities: [BalancoMes, Usina],
  initApi: async () => {
    const balancoRepo = remult.repo(BalancoMes);
    const usinaRepo = remult.repo(Usina);

    const atualizar = false;

    if (atualizar) {
      await balancoRepo.insert(
        createResult({
          tipos: ["balanco", "recurso"],
          anos: [2022, 2023],
          usinas: ["Usina 0", "Usina 1"],
        })
      );
    }

    if (atualizar) {
      await usinaRepo.insert([
        {
          name: "Usina 0",
          garantiaFisica: 0,
        },
        {
          name: "Usina 1",
          garantiaFisica: 0,
        },
        {
          name: "Usina 2",
          garantiaFisica: 12,
        },
      ]);
    }
  },
});
