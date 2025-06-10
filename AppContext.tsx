import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Censista, PersonaCensada, AppState } from '../types';

interface AppContextType extends AppState {
  login: (censista: Omit<Censista, 'id' | 'fechaRegistro'>) => void;
  logout: () => void;
  agregarPersonaCensada: (persona: Omit<PersonaCensada, 'id' | 'censistaId' | 'fechaCenso'>) => void;
  eliminarPersonaCensada: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [censista, setCensista] = useLocalStorage<Censista | null>('censista', null);
  const [personasCensadas, setPersonasCensadas] = useLocalStorage<PersonaCensada[]>('personasCensadas', []);

  const login = (censistData: Omit<Censista, 'id' | 'fechaRegistro'>) => {
    const nuevoCensista: Censista = {
      id: Date.now().toString(),
      ...censistData,
      fechaRegistro: new Date().toISOString(),
    };
    setCensista(nuevoCensista);
  };

  const logout = () => {
    setCensista(null);
  };

  const agregarPersonaCensada = (personaData: Omit<PersonaCensada, 'id' | 'censistaId' | 'fechaCenso'>) => {
    if (!censista) return;
    
    const nuevaPersona: PersonaCensada = {
      id: Date.now().toString(),
      ...personaData,
      censistaId: censista.id,
      fechaCenso: new Date().toISOString(),
    };
    
    setPersonasCensadas(prev => [...prev, nuevaPersona]);
  };

  const eliminarPersonaCensada = (id: string) => {
    setPersonasCensadas(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      censista,
      personasCensadas,
      isAuthenticated: !!censista,
      login,
      logout,
      agregarPersonaCensada,
      eliminarPersonaCensada,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}