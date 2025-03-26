class PatientNoteRequest{
    constructor(clinicId,doctorId,appointmentId,noteType,subjective,objective,assessment,plan){
        this.clinicId = clinicId;
        this.doctorId = doctorId;
        this.appointmentId = appointmentId;
        this.noteType = noteType;
        this.subjective = subjective;
        this.objective = objective;
        this.assessment = assessment;
        this.plan = plan;
    }
}