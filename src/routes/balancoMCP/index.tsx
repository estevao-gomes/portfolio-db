import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Text,
  Block,
  ColGrid,
  Flex,
  Icon,
  Title,
  Toggle,
  ToggleItem,
  Card,
  BarChart,
} from "@tremor/react";
import { useContext, useState, useEffect } from "react";
import { GraphCard } from "../../components/card";
import { YearContext } from "../../contexts/useYear";
import { remult } from "remult";
import { BalancoMes } from "../../shared/Balanco";

interface BalancoMesResultado {
  month: string;
  amount: number;
}

const balancoRepo = remult.repo(BalancoMes);

async function fetchBalancos() {
  return balancoRepo.find();
}

const infoFundos = [
  {
    fundo: "BER",
    balanco: 0,
    contratado: 0,
    total: 0,
  },
  {
    fundo: "BIF",
    balanco: 0,
    contratado: 0,
    total: 0,
  },
  {
    fundo: "BIF IV",
    balanco: 0,
    contratado: 0,
    total: 0,
  },
];

export function BalancoMCP() {
  const [balanco, setBalanco] = useState<BalancoMesResultado[]>();
  const { year, updateYear } = useContext(YearContext);

  const anos = [2022, 2023];

  useEffect(() => {
    fetchBalancos().then((res) => {
      const result = res
        .filter(
          (balanco) =>
            balanco.data.getFullYear() === year &&
            balanco.tipo === "balanco" &&
            balanco.usina === "Usina 0"
        )
        .map((resMes) => {
          return {
            month: resMes.data.toLocaleString("pt-BR", { month: "short" }),
            amount: resMes.resultado_MCP,
          };
        });
      setBalanco(result);
    });
  }, [year]);

  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("pt-BR").format(number).toString();
  };

  return (
    <>
      <ColGrid
        numColsMd={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-6"
      >
        {infoFundos.map((fundo, index) => (
          <GraphCard
            key={index}
            fundo={fundo.fundo}
            balanco={fundo.balanco}
            contratado={fundo.contratado}
            total={fundo.total}
          />
        ))}
      </ColGrid>

      <Block marginTop="mt-6">
        <div className="md:flex justify-between">
          <Block>
            <Flex
              justifyContent="justify-start"
              spaceX="space-x-0.5"
              alignItems="items-center"
            >
              <Title> Balanço Anual </Title>
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Mostra balanço mensal em MWm"
              />
            </Flex>
            <Text> Balanço mensal </Text>
          </Block>
          <div className="mt-6 md:mt-0">
            <Toggle
              color="zinc"
              defaultValue={year}
              handleSelect={(value: number) => updateYear(value)}
            >
              {anos.map((ano, index) => (
                <ToggleItem value={ano} text={ano.toString()} key={index} />
              ))}
            </Toggle>
          </div>
        </div>
        <Card>
          {balanco ? (
            <BarChart
              data={balanco}
              dataKey="month"
              categories={["amount"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              marginTop="mt-6"
              yAxisWidth="w-12"
            />
          ) : (
            "Adicionar tela de loading"
          )}
        </Card>
      </Block>
    </>
  );
}
