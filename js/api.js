/**
 * ===========================================================
 * PGH Risk & Safety - API Client Service
 * ===========================================================
 * 
 * Centralized API service for all backend communication.
 * Handles authentication, requests, and error handling.
 */

const API = {
    baseUrl: '/api',
    token: null,
    
    /**
     * Initialize API client
     */
    init() {
        // Load token from localStorage
        this.token = localStorage.getItem('authToken');
        
        // Check token validity on init
        if (this.token) {
            this.validateToken();
        }
    },
    
    /**
     * Set authentication token
     * @param {string} token - JWT token
     */
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    },
    
    /**
     * Get authentication headers
     * @returns {Object} Headers object
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    },
    
    /**
     * Make API request
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config = {
            headers: this.getHeaders(),
            ...options
        };
        
        // Handle FormData (file uploads)
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type']; // Let browser set it
        }
        
        try {
            const response = await fetch(url, config);
            
            // Handle 401 Unauthorized
            if (response.status === 401) {
                this.handleUnauthorized();
                throw new Error('Session expired. Please log in again.');
            }
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    /**
     * Handle unauthorized response
     */
    handleUnauthorized() {
        this.setToken(null);
        localStorage.removeItem('user');
        
        // Redirect to login if on protected page
        if (!window.location.pathname.includes('login')) {
            // Could emit event or redirect
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
    },
    
    /**
     * Validate current token
     */
    async validateToken() {
        try {
            const data = await this.request('/auth/me');
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            this.setToken(null);
            return null;
        }
    },
    
    // =========================================================
    // AUTH ENDPOINTS
    // =========================================================
    
    auth: {
        async login(email, password) {
            const data = await API.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            API.setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        },
        
        async register(userData) {
            const data = await API.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            
            API.setToken(data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        },
        
        async logout() {
            try {
                await API.request('/auth/logout', { method: 'POST' });
            } finally {
                API.setToken(null);
                localStorage.removeItem('user');
            }
        },
        
        async getProfile() {
            return API.request('/auth/me');
        },
        
        async changePassword(currentPassword, newPassword) {
            return API.request('/auth/password', {
                method: 'PUT',
                body: JSON.stringify({ currentPassword, newPassword })
            });
        },
        
        isAuthenticated() {
            return !!API.token;
        },
        
        getUser() {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
    },
    
    // =========================================================
    // DASHBOARD ENDPOINTS
    // =========================================================
    
    dashboard: {
        async getMetrics() {
            return API.request('/dashboard/metrics');
        },
        
        async getActivity(limit = 10) {
            return API.request(`/dashboard/activity?limit=${limit}`);
        },
        
        async getRecentIncidents(limit = 5) {
            return API.request(`/dashboard/incidents/recent?limit=${limit}`);
        },
        
        async getSummary() {
            return API.request('/dashboard/summary');
        },
        
        async getSites() {
            return API.request('/dashboard/sites');
        },
        
        // Chart data
        async getIncidentsByType() {
            return API.request('/dashboard/charts/incidents-by-type');
        },
        
        async getIncidentsBySeverity() {
            return API.request('/dashboard/charts/incidents-by-severity');
        },
        
        async getMonthlyTrend() {
            return API.request('/dashboard/charts/monthly-trend');
        },
        
        async getTrainingCompletion() {
            return API.request('/dashboard/charts/training-completion');
        }
    },
    
    // =========================================================
    // INCIDENTS ENDPOINTS
    // =========================================================
    
    incidents: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/incidents${query ? '?' + query : ''}`);
        },
        
        async getById(id) {
            return API.request(`/incidents/${id}`);
        },
        
        async create(incidentData) {
            return API.request('/incidents', {
                method: 'POST',
                body: JSON.stringify(incidentData)
            });
        },
        
        async update(id, data) {
            return API.request(`/incidents/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },
        
        async review(id) {
            return API.request(`/incidents/${id}/review`, {
                method: 'POST'
            });
        },
        
        async getStats(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/incidents/stats/summary${query ? '?' + query : ''}`);
        }
    },
    
    // =========================================================
    // PHOTOS ENDPOINTS
    // =========================================================
    
    photos: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/photos${query ? '?' + query : ''}`);
        },
        
        async getById(id) {
            return API.request(`/photos/${id}`);
        },
        
        async upload(file, metadata = {}) {
            const formData = new FormData();
            formData.append('photo', file);
            
            Object.keys(metadata).forEach(key => {
                if (metadata[key] !== undefined && metadata[key] !== null) {
                    formData.append(key, metadata[key]);
                }
            });
            
            return API.request('/photos', {
                method: 'POST',
                body: formData
            });
        },
        
        async update(id, data) {
            return API.request(`/photos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },
        
        async delete(id) {
            return API.request(`/photos/${id}`, {
                method: 'DELETE'
            });
        },
        
        async getPhasesSummary(siteId = null) {
            const query = siteId ? `?siteId=${siteId}` : '';
            return API.request(`/photos/phases/summary${query}`);
        }
    },
    
    // =========================================================
    // TRAINING ENDPOINTS
    // =========================================================
    
    training: {
        async getModules(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/training/modules${query ? '?' + query : ''}`);
        },
        
        async getModule(id) {
            return API.request(`/training/modules/${id}`);
        },
        
        async createModule(moduleData) {
            return API.request('/training/modules', {
                method: 'POST',
                body: JSON.stringify(moduleData)
            });
        },
        
        async startModule(moduleId) {
            return API.request(`/training/progress/${moduleId}/start`, {
                method: 'POST'
            });
        },
        
        async updateProgress(moduleId, progressPercent) {
            return API.request(`/training/progress/${moduleId}`, {
                method: 'PUT',
                body: JSON.stringify({ progressPercent })
            });
        },
        
        async completeModule(moduleId, score) {
            return API.request(`/training/progress/${moduleId}/complete`, {
                method: 'POST',
                body: JSON.stringify({ score })
            });
        },
        
        async getProgress(userId = null) {
            const query = userId ? `?userId=${userId}` : '';
            return API.request(`/training/progress${query}`);
        },
        
        async getStats() {
            return API.request('/training/stats');
        }
    },
    
    // =========================================================
    // DOCUMENTS ENDPOINTS
    // =========================================================
    
    documents: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/documents${query ? '?' + query : ''}`);
        },
        
        async getById(id) {
            return API.request(`/documents/${id}`);
        },
        
        async download(id) {
            // Direct download - returns file
            window.location.href = `${API.baseUrl}/documents/${id}/download`;
        },
        
        async upload(file, metadata = {}) {
            const formData = new FormData();
            formData.append('document', file);
            
            Object.keys(metadata).forEach(key => {
                if (metadata[key] !== undefined && metadata[key] !== null) {
                    formData.append(key, metadata[key]);
                }
            });
            
            return API.request('/documents', {
                method: 'POST',
                body: formData
            });
        },
        
        async update(id, data) {
            return API.request(`/documents/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },
        
        async delete(id) {
            return API.request(`/documents/${id}`, {
                method: 'DELETE'
            });
        },
        
        async getCategoriesSummary() {
            return API.request('/documents/categories/summary');
        }
    },
    
    // =========================================================
    // USERS ENDPOINTS
    // =========================================================
    
    users: {
        async getAll(params = {}) {
            const query = new URLSearchParams(params).toString();
            return API.request(`/users${query ? '?' + query : ''}`);
        },
        
        async getById(id) {
            return API.request(`/users/${id}`);
        },
        
        async update(id, data) {
            return API.request(`/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },
        
        async deactivate(id) {
            return API.request(`/users/${id}`, {
                method: 'DELETE'
            });
        }
    },
    
    // =========================================================
    // HEALTH CHECK
    // =========================================================
    
    async health() {
        return this.request('/health');
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    API.init();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
