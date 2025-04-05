export class DoctorExceptionRequest {
    clinicId: string;
    exceptionDate: Date; // Using Date object
    reason: string;
    isAvailable: boolean;
    alternateStartTime?: string; // Optional time in HH:mm format
    alternateEndTime?: string;
  }