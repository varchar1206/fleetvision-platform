import type { BusinessLocation } from "../models/BusinessLocation";

const locations: BusinessLocation[] = [
  {
    id: "store-47",
    storeNumber: "47",
    storeName: "Columbia",
    address: "100 Demo Way",
    city: "Columbia",
    state: "MD",
    zip: "21044",
    isActive: true,
  },
  {
    id: "store-54",
    storeNumber: "54",
    storeName: "Frederick",
    address: "200 Demo Pike",
    city: "Frederick",
    state: "MD",
    zip: "21701",
    isActive: true,
  },
  {
    id: "store-95",
    storeNumber: "95",
    storeName: "Amherst",
    address: "300 Demo Road",
    city: "Amherst",
    state: "NY",
    zip: "14226",
    isActive: true,
  },
];

export function listActiveLocations(): BusinessLocation[] {
  return locations.filter((location) => location.isActive);
}

export function getLocationById(id: string): BusinessLocation | undefined {
  return locations.find((location) => location.id === id);
}
