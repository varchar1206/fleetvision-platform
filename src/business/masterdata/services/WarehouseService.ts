import type { BusinessWarehouse } from "../models/BusinessWarehouse";

const warehouses: BusinessWarehouse[] = [
  {
    id: "warehouse-va",
    code: "VA-SC",
    name: "Virginia Service Center",
    address: "1 Distribution Drive",
    city: "Ashland",
    state: "VA",
    zip: "23005",
    isActive: true,
  },
];

export function listActiveWarehouses(): BusinessWarehouse[] {
  return warehouses.filter((warehouse) => warehouse.isActive);
}

export function getWarehouseById(id: string): BusinessWarehouse | undefined {
  return warehouses.find((warehouse) => warehouse.id === id);
}
