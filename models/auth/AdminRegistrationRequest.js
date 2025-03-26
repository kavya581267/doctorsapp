
class AdminRegistrationRequest{
    constructor(cognitoUserId,firstName,lastName,email,password,dateOfBirth,gender,phone,clinicName,clinicLicense,clinicAddress,clinicCity,clinicState,clinicZip,clinicCountry = "USA",clinicPhone,clinicEmail){
         this.cognitoUserId = cognitoUserId;
         this.firstName = firstName;
         this.lastName = lastName;
         this.email = email;
         this.password = password;
         this.dateOfBirth = dateOfBirth;
         this.gender = gender;
         this.phone = phone;
         this.clinicName = clinicName;
         this.clinicLicense = clinicLicense;
         this.clinicAddress = clinicAddress;
         this.clinicCity = clinicCity;
         this.clinicState = clinicState;
         this.clinicZip = clinicZip;
         this.clinicCountry = clinicCountry;
         this.clinicPhone = clinicPhone;
         this.clinicEmail = clinicEmail;
    }
}