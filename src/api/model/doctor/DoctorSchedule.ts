import { DayOfWeek } from "../enums";

export class DoctorSchedule {
    clinicId: number;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    consultationDuration: number;
    isAvailable: boolean;
  }