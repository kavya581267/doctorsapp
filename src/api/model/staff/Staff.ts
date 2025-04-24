export interface Staff {
    id: number;
    clinicId: number;
    userId: number;
    roleName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    startDate: string;
    endDate: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  