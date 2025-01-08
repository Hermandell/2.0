export const sampleData = {
    cliente: [
      { id: 1, cliente: "Juan Pérez", edad: 28, fecha: "2024-01-15", activo: true },
      { id: 2, cliente: "María López", edad: 35, fecha: "2024-02-20", activo: true },
      { id: 3, cliente: "Carlos Ruiz", edad: 42, fecha: "2024-01-10", activo: false },
      { id: 4, cliente: "Ana Torres", edad: 31, fecha: "2024-03-05", activo: true },
      { id: 5, cliente: "Pedro Sánchez", edad: 45, fecha: "2024-02-28", activo: false }
    ],
    eventos: [
      { id: 1, nombre: "Conferencia Tech", fecha: "2024-04-15", capacidad: 200, activo: true },
      { id: 2, nombre: "Workshop React", fecha: "2024-04-20", capacidad: 50, activo: true },
      { id: 3, nombre: "Hackathon 2024", fecha: "2024-05-01", capacidad: 100, activo: true },
      { id: 4, nombre: "Meetup JS", fecha: "2024-04-10", capacidad: 75, activo: false },
      { id: 5, nombre: "Dev Summit", fecha: "2024-05-15", capacidad: 300, activo: true }
    ],
    rules: [
      { id: 1, evento_id: 1, max_participants: 250, min_age: 18, requires_laptop: true },
      { id: 2, evento_id: 2, max_participants: 60, min_age: 21, requires_laptop: true },
      { id: 3, evento_id: 3, max_participants: 120, min_age: 16, requires_laptop: true },
      { id: 4, evento_id: 4, max_participants: 80, min_age: 18, requires_laptop: false },
      { id: 5, evento_id: 5, max_participants: 350, min_age: 21, requires_laptop: true }
    ]
  };