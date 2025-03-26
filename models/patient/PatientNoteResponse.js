class PatientNoteResponse{
    constructor(id,clinicId,patientId,doctorId,doctorName,appointmentId,
        noteType,subjective,objective,assessment,plan,createdAt,updatedAt){
       
            this.id = id;
            this.clinicId = clinicId;
            this.patientId = patientId;
            this.doctorId = doctorId;
            this.doctorName = doctorName;
            this.appointmentId = appointmentId;
            this.noteType = noteType;
            this.subjective = subjective;
            this.objective = objective;
            this.assessment = assessment;
            this.plan = plan;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }
}