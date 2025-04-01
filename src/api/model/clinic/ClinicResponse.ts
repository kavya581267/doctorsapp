export interface ClinicResponse {
    id: number;
    name: string;
    licenseNumber: string;
    taxId: string;
    isActive: boolean;
  
    // Address details
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  
    // Contact details
    email: string;
    phone: string;
    alternatePhone?: string;
  
    // Audit fields
    createdAt: string; // Using string since LocalDateTime is typically serialized as an ISO string
    updatedAt: string;
  }
  