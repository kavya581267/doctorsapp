class VitalsResponse{
    constructor(id,clinicId,patientId,appointmentId,recordedByName,temperature,bloodPressureSystolic,bloodPressureDiastolic,
        heartRate,respiratoryRate,oxygenSaturation,height,weight,bmi,recordedAt,createdAt,updatedAt
    ){
    
        this.id = id;
        this.clinicId = clinicId;
        this.patientId = patientId;
        this.appointmentId = appointmentId;
        this.recordedByName = recordedByName;
        this.temperature = temperature;
        this.bloodPressureSystolic = bloodPressureSystolic;
        this.bloodPressureDiastolic = bloodPressureDiastolic;
        this.heartRate = heartRate;
        this.respiratoryRate = respiratoryRate;
        this.oxygenSaturation = oxygenSaturation;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.recordedAt = recordedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}