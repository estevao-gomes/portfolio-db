import {
  Block,
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import { remult } from "remult";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export function Contratos() {
  const contratos = [
    {
      codigo: "11",
      competencia: new Date(2022, 1, 1),
      parte: "Usina 0",
      contraparte: "Usina 1",
      montante: 2,
    },
    {
      codigo: "22",
      competencia: new Date(2022, 2, 1),
      parte: "Usina 1",
      contraparte: "Usina 2",
      montante: 3,
    },
    {
      codigo: "33",
      competencia: new Date(2022, 2, 1),
      parte: "Usina 2",
      contraparte: "Usina 3",
      montante: 4,
    },
  ];
  return (
    <Block marginTop="mt-6">
      <Card>
        <Title>Lista de usinas e características</Title>
        <Table marginTop="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Código</TableHeaderCell>
              <TableHeaderCell>Competência</TableHeaderCell>
              <TableHeaderCell>Parte</TableHeaderCell>
              <TableHeaderCell>Contraparte</TableHeaderCell>
              <TableHeaderCell>Montante (MWh)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contratos.map((contrato) => {
              return (
                <TableRow key={contrato.codigo}>
                  <TableCell>
                    <Text>{contrato.codigo}</Text>
                  </TableCell>
                  <TableCell>
                    {contrato.competencia.toLocaleString("pt-BR", {
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Text>{contrato.parte}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{contrato.contraparte}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{contrato.montante}</Text>
                  </TableCell>
                  <TableCell>
                    <Link to={`/contratos`}>
                      <PencilSquareIcon className="w-5" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Block>
  );
}
