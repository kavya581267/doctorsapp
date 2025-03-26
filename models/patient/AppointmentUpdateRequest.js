class AppointmentUpdateRequest{
    constructor(appointmentDate,startTime,endTime,appointmentType,status,reason,notes){
       this.appointmentDate = appointmentDate;
       this.startTime = startTime;
       this.endTime = endTime;
       this.appointmentType = appointmentType;
       this.status = status;
       this.reason = reason;
       this.notes = notes;
    }
}