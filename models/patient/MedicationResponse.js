class MedicationResponse{
    constructor(id,clinicId,patientId,medicationId,medicationName,genericName,prescribedByName,dosage,frequency,
        startDate,endDate,instructions,status,createdAt,){
       
            this.id = id;
            this.clinicId = clinicId;
            this.patientId = patientId;
            this.medicationId = medicationId;
            this.medicationName = medicationName;
            this.genericName = genericName;
            this.prescribedByName = prescribedByName;
            this.dosage = dosage;
            this.frequency = frequency;
            this.startDate = startDate;
            this.endDate = endDate;
            this.instructions = instructions;
            this.status = status;
            this.createdAt = createdAt;
    }
}