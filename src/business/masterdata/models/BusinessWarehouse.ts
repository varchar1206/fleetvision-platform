export interface BusinessWarehouse {
  id: string;
  code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  isActive: boolean;
}
