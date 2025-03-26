class AllergyResponse{
    constructor(id,clinicId,patientId,allergyId,allergyName,allergyCategory,severity,
        reaction,notedByName,notedAt,createdAt,updatedAt){
        
            this.id = id;
            this.clinicId = clinicId;
            this.patientId = patientId;
            this.allergyId = allergyId;
            this.allergyName = allergyName;
            this.allergyCategory = allergyCategory;
            this.severity = severity;
            this.reaction = reaction;
            this.notedByName = notedByName;
            this.notedAt = notedAt;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }
}