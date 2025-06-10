import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2, Phone, MapPin, Calendar, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PersonaCensada } from '../types';

interface CensusListProps {
  onBack: () => void;
}

export function CensusLis({ onBack }: CensusListProps) {
  const { personasCensadas, eliminarPersonaCensada, censista } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const misCensadas = personasCensadas.filter(p => p.censistaId === censista?.id);
  
  const filteredPersonas = misCensadas.filter(persona =>
    persona.nombrePersonaFamilia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.calle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.numeroCasa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSolicitudesTexto = (solicitud: PersonaCensada['solicitudEspecial']) => {
    const solicitudes = [];
    if (solicitud.visitaSacerdote) solicitudes.push('Visita Sacerdote');
    if (solicitud.comunion) solicitudes.push('Comunión');
    if (solicitud.confesion) solicitudes.push('Confesión');
    if (solicitud.ungidos) solicitudes.push('Unción');
    if (solicitud.bendicionHogar) solicitudes.push('Bendición Hogar');
    if (solicitud.otro) solicitudes.push(solicitud.otro);
    return solicitudes;
  };

  const handleDelete = (id: string, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el registro de ${nombre}?`)) {
      eliminarPersonaCensada(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Dashboard</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personas Censadas
        </h2>
        <p className="text-gray-600">
          {misCensadas.length} personas registradas por ti
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, calle o número de casa..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Lista de personas */}
      <div className="space-y-4">
        {filteredPersonas.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No se encontraron resultados' : 'No hay personas registradas'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda'
                : 'Comienza agregando tu primer registro de censo'
              }
            </p>
          </div>
        ) : (
          filteredPersonas.map((persona) => {
            const solicitudes = getSolicitudesTexto(persona.solicitudEspecial);
            
            return (
              <div key={persona.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {persona.nombrePersonaFamilia}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{persona.calle} #{persona.numeroCasa}</span>
                      </div>
                      
                      {persona.telefono && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{persona.telefono}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(persona.fechaCenso)}</span>
                      </div>
                    </div>
                    
                    {persona.observaciones && (
                      <p className="text-gray-700 mb-3 text-sm">
                        <strong>Observaciones:</strong> {persona.observaciones}
                      </p>
                    )}
                    
                    {solicitudes.length > 0 && (
                      <div className="flex items-start space-x-2">
                        <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Solicitudes especiales:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {solicitudes.map((solicitud, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                              >
                                {solicitud}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDelete(persona.id, persona.nombrePersonaFamilia)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}