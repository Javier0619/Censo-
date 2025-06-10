export interface Censista {
  id: string;
  nombre: string;
  pastoral?: string;
  grupo?: string;
  fechaRegistro: string;
}

export interface PersonaCensada {
  id: string;
  calle: string;
  numeroCasa: string;
  nombrePersonaFamilia: string;
  telefono?: string;
  observaciones?: string;
  solicitudEspecial: {
    visitaSacerdote: boolean;
    comunion: boolean;
    confesion: boolean;
    ungidos: boolean;
    bendicionHogar: boolean;
    otro: string;
  };
  censistaId: string;
  fechaCenso: string;
}

export interface AppState {
  censista: Censista | null;
  personasCensadas: PersonaCensada[];
  isAuthenticated: boolean;
}