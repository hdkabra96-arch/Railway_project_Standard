export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText}`);
  }
  return res.json();
};

export const getProjects = () => fetchAPI('/projects');
export const getServices = () => fetchAPI('/services');
export const getCertifications = () => fetchAPI('/certifications');
export const getContacts = () => fetchAPI('/contacts');

export const createProject = (data: any) => fetchAPI('/projects', { method: 'POST', body: JSON.stringify(data) });
export const updateProject = (id: string, data: any) => fetchAPI(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProject = (id: string) => fetchAPI(`/projects/${id}`, { method: 'DELETE' });

export const createService = (data: any) => fetchAPI('/services', { method: 'POST', body: JSON.stringify(data) });
export const updateService = (id: string, data: any) => fetchAPI(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteService = (id: string) => fetchAPI(`/services/${id}`, { method: 'DELETE' });

export const updateCertifications = (text: string) => fetchAPI('/certifications', { method: 'PUT', body: JSON.stringify({ text }) });
export const submitContact = (data: any) => fetchAPI('/contacts', { method: 'POST', body: JSON.stringify(data) });

export const loginAdmin = (data: any) => fetchAPI('/login', { method: 'POST', body: JSON.stringify(data) });
