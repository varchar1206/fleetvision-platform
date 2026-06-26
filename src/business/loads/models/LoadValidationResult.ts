export interface LoadValidationResult {
  loadId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
