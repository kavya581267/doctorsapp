class PatientAccessResponse{
    constructor(id,patientId,clinicId,clinicName,grantedByName,accessLevel,status,startDate,endDate,createdAt,updatedAt){
        this.id = id;
        this.patientId = patientId;
        this.clinicId = clinicId;
        this.clinicName = clinicName;
        this.grantedByName = grantedByName;
        this.accessLevel = accessLevel;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}