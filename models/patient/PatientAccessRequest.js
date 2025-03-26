class PatientAccessRequest{
    constructor(clinicId,accessLevel="READ",endDate){
       this.clinicId = clinicId;
       this.accessLevel = accessLevel;
       this.endDate = endDate;
    }
}