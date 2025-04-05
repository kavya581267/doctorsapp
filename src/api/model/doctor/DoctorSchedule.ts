import { DayOfWeek } from "../enums";

export class DoctorSchedule {
    clinicId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    consultationDuration: number;
    isAvailable: boolean;
  }