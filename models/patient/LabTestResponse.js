class LabTestResponse{
    constructor(id,clinicId,patientId,testId,testName,testCategory,orderedByName,orderedAt,
        status,results,completedAt,notes,createdAt,updatedAt){
       
            this.id = id;
            this.clinicId = clinicId;
            this.patientId = patientId;
            this.testId = testId;
            this.testName = testName;
            this.testCategory = testCategory;
            this.orderedByName = orderedByName;
            this.orderedAt = orderedAt;
            this.status = status;
            this.results = results;
            this.completedAt = completedAt;
            this.notes = notes;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }
}