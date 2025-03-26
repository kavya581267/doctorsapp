class DoctorScheduleResponse{
    constructor(id,clinicId,doctorId,dayOfWeek,startTime,endTime,consultationDuration,isAvailable,createdAt,updatedAt,
        firstName,lastName,email,phone){
        
            this.id = id;
            this.clinicId = clinicId;
            this.doctorId = doctorId;
            this.dayOfWeek = dayOfWeek;
            this.startTime = startTime;
            this.endTime = endTime;
            this.consultationDuration = consultationDuration;
            this.isAvailable = isAvailable;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
    }
}