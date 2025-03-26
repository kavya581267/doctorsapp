class PatientResponse{
    constructor(id,clinicId,mrn,firstName,lastName,dateOfBirth,gender,bloodGroup,email,phone,alternatePhone,
        addressLine1,addressLine2,city,state,postalCode,country,emergencyContactName,emergencyContactPhone,
        isActive,createdAt,updatedAt
    ){
       
        this.id = id;
        this.clinicId = clinicId;
        this.mrn = mrn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.email = email;
        this.phone = phone;
        this.alternatePhone = alternatePhone;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}