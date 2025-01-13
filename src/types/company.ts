export interface Company {
  id: number;
  companyName: string;
  representativeName: string;
  representativeContact: string;
  representativeEmail: string;
  address: string;
  businessType: "INDIVIDUAL" | "CORPORATION";
  businessRegistrationNumber: string;
  isActive: "Y" | "N";
}
