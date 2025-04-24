import { Gender } from "../enums";

export interface MedicationResponse {
  id: string;
  clinicId: string;
  patientId: string;
  medicationId: string;
  medicationName: string;
  genericName: string;
  prescribedByName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: string;
  createdAt: string;
}

export interface MedicationUpdateRequest {
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: string;
}

export interface PatientAccessRequest {
  clinicId: string;
  accessLevel?: string; // default is "READ", can be assigned programmatically
  endDate: string;
}

export interface PatientAccessResponse {
  id: string;
  patientId: string;
  clinicId: string;
  clinicName: string;
  grantedByName: string;
  accessLevel: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientNoteRequest {
  clinicId: string;
  doctorId: string;
  appointmentId: string;
  noteType: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface PatientNoteResponse {
  id: string;
  clinicId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  appointmentId: string;
  noteType: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientResponse {
  id: string;
  clinicId: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: string;
  email: string;
  phone: string;
  alternatePhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientUpdateRequest {
  bloodGroup: string;
  email: string;
  phone: string;
  alternatePhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export class VitalsRequest {
  clinicId: number;
  appointmentId: string;
  temperature: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  height: number;
  weight: number;
  bmi: number;
}

export class VitalsResponse {
  id: string;
  clinicId: string;
  patientId: string;
  appointmentId: string;
  recordedByName: string;
  temperature: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  height: number;
  weight: number;
  bmi: number;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationRequest {
  clinicId: string;
  medicationId: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
}

export interface LabTestUpdateRequest {
  status: string;
  results: string;
  notes: string;
}

export interface LabTestResponse {
  id: string;
  clinicId: string;
  patientId: string;
  testId: string;
  testName: string;
  testCategory: string;
  orderedByName: string;
  orderedAt: string;
  status: string;
  results: string;
  completedAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabTestRequest {
  clinicId: string;
  testId: string;
  notes: string;
}

export class AppointmentUpdateRequest {
  appointmentDate: string;
  startTime: string;
  endTime: string;
  appointmentType: string;
  status: string;
  reason: string;
  notes: string;
}

export interface AppointmentResponse {
  id: string;
  clinicId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  appointmentType: string;
  reason: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export class AppointmentRequest {
  clinicId: number;
  doctorId: number;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  appointmentType: string;
  reason: string;
}

export interface AllergyResponse {
  id: string;
  clinicId: string;
  patientId: string;
  allergyId: string;
  allergyName: string;
  allergyCategory: string;
  severity: string;
  reaction: string;
  notedByName: string;
  notedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllergyRequest {
  allergyId: string;
  severity: string;
  reaction: string;
}

export interface Vital {
  id: number;
  clinic_id: number;
  appointment_id: number;
  patient_id: number;
  temperature: number | null;
  blood_pressure_systolic: number | null;
  blood_pressure_diastolic: number | null;
  heart_rate: number | null;
  respiratory_rate: number | null;
  oxygen_saturation: number | null;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  recorded_at: string; // ISO datetime string
  recorded_by_name: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface FaceSheet {
  hasAppointment: boolean
  labResults: string[]
  medications: string[]
  newAppointment: true
  patient: PatientResponse
  problems: string[]
  vitals: Vital[]
}

export type NoteType = 'INITIAL' | 'FOLLOW_UP';

export class CreateInitialNoteRequest {
  clinicId: number;
  doctorId: number;
  appointmentId?: number;
  noteType: NoteType;
  noteId?: number;
}
