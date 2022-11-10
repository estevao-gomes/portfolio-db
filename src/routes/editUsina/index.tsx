import { Block, Card, Title, Button } from "@tremor/react";
import { Usina } from "../../shared/Usina";
import { remult } from "remult";
import { useParams, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { BalancoController } from "../../shared/BalancoController";

interface usinaInfo {
  name: string;
  garantiaFisica: string;
}

const usinaRepo = remult.repo(Usina);

async function fetchUsinas(id: string) {
  return usinaRepo.find({
    where: { id: id },
  });
}

export function EditUsina() {
  const { id } = useParams();

  const [usina, setUsina] = useState<usinaInfo>();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUsinas(id)
        .then((res) =>
          setUsina({
            name: res[0].name,
            garantiaFisica: res[0].garantiaFisica.toString(),
          })
        )
        .catch((error) => console.log(error));
    }
  }, []);

  async function saveUsina(event: FormEvent) {
    console.log("entrou");
    event.preventDefault();

    if (usina) {
      const savedUsina = await usinaRepo.save({
        id: id,
        name: usina.name,
        garantiaFisica: parseFloat(usina.garantiaFisica),
      });
      try {
        await BalancoController.setBalanco();
      } catch (e) {
        console.log(e.message);
      }
      navigate("/usinas");
    } else {
      console.log("erro");
    }
  }
  return (
    <Block marginTop="mt-6">
      <Card>
        <Title>Editar Dados - Usina X</Title>
        {usina ? (
          <form onSubmit={saveUsina} className="mt-6 grid grid-cols-2 gap-4">
            <label className="w-full">
              Nome:
              <input
                value={usina.name}
                onChange={(newName) =>
                  setUsina((usinaAtual) => {
                    return {
                      garantiaFisica: usinaAtual
                        ? usinaAtual.garantiaFisica
                        : "",
                      name: newName.target.value,
                    };
                  })
                }
                className="w-full mt-1 border border-slate-400 rounded-md py-1 px-2"
                type="text"
              />
            </label>
            <label className="w-full">
              Garantia Fisica:
              <input
                value={usina.garantiaFisica}
                onChange={(newGarantiaFisica) =>
                  setUsina((usinaAtual) => {
                    return {
                      garantiaFisica: newGarantiaFisica.target.value,
                      name: usinaAtual ? usinaAtual.name : "",
                    };
                  })
                }
                className="w-full mt-1 border border-slate-400 rounded-md py-1 px-2"
                type="text"
              />
            </label>
            <div className="col-start-2 flex justify-end gap-4">
              <button className="md:w-1/3 flex-shrink-0 inline-flex justify-center items-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent rounded-md border shadow-sm font-medium px-4 py-2.5 sm:text-lg text-base bg-blue-500 border-transparent focus:ring-blue-400 hover:bg-blue-600 hover:border-blue-600 text-white">
                <p className="">Confirmar</p>
              </button>
              <button
                onClick={() => navigate("/usinas")}
                className="md:w-1/3 flex-shrink-0 inline-flex justify-center items-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent rounded-md border shadow-sm font-medium px-4 py-2.5 sm:text-lg text-base bg-transparent border-blue-600 focus:ring-blue-400 hover:border-blue-600 hover:text-blue-600 text-blue-400"
              >
                <p className="">Cancelar</p>
              </button>
            </div>
          </form>
        ) : (
          <h1>Usina não encontrada</h1>
        )}
      </Card>
    </Block>
  );
}
