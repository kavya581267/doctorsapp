class DoctorScheduleRequest{
    constructor(clinicId,dayOfWeek,startTime,endTime,consultationDuration,isAvailable=true){
        this.clinicId = clinicId;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.consultationDuration = consultationDuration;
        this.isAvailable = isAvailable;
    }
}