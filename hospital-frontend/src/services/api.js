import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blink.drkashishgupta.com/api';
const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN || 'blink.drkashishgupta.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Hospital APIs
export const getHospitals = () => api.get('/web-engine/hospitals');
export const getHospitalBySlug = (slug) => api.get(`/web-engine/hospital/${slug}`);
export const getHospitalDetails = (id) => api.get(`/web-engine/hospital/${id}/details`);

// Tenant/Multi-tenant API - gets hospital by subdomain or domain
export const getTenantConfig = (subdomain = null, domain = null) => {
    // If no subdomain/domain provided, will auto-detect from request
    return api.get('/web-engine/tenant-config', {
        params: { subdomain, domain }
    });
};

// Doctor APIs
export const getDoctors = (hospitalId) => api.get(`/web-engine/hospital/${hospitalId}/doctors`);

// Service APIs
export const getServices = (hospitalId) => api.get(`/web-engine/hospital/${hospitalId}/services`);

// Disease APIs
export const getDiseases = (hospitalId) => api.get(`/web-engine/hospital/${hospitalId}/diseases`);
export const getAllDiseases = () => api.get('/web-engine/diseases');

// Blog APIs
export const getBlogs = (hospitalId = null) => {
    const params = hospitalId ? { hospital_id: hospitalId } : {};
    return api.get('/web-engine/blogs', { params });
};
export const getBlogBySlug = (slug) => api.get(`/web-engine/blogs/${slug}`);

// Lead APIs
export const submitLead = (data) => api.post('/leads', data);

// Review APIs
export const getReviews = (hospitalId = null) => {
    const params = hospitalId ? { hospital_id: hospitalId } : {};
    return api.get('/web-engine/reviews', { params });
};

// Search APIs
export const search = (query) => api.get('/search', { params: { q: query } });

// Export BASE_DOMAIN for use in components
export { BASE_DOMAIN };

export default api;
