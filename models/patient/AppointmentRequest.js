class AppointmentRequest{
    constructor(clinicId,doctorId,appointmentDate,startTime,endTime,appointmentType,reason){
        this.clinicId = clinicId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.appointmentType = appointmentType;
        this.reason = reason;
    }
}