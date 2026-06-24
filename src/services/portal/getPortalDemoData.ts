import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export type PortalType = "SHIPPER" | "BROKER" | "CARRIER" | "DRIVER";

export async function getDemoOrganizationByType(type: PortalType) {
  const result = await client.models.Organization.list();

  return (
    result.data.find(
      (org) => org.organizationType === type && org.source === "DEMO"
    ) ?? result.data.find((org) => org.organizationType === type) ?? null
  );
}

export async function getDemoUserProfileForOrganization(organizationId?: string) {
  if (!organizationId) return null;

  const result = await client.models.UserProfile.list();

  return (
    result.data.find((profile) => profile.organizationId === organizationId) ??
    null
  );
}

export async function getRelationshipsForOrganization(organizationId?: string) {
  if (!organizationId) return [];

  const result = await client.models.BusinessRelationship.list();

  return result.data.filter(
    (relationship) =>
      relationship.parentOrganizationId === organizationId ||
      relationship.childOrganizationId === organizationId
  );
}

export async function getDriversForCarrier(organizationId?: string) {
  if (!organizationId) return [];

  const result = await client.models.DriverProfile.list();

  return result.data.filter(
    (driver) => driver.carrierOrganizationId === organizationId
  );
}

export async function getDocumentsForOrganization(organizationId?: string) {
  if (!organizationId) return [];

  const result = await client.models.DocumentRecord.list();

  return result.data.filter(
    (document) => document.organizationId === organizationId
  );
}
