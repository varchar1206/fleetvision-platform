import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(fs.readFileSync("amplify_outputs.json", "utf8"));
Amplify.configure(outputs);

const client = generateClient();

const today = new Date().toISOString().slice(0, 10);
const existing = await client.models.Load.list();

for (const load of existing.data.filter((item) => item.createdBy === "SEED")) {
  await client.models.Load.delete({ id: load.id });
}

const testLoads = [
  { storeNumber: "ETA001", storeName: "ETA On Time 1", dispatchWindow: "06:00", plannedTravelTime: "3h", commitmentTime: "10:00" },
  { storeNumber: "ETA002", storeName: "ETA On Time 2", dispatchWindow: "07:00", plannedTravelTime: "2h", commitmentTime: "10:30" },
  { storeNumber: "ETA003", storeName: "ETA At Risk 1", dispatchWindow: "08:00", plannedTravelTime: "2h", commitmentTime: "10:15" },
  { storeNumber: "ETA004", storeName: "ETA At Risk 2", dispatchWindow: "09:00", plannedTravelTime: "1h", commitmentTime: "10:20" },
  { storeNumber: "ETA005", storeName: "ETA Late 1", dispatchWindow: "10:00", plannedTravelTime: "2h", commitmentTime: "11:00" },
  { storeNumber: "ETA006", storeName: "ETA Late 2", dispatchWindow: "11:00", plannedTravelTime: "2h", commitmentTime: "12:00" },
];

for (const load of testLoads) {
  await client.models.Load.create({
    ...load,
    dispatchDate: today,
    activityType: "D/S",
    equipmentType: "Power Only",
    brokerName: "Beckers",
    carrierName: "Test Carrier",
    tripId: load.dispatchWindow,
    rate: 100,
    status: "DISPATCHED",
    bolStatus: "NOT_REQUIRED",
    createdBy: "SEED",
    notes: "ETA test seed load.",
  });
}

console.log(`Reset and created ${testLoads.length} ETA test loads for ${today}.`);
