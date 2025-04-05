export class DoctorExceptionResponse {
    id: string;
    clinicId: string;
    doctorId: string;
    exceptionDate: Date;
    reason: string;
    isAvailable: boolean;
    alternateStartTime?: string;
    alternateEndTime?: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}