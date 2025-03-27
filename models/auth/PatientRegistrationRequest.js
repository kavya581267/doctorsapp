export default class PatientRegistrationRequest{
     constructor(clinicId,firstName,lastName,email,dateOfBirth,gender,phone,bloodGroup,createUserAccount=false,password,address,city,state,zipCode,country = "USA",emergencyContactName,emergencyContactPhone){
        this.clinicId = clinicId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
        this.createUserAccount = createUserAccount;
        this.password = password;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
     }
}