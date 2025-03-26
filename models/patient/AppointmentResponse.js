class AppointmentResponse{
    constructor(id,clinicId,patientId,patientName,doctorId,doctorName,appointmentDate,startTime,endTime,
        status,appointmentType,reason,notes,createdAt,updatedAt){
         
            this.id = id;
            this.clinicId = clinicId;
            this.patientId = patientId;
            this.patientName = patientName;
            this.doctorId = doctorId;
            this.doctorName = doctorName;
            this.appointmentDate = appointmentDate;
            this.startTime = startTime;
            this.endTime = endTime;
            this.status = status;
            this.appointmentType = appointmentType;
            this.reason = reason;
            this.notes = notes;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }
}