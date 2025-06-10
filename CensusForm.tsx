import React, { useState } from 'react';
import { ArrowLeft, Save, MapPin, Phone, FileText, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CensusFormProps {
  onBack: () => void;
}

export function CensusForm({ onBack }: CensusFormProps) {
  const { agregarPersonaCensada } = useApp();
  const [formData, setFormData] = useState({
    calle: '',
    numeroCasa: '',
    nombrePersonaFamilia: '',
    telefono: '',
    observaciones: '',
    solicitudEspecial: {
      visitaSacerdote: false,
      comunion: false,
      confesion: false,
      ungidos: false,
      bendicionHogar: false,
      otro: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarPersonaCensada(formData);
    
    // Reset form
    setFormData({
      calle: '',
      numeroCasa: '',
      nombrePersonaFamilia: '',
      telefono: '',
      observaciones: '',
      solicitudEspecial: {
        visitaSacerdote: false,
        comunion: false,
        confesion: false,
        ungidos: false,
        bendicionHogar: false,
        otro: '',
      },
    });
    
    // Show success and go back
    alert('Persona registrada exitosamente');
    onBack();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (field: keyof typeof formData.solicitudEspecial) => {
    setFormData(prev => ({
      ...prev,
      solicitudEspecial: {
        ...prev.solicitudEspecial,
        [field]: field === 'otro' ? prev.solicitudEspecial.otro : !prev.solicitudEspecial[field],
      },
    }));
  };

  const handleOtroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      solicitudEspecial: {
        ...prev.solicitudEspecial,
        otro: e.target.value,
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Dashboard</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Nuevo Registro de Censo
        </h2>
        <p className="text-gray-600">
          Completa la información de la persona o familia
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Información de Residencia */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Información de Residencia</span>
            </h3>
          </div>

          <div>
            <label htmlFor="calle" className="block text-sm font-medium text-gray-700 mb-2">
              Calle *
            </label>
            <input
              type="text"
              id="calle"
              name="calle"
              value={formData.calle}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nombre de la calle"
            />
          </div>

          <div>
            <label htmlFor="numeroCasa" className="block text-sm font-medium text-gray-700 mb-2">
              Número de Casa *
            </label>
            <input
              type="text"
              id="numeroCasa"
              name="numeroCasa"
              value={formData.numeroCasa}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: 123, 45A, S/N"
            />
          </div>

          {/* Información Personal */}
          <div className="md:col-span-2 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span>Información Personal</span>
            </h3>
          </div>

          <div>
            <label htmlFor="nombrePersonaFamilia" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Persona o Familia *
            </label>
            <input
              type="text"
              id="nombrePersonaFamilia"
              name="nombrePersonaFamilia"
              value={formData.nombrePersonaFamilia}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nombre completo o apellido familiar"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono (opcional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Número de contacto"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones Generales
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              rows={3}
              value={formData.observaciones}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Cualquier información adicional relevante..."
            />
          </div>
        </div>

        {/* Solicitudes Especiales */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-600" />
            <span>Solicitudes Especiales</span>
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Marca las opciones que la persona o familia solicita
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.solicitudEspecial.visitaSacerdote}
                onChange={() => handleCheckboxChange('visitaSacerdote')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Visita del Sacerdote</span>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.solicitudEspecial.comunion}
                onChange={() => handleCheckboxChange('comunion')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Llevar la Comunión</span>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.solicitudEspecial.confesion}
                onChange={() => handleCheckboxChange('confesion')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Confesión</span>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.solicitudEspecial.ungidos}
                onChange={() => handleCheckboxChange('ungidos')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Unción de los Enfermos</span>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.solicitudEspecial.bendicionHogar}
                onChange={() => handleCheckboxChange('bendicionHogar')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Bendición del Hogar</span>
            </label>
          </div>

          <div>
            <label htmlFor="otro" className="block text-sm font-medium text-gray-700 mb-2">
              Otra solicitud específica
            </label>
            <input
              type="text"
              id="otro"
              value={formData.solicitudEspecial.otro}
              onChange={handleOtroChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Especifica cualquier otra necesidad pastoral..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Guardar Registro</span>
          </button>
        </div>
      </form>
    </div>
  );
}