import { DayOfWeek } from "../enums";

export class DoctorScheduleResponse {
    id: string;
    clinicId: string;
    doctorId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    consultationDuration: number;
    isAvailable: boolean;
    createdAt: string; // or Date if using Date objects
    updatedAt: string; // or Date
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }