class StaffRegistrationRequest{
    constructor(clinicId,firstName,lastName,email,password,dateOfBirth,gender,phone,
        role,specialties,licenseNumber,address,city,state,zipCode,country = "USA",emergencyContactName,emergencyContactPhone){
         
            this.clinicId = clinicId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.phone = phone;
            this.role = role;
            this.specialties = specialties;
            this.licenseNumber = licenseNumber;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zipCode = zipCode;
            this.country = country;
            this.emergencyContactName = emergencyContactName;
            this.emergencyContactPhone = emergencyContactPhone;
    }
}