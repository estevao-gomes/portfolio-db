import { Entity, Fields } from "remult";

@Entity("usinas", {
  allowApiCrud: true,
})
export class Usina {
  @Fields.uuid()
  id!: string;

  @Fields.string()
  name!: string;

  @Fields.number()
  garantiaFisica = 0;
}
