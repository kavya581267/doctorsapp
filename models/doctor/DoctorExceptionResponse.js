class DoctorExceptionResponse{
    constructor(id,clinicid,doctorId,exceptionDate,reason,isAvailable,alternateStartTime,alternateEndTime,createdAt,updatedAt,
        firstName,lastName,email,phone){
        
            this.id = id;
            this.clinicid = clinicid;
            this.doctorId = doctorId;
            this.exceptionDate = exceptionDate;
            this.reason = reason;
            this.isAvailable = isAvailable;
            this.alternateStartTime = alternateStartTime;
            this.alternateEndTime = alternateEndTime;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
    }
}