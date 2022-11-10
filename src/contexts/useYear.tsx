import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  ReactElement,
} from "react";

interface ContextProps {
  year: number;
  updateYear: (newYear: number) => void;
}

interface ProviderProps {
  children: ReactElement;
}
export const YearContext = createContext<ContextProps>({} as ContextProps);

export function YearProvider({ children }: ProviderProps) {
  const [year, setYear] = useState<number>(2022);

  const updateYear = useCallback((newYear: number) => {
    setYear(newYear);
  }, []);

  return (
    <YearContext.Provider value={{ year, updateYear }}>
      {children}
    </YearContext.Provider>
  );
}
