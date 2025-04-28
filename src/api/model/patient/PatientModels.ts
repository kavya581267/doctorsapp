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

export class PatientMedication {
  id: number;
  medicationId: number;
  medicationName: string;
  genericName: string | null;
  dosage: string;
  frequency: string;
  instructions: string | null;
  prescribedByName: string;
  startDate: string;
  endDate: string | null;
  status: string;
  patientId: number;
  clinicId: number;
  createdAt: string;
  updatedAt: string;
}

export class CreatePatientMedication {
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  dosageUnit: string;
  formulation: string;
  route: string;
  timePhase: string;
  medicationSchedule: string;
  days: string;
  status: string;
}

export class UpdatePatientMedication extends CreatePatientMedication {
  clinicId: string;
  medicationId: string
  appointmentId: string
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
  medications: PatientMedication[]
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

export interface CreateInitialNoteResponse{
    id: number;
    clinicId: number;
    patientId: number;
    doctorId: number;
    doctorName: string;
    appointmentId: number;
    noteType: NoteType;
    createdAt: string; // ISO timestamp
    updatedAt: string;
    noteHistoryId: number;
    drugHistory: string;
    familyHistory: string;
    investigations: string;
    pastMedicalHistory: string;
    personalHistory: string;
    presentingComplaints: string;
    systemicExamination: string;
    physicalExamination: string;
    diet: string;
    exercise: string;
    visitDx: string;
    vitals: any[]; // Replace `any` with a specific type if known
    medications: any[]; // Replace with type if known
    problems: any[]; // Replace with type if known
    filed: boolean;
    nextVisitDate?: string;
    filedTimestamp?: string;
  }

  export class UpdateNoteRequest {
      clinicId: string;
      doctorId: string;
      drugHistory: string;
      familyHistory: string;
      investigations: string;
      pastMedicalHistory: string;
      personalHistory: string;
      presentingComplaints: string;
      systemicExamination: string;
      physicalExamination: string;
      diet: string;
      exercise: string;
      visitDx: string;
  }


  export class FileNoteRequest {
    clinicId: number;
    doctorId: number;
    filed?: boolean = true
    nextVisitDate: string
}
