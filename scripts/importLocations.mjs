import fs from "fs";
import XLSX from "xlsx";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(fs.readFileSync("amplify_outputs.json", "utf8"));

Amplify.configure(outputs);

const client = generateClient();

const workbook = XLSX.readFile("data/Store Numbers 2.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

let created = 0;

for (const row of rows) {
  const storeNumber = String(row["Store Number "] ?? "").trim();

  if (!storeNumber) continue;

  await client.models.Location.create({
    locationName: String(row["Location"] ?? "").trim(),
    storeNumber,
    trailerSize: String(row["Trailer Size"] ?? "").trim(),
    streetAddress: String(row["Street Address"] ?? "").trim(),
    city: String(row["City"] ?? "").trim(),
    state: String(row["State"] ?? "").trim(),
    zipCode: String(row["Zip Code"] ?? "").trim(),
    county: String(row["County"] ?? "").trim(),
    commitmentTime: String(row["Commitment time"] ?? "").trim(),
    oneWayTravelTime: String(row["Oneway travel time"] ?? "").trim(),
    geofenceRadiusFeet: 500,
    locationType: "STORE",
  });

  created += 1;
}

console.log(`Imported ${created} locations.`);
