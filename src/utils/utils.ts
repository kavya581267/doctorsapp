import { Medication } from "@api/model/doctor/MasterData";
import { PatientMedication, PatientMedicationResponse } from "@api/model/patient/PatientModels";

export const isEmptyString = (value: string): boolean => {
  return !value || value.trim().length === 0
}

export const isValidEmail = (value: string): boolean => {
  const emailRegExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegExpresion.test(value) ? true : false;
}

export const isValidPassword = (value: string): boolean => {
  const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegExp.test(value) ? true : false;
}
export const isValidPhone = (value: string): boolean => {

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(value) ? true : false;
}


export const isAnyFieldsEmpty = (values: string[], object: any): boolean => {
  if (!object) {
    return true;
  }
  return values.some(field => isEmptyString(object[field]));
}

export function replacePlaceholders(template: string, params: any) {
  return template.replace(/{{(.*?)}}/g, (_, key) => params[key.trim()] ?? "");
}


export function getAvatarName(firstName: string, lastName: string) {
  if (firstName && lastName) {
    return firstName.toUpperCase().charAt(0) + lastName.toUpperCase().charAt(0);
  } else {
    return "XX"
  }

}

export const getFutureDate = (date: Date, plusDays: number): string => {
  let newDate = new Date();
  newDate.setDate(date.getDate() + plusDays);
  return newDate.toISOString().split('T')[0];
}

export const getPastDate = (date: Date, minusDays: number): string => {
  let newDate = new Date();
  newDate.setDate(date.getDate() - minusDays);
  return newDate.toISOString().split('T')[0];
}

export const formatTimeHHMMSS = (date: Date) =>{
  const dd = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Ensures format is like "09:51:10"
  return dd;
}
   

export function formatToYYYYMMDD(date: Date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function formatToYYYYMMDDSlash(date: Date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export function convertTo12Hour(time24: string) {
  const [hour, minute, second] = time24.split(':');
  let hour12 = ((+hour % 12) || 12); // convert to 12-hour format
  const ampm = +hour < 12 ? 'AM' : 'PM';
  return `${hour12}:${minute} ${ampm}`;
}

export const formatTimeHHMMSS24Hours = (date: Date) => {
 return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
};

export function formatDateToMonthDay(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];

  // Add ordinal suffix to the day (1st, 2nd, 3rd, 4th, etc.)
  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

export const getPatientMedicationString = (patientMed: PatientMedication) => {
  return `${patientMed.formulation} ${patientMed.medication_name} ${patientMed?.dosage}${patientMed?.dosage_unit}, ${patientMed.frequency} 
  ${patientMed.medication_schedule} ${patientMed.time_phase} Food for ${!patientMed.days || patientMed.days.trim().length === 0 ? 0 : patientMed.days} days - ${patientMed.route}`
  
}


export const convertPatientMedicationResponseToPatientMedication = (resp:PatientMedicationResponse) => {

  const pr = new PatientMedication();
  pr.id = resp.id;
  pr.clinic_id = resp.clinicId;
  pr.patient_id = resp.patientId;
  pr.medication_id = resp.medicationId;
  pr.medication_name = resp.medicationName;
  pr.generic_name = resp.genericName;
  pr.prescribed_by_name = resp.prescribedByName;
  pr.dosage = resp.dosage;
  pr.frequency = resp.frequency;
  pr.start_date = resp.startDate;
  pr.end_date = resp.endDate;
  pr.instructions = resp.instructions;
  pr.dosage_unit = resp.dosageUnit;
  pr.formulation = resp.formulation;
  pr.route = resp.route;
  pr.time_phase = resp.timePhase;
  pr.medication_schedule = resp.medicationSchedule;
  pr.days = resp.days;
  pr.status = resp.status;
  pr.created_at = resp.createdAt;
  pr.updated_at = resp.updatedAt;
  return pr;

}

export const convertPatientMedicationToPatientMedicationResponse = (pm: PatientMedication,appointmentId: number, ): PatientMedicationResponse => {
  return {
    id: pm.id,
    clinicId: pm.clinic_id,
    patientId: pm.patient_id,
    medicationId: pm.medication_id,
    medicationName: pm.medication_name,
    genericName: pm.generic_name,
    prescribedByName: pm.prescribed_by_name,
    dosage: pm.dosage,
    frequency: pm.frequency,
    startDate: pm.start_date,
    endDate: pm.end_date,
    instructions: pm.instructions,
    dosageUnit: pm.dosage_unit,
    formulation: pm.formulation,
    route: pm.route,
    timePhase: pm.time_phase,
    medicationSchedule: pm.medication_schedule,
    days: pm.days,
    status: pm.status,
    createdAt: pm.created_at,
    updatedAt: pm.updated_at,
    appointmentId: appointmentId
  };
};


