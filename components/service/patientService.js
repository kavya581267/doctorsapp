import { apiService } from "./apiService";

const PATIENTS_ENDPOINT = "/patients";

export const patientService = {
    // Get all patients with optional filters (e.g., gender, age)
    getAllPatients: (filters = {}) => apiService.get(PATIENTS_ENDPOINT, filters),

    // Get a specific patient by ID
    getPatientById: (id) => apiService.get(`${PATIENTS_ENDPOINT}/${id}`),

    // Add a new patient
    addPatient: (patientData) => apiService.post(PATIENTS_ENDPOINT, patientData),

    // Update an existing patient
    updatePatient: (id, updatedData) => apiService.put(`${PATIENTS_ENDPOINT}/${id}`, updatedData),

    // Delete a patient by ID
    deletePatient: (id) => apiService.delete(`${PATIENTS_ENDPOINT}/${id}`)
};
