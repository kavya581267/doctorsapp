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
  clinicId: number;
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
  active: boolean;
  createdAt: string;
  updatedAt: string;
  hasAppointment:boolean;
  inprogressCount:number;
  filedNoteCount: number
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
  appointmentId: number;
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
  clinic_id: number;
  created_at: string;
  days: string;
  dosage: string;
  dosage_unit: string;
  end_date: string;
  formulation: string;
  frequency: string;
  generic_name: string | null;
  id: number;
  instructions: string | null;
  medication_id: number;
  medication_name: string;
  medication_schedule: string;
  patient_id: number;
  prescribed_by_name: string;
  route: string;
  start_date: string;
  status: string;
  time_phase: string;
  updated_at: string;
}

export class PatientMedicationResponse {
  id: number;
  clinicId: number;
  patientId: number;
  medicationId: number;
  appointmentId: number | null;
  medicationName: string;
  genericName: string | null;
  prescribedByName: string;
  dosage: string;
  frequency: string;
  startDate: string; // ISO Date string
  endDate: string;   // ISO Date string
  instructions: string;
  dosageUnit: string;
  formulation: string;
  route: string;
  timePhase: string;
  medicationSchedule: string;
  days: string;
  status: string;
  createdAt: string; // ISO Date-Time string
  updatedAt: string; // ISO Date-Time string
}

export class UpdatePatientMedication {
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

export class CreatePatientMedication extends UpdatePatientMedication {
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

export class LabOrderRequest {
  clinicId: number;
  testId: number;
  notes: string;
}

export class LabTestOrderResp {
  id: number;
  clinicId: number;
  patientId: number;
  testId: number;
  testName: string;
  testCategory: string | null;
  orderedByName: string;
  orderedAt: string; // ISO timestamp
  status: string;
  results: any | null;
  completedAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
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

export class FacesheetObservation {
  appointment_id: number;
  clinic_id: number;
  created_at: string; // ISO datetime string
  id: number;
  observation: string;
  order_id: number;
  patient_id: number;
  recorded_at: string; // ISO datetime string
  recorded_by_name: string;
  units: string;
  updated_at: string; // ISO datetime string
  value: number;
  master_lab_test_name: string;
  master_lab_test_id: number
}

export interface FaceSheet {
  hasAppointment: boolean
  labResults: FacesheetObservation[]
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

export interface CreateInitialNoteResponse {
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
  vitals: VitalsRequest[]; // Replace `any` with a specific type if known
  medications: any[]; // Replace with type if known
  problems: any[]; // Replace with type if known
  filed: boolean;
  nextVisitDate?: string;
  filedTimestamp?: string;
}

export class UpdateNoteRequest {
  clinicId: number;
  doctorId: number;
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
  medications:PatientMedication[];
  vitals: VitalsRequest
}


export class FileNoteRequest {
  clinicId: number;
  doctorId: number;
  filed?: boolean = true
  nextVisitDate: string
}


export interface ListNoteResponse {
  appointmentDate: string; // Format: "YYYY-MM-DD"
  appointmentId: number;
  clinicId: number;
  createdAt: string; // Format: "YYYY-MM-DDTHH:MM:SS"
  doctorFirstname: string;
  doctorId: number;
  doctorLastname: string;
  filed: boolean;
  filedTimestamp: string | null; // could be null
  noteId: number;
  noteType: string; // Example: "INITIAL"
  patientFirstname: string;
  patientId: number;
  patientLastname: string;
  patientMrn: string; // Example: "C40-2025-000001"
}

export interface PastNotesResponse {
  noteId: number;
  clinicId: number;
  patientId: number;
  patientFirstname: string;
  patientLastname: string;
  patientMrn: string;
  appointmentId: number;
  appointmentDate: string;
  doctorId: number;
  doctorFirstname: string;
  doctorLastname: string;
  noteType: string;
  createdAt: string;
  filed: boolean;
  filedTimestamp: string;
}


export class LabResultEntryReq {
  observation: string;
  units: string;
  value: number;
}

export class LabResultsPayload {
  clinicId: number;
  appointmentId: number;
  orderId: number;
  labResults: LabResultEntryReq[];
}