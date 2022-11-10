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
import { Usina } from "../../shared/Usina";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

const usinaRepo = remult.repo(Usina);

async function fetchUsinas() {
  return usinaRepo.find();
}

export function Usinas() {
  const [usinas, setUsinas] = useState<Usina[]>([{} as Usina]);

  useEffect(() => {
    fetchUsinas().then((res) => setUsinas(res));
  }, []);

  return (
    <Block marginTop="mt-6">
      <Card>
        <Title>Lista de usinas e características</Title>
        <Table marginTop="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Garantia Física</TableHeaderCell>
              <TableHeaderCell>Tecnologia</TableHeaderCell>
              <TableHeaderCell>Submercado</TableHeaderCell>
              <TableHeaderCell>Tipo de Energia</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usinas.map((usina) => {
              return (
                <TableRow key={usina.id}>
                  <TableCell>
                    <Text>{usina.name}</Text>
                  </TableCell>
                  <TableCell>{usina.garantiaFisica}</TableCell>
                  <TableCell>
                    <Text>Hydro</Text>
                  </TableCell>
                  <TableCell>
                    <Text>SE/CO</Text>
                  </TableCell>
                  <TableCell>
                    <Text>CONV</Text>
                  </TableCell>
                  <TableCell>
                    <Link to={`/editUsina/${usina.id}`}>
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
