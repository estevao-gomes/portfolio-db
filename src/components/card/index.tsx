import { Card } from "@tremor/react";
import { Flex, Block, Text, Metric, ProgressBar } from "@tremor/react";
import { FundoInterface } from "../../interfaces/fundoInterface";

export function GraphCard({
  fundo,
  balanco,
  contratado,
  total,
}: FundoInterface) {
  return (
    <Card maxWidth="max-w-lg">
      <Flex alignItems="items-start">
        <Block>
          <Text>{fundo}</Text>
          <Metric>{balanco}MWm</Metric>
        </Block>
      </Flex>
      <Flex marginTop="mt-4">
        <Text truncate={true}>
          {Math.round((contratado / total) * 100)}% ({contratado} MWh)
        </Text>
        <Text> {total} MWh </Text>
      </Flex>
      <ProgressBar percentageValue={68} marginTop="mt-2" />
    </Card>
  );
}
