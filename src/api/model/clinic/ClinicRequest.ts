export class ClinicRequest {
    clinicName: string= "";
    clinicLicense: string="";
    taxId?: string;
  
    // Address fields
    address: string="";
    city: string="";
    state: string="";
    zipCode: string="";
    country: string = "USA";
  
    // Contact fields
    phone: string="";
    email: string="";
    alternatePhone?: string;

  }
  