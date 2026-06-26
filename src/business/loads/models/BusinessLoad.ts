import type { LoadLifecycleStatus } from "./LoadLifecycleStatus";

export interface BusinessLoad {
  id: string;
  tripId: string;

  loadDate: string;

  categoryId: string;
  categoryCode: string;
  categoryName: string;

  storeId: string;
  storeNumber: string;
  storeName: string;

  originWarehouseId: string;
  originWarehouseName: string;

  destinationName: string;
  destinationAddress: string;

  carrierId?: string;
  carrierName?: string;

  equipmentId?: string;
  equipmentType?: string;

  driverId?: string;
  driverName?: string;

  weightLbs?: number;
  temperature?: string;
  commitmentTime?: string;

  status: LoadLifecycleStatus;

  notes?: string;
  errors: string[];
  warnings: string[];

  createdAt: string;
  updatedAt: string;
}
