import React, { useState } from 'react';
import { Users, Plus, List, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CensusForm } from './CensusForm';
import { CensusLis } from './CensusList';

type ActiveView = 'dashboard' | 'form' | 'list';

export function Dashboard() {
  const { personasCensadas, censista } = useApp();
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const misCensadas = personasCensadas.filter(p => p.censistaId === censista?.id);
  const totalSolicitudes = misCensadas.reduce((acc, persona) => {
    const solicitudes = persona.solicitudEspecial;
    return acc + (
      (solicitudes.visitaSacerdote ? 1 : 0) +
      (solicitudes.comunion ? 1 : 0) +
      (solicitudes.confesion ? 1 : 0) +
      (solicitudes.ungidos ? 1 : 0) +
      (solicitudes.bendicionHogar ? 1 : 0) +
      (solicitudes.otro ? 1 : 0)
    );
  }, 0);

  if (activeView === 'form') {
    return <CensusForm onBack={() => setActiveView('dashboard')} />;
  }

  if (activeView === 'list') {
    return <CensusLis onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Panel de Control
        </h2>
        <p className="text-gray-600">
          Gestiona el censo parroquial de manera eficiente
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Personas Censadas</p>
              <p className="text-3xl font-bold text-blue-600">{misCensadas.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Solicitudes Especiales</p>
              <p className="text-3xl font-bold text-amber-600">{totalSolicitudes}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total General</p>
              <p className="text-3xl font-bold text-green-600">{personasCensadas.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setActiveView('form')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Realizar Nuevo Censo
              </h3>
              <p className="text-gray-600">
                Registra información de una nueva persona o familia
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveView('list')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <List className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ver Lista de Censados
              </h3>
              <p className="text-gray-600">
                Consulta y gestiona las personas ya registradas
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}