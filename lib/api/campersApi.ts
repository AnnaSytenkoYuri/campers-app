import nextServer from './api';

export const getCampers = async (
  page: number,
  filters: {
    location: string;
    equipment: string[];
    transmission: string;
    form: string;
  }
) => {
  const params: Record<string, number | string | boolean> = {
    page,
    limit: 4,
  };

  if (filters.location) params.location = filters.location;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.form) params.form = filters.form;

  filters.equipment.forEach(eq => {
    params[eq] = true;
  });

  const { data } = await nextServer.get('/api/campers', {
    params,
  });

  return data;
};

export const getCamperById = async (id: number) => {
  const { data } = await nextServer.get(`/api/campers/${id}`);
  return data;
};