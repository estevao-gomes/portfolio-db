import { Entity, Fields } from "remult";

@Entity("balancos", {
  allowApiCrud: true,
})
export class BalancoMes {
  @Fields.uuid() 
  id!: string;
  @Fields.string()
  tipo = "balanco";

  @Fields.string()
  usina!: string;

  @Fields.dateOnly()
  data = new Date("2022-01-01");

  @Fields.number()
  resultado_MCP!: number;

  @Fields.number()
  resultado_Lastro = 0;
}
