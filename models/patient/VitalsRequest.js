class VitalsRequest{
    constructor(clinicId,appointmentId,temperature,bloodPressureSystolic,bloodPressureDiastolic,heartRate,respiratoryRate,
        oxygenSaturation,height,weight,bmi
    ){
 
        this.clinicId = clinicId;
        this.appointmentId = appointmentId;
        this.temperature = temperature;
        this.bloodPressureSystolic = bloodPressureSystolic;
        this.bloodPressureDiastolic = bloodPressureDiastolic;
        this.heartRate = heartRate;
        this.respiratoryRate = respiratoryRate;
        this.oxygenSaturation = oxygenSaturation;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
    }
}