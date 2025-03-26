class PatientUpdateRequest{
    constructor(bloodGroup,email,phone,alternatePhone,addressLine1,addressLine2,city,state,postalCode,country,
        emergencyContactName,emergencyContactPhone){
     
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
    }
}