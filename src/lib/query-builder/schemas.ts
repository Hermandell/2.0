import { Schema } from './types';

export const schemas: Record<string, Schema> = {
  cliente: {
    id: 'number',
    cliente: 'string',
    edad: 'number',
    fecha: 'date',
    activo: 'boolean'
  },
  eventos: {
    id: 'number',
    nombre: 'string',
    fecha: 'date',
    capacidad: 'number',
    activo: 'boolean'
  },
  rules: {
    id: 'number',
    evento_id: 'number',
    max_participants: 'number',
    min_age: 'number',
    requires_laptop: 'boolean'
  }
};

// Define valid join relationships between schemas
export const joinRelationships: Record<string, { [key: string]: { from: string; to: string } }> = {
  cliente: {
    eventos: { from: 'id', to: 'cliente_id' }
  },
  eventos: {
    rules: { from: 'id', to: 'evento_id' },
    cliente: { from: 'cliente_id', to: 'id' }
  },
  rules: {
    eventos: { from: 'evento_id', to: 'id' }
  }
};