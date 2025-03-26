class DoctorExceptionRequest{
    constructor(clinicId,exceptionDate,reason,isAvailable = false,alternateStartTime,alternateEndTime){
       this.clinicId = clinicId;
       this.exceptionDate = exceptionDate;
       this.reason = reason;
       this.isAvailable = isAvailable;
       this.alternateStartTime = alternateStartTime;
       this.alternateEndTime = alternateEndTime;
    }
}