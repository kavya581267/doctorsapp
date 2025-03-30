export class ClinicRequest {
    clinicName: string;
    clinicLicense: string;
    taxId?: string;
  
    // Address fields
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string = "USA";
  
    // Contact fields
    phone: string;
    email: string;
    alternatePhone?: string;
  
    constructor(
      clinicName: string,
      clinicLicense: string,
      address: string,
      city: string,
      state: string,
      zipCode: string,
      phone: string,
      email: string,
      taxId?: string,
      alternatePhone?: string
    ) {
      this.clinicName = clinicName;
      this.clinicLicense = clinicLicense;
      this.address = address;
      this.city = city;
      this.state = state;
      this.zipCode = zipCode;
      this.phone = phone;
      this.email = email;
      this.taxId = taxId;
      this.alternatePhone = alternatePhone;
    }
  }
  