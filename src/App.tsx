import { Title, Text, Tab, TabList, Card, Block } from "@tremor/react";
import { YearProvider } from "./contexts/useYear";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <YearProvider>
      <main className="container">
        <Title>
          <Link to="/">Portoflio Dashboard</Link>
        </Title>
        <Text>Informações de Portfolio - Balanço, Contratos e Usinas</Text>

        <TabList
          defaultValue={"/"}
          handleSelect={(value) => navigate(value)}
          marginTop="mt-6"
        >
          <Tab value={"/balancoMCP"} text="Balanço MCP" />
          <Tab value={"/balancoLastro"} text="Balanço Lastro" />
          <Tab value={"/usinas"} text="Usinas" />
          <Tab value={"/contratos"} text="Contratos" />
        </TabList>
        {location.pathname === "/" ? (
          <Block marginTop="mt-6">
            <Card>
              <div className="h-96">
                <h1 className="font-bold text-2xl">
                  Bem vindo ao Dashboard do Portfólio.
                </h1>
                <h2 className="mt-2">
                  Para começar, selecione uma das opções de visualização acima
                </h2>
              </div>
            </Card>
          </Block>
        ) : (
          <Outlet />
        )}
      </main>
    </YearProvider>
  );
}

export default App;
