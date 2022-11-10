import { BackendMethod, Remult } from "remult";

import { BalancoMes } from "./Balanco";
import { Usina } from "./Usina";

export class BalancoController {
  @BackendMethod({ allowed: true })
  static async setBalanco(remult?: Remult) {
    const balancoRepo = remult!.repo(BalancoMes);
    const usinaRepo = remult!.repo(Usina);

    for (const balanco of await balancoRepo.find({
      where: { tipo: "recurso" },
    })) {
      let novoResultado_MCP = 0;
      let novoResultado_Lastro = 0;
      for (const usina of await usinaRepo.find({
        where: { name: balanco.usina },
      })) {
        novoResultado_MCP += usina.garantiaFisica;
        novoResultado_Lastro += usina.garantiaFisica;
      }
      await balancoRepo.save({
        ...balanco,
        resultado_MCP: novoResultado_MCP,
        resultado_Lastro: novoResultado_Lastro,
      });
    }
  }
}
