export interface BusinessCategoryRule {
  id: string;
  code: string;
  name: string;
  commodity: string;
  temperature: string;
  commitmentTime: string;
  defaultBolNotes?: string;
  specialInstructions?: string;
  isActive: boolean;
}
