import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Load: a
    .model({
      storeNumber: a.string().required(),
      storeName: a.string(),
      commitmentTime: a.string(),
      plannedTravelTime: a.string(),
      etaStartTime: a.string(),
      etaStartSource: a.string(),
      estimatedArrivalTime: a.string(),
      etaStatus: a.string(),
      dispatchDate: a.string().required(),
      dispatchWindow: a.string().required(),
      activityType: a.string().required(),
      equipmentType: a.string(),
      brokerName: a.string(),
      carrierName: a.string(),
      tripId: a.string(),
      rate: a.float(),
      status: a.string().required(),
      bolStatus: a.string(),
      createdBy: a.string(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  DispatchWindow: a
    .model({
      dispatchDate: a.string().required(),
      dispatchTime: a.string().required(),
      brokerName: a.string(),
      loadCount: a.integer(),
      status: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Trip: a
    .model({
      tripId: a.string().required(),
      loadId: a.string().required(),
      carrierName: a.string(),
      driverName: a.string(),
      trailerNumber: a.string(),
      doorNumber: a.string(),
      status: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  LoadEvent: a
    .model({
      loadId: a.string().required(),
      eventType: a.string().required(),
      eventTime: a.string().required(),
      eventSource: a.string(),
      userId: a.string(),
      notes: a.string(),
      delayPhase: a.string(),
      delayReason: a.string(),
      delayMinutes: a.integer(),
      updatedEta: a.string(),
      dockNumber: a.string(),
      trailerNumber: a.string(),
      latitude: a.float(),
      longitude: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Notification: a
    .model({
      loadId: a.string(),
      eventType: a.string().required(),
      audience: a.string().required(),
      title: a.string().required(),
      message: a.string().required(),
      channel: a.string().required(),
      status: a.string().required(),
      createdAt: a.string().required(),
      readAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  CommunicationLog: a
    .model({
      loadId: a.string(),
      direction: a.string().required(),
      channel: a.string().required(),
      recipientName: a.string(),
      recipientContact: a.string(),
      subject: a.string(),
      message: a.string().required(),
      status: a.string().required(),
      provider: a.string(),
      providerMessageId: a.string(),
      relatedEventType: a.string(),
      receivedAt: a.string(),
      sentAt: a.string(),
      createdAt: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  LoadException: a
    .model({
      loadId: a.string().required(),
      exceptionType: a.string().required(),
      priority: a.string().required(),
      status: a.string().required(),
      delayPhase: a.string(),
      etaImpactMinutes: a.integer(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Broker: a
    .model({
      brokerName: a.string().required(),
      contactName: a.string(),
      email: a.string(),
      status: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Carrier: a
    .model({
      carrierName: a.string().required(),
      mcNumber: a.string(),
      dotNumber: a.string(),
      status: a.string(),
      trackingParticipationRate: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Driver: a
    .model({
      carrierId: a.string().required(),
      driverName: a.string().required(),
      phoneNumber: a.string(),
      status: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  DriverLocation: a
    .model({
      loadId: a.string().required(),
      driverName: a.string(),
      carrierName: a.string(),
      latitude: a.float().required(),
      longitude: a.float().required(),
      recordedAt: a.string().required(),
      source: a.string(),
      locationMethod: a.string(),
      accuracyMeters: a.float(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Organization: a
    .model({
      organizationType: a.string().required(),
      companyName: a.string().required(),
      displayName: a.string(),
      dotNumber: a.string(),
      mcNumber: a.string(),
      contactName: a.string(),
      email: a.string(),
      phone: a.string(),
      streetAddress: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      status: a.string().required(),
      verifiedStatus: a.string(),
      source: a.string(),
      logoImageKey: a.string(),
      createdAt: a.string().required(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  OrganizationRole: a
    .model({
      organizationId: a.string().required(),
      roleType: a.string().required(),
      status: a.string().required(),
      createdAt: a.string().required(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  UserProfile: a
    .model({
      cognitoUserId: a.string(),
      organizationId: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      email: a.string().required(),
      phone: a.string(),
      role: a.string().required(),
      status: a.string().required(),
      avatarImageKey: a.string(),
      createdAt: a.string().required(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  BusinessRelationship: a
    .model({
      parentOrganizationId: a.string().required(),
      childOrganizationId: a.string().required(),
      relationshipType: a.string().required(),
      status: a.string().required(),
      preferredPartner: a.boolean(),
      notes: a.string(),
      createdAt: a.string().required(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  DriverProfile: a
    .model({
      carrierOrganizationId: a.string().required(),
      userProfileId: a.string(),
      driverName: a.string().required(),
      phone: a.string(),
      email: a.string(),
      licenseNumber: a.string(),
      status: a.string().required(),
      avatarImageKey: a.string(),
      createdAt: a.string().required(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Invitation: a
    .model({
      invitedByOrganizationId: a.string().required(),
      invitedOrganizationId: a.string(),
      invitedEmail: a.string().required(),
      invitedRole: a.string().required(),
      relationshipType: a.string(),
      status: a.string().required(),
      inviteToken: a.string(),
      expiresAt: a.string(),
      createdAt: a.string().required(),
      acceptedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  DocumentRecord: a
    .model({
      organizationId: a.string(),
      loadId: a.string(),
      uploadedByUserProfileId: a.string(),
      documentType: a.string().required(),
      fileName: a.string().required(),
      fileKey: a.string().required(),
      fileMimeType: a.string(),
      fileSizeBytes: a.integer(),
      visibility: a.string(),
      status: a.string().required(),
      retentionCategory: a.string(),
      expiresAt: a.string(),
      createdAt: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Location: a
    .model({
      locationName: a.string().required(),
      storeNumber: a.string().required(),
      trailerSize: a.string(),
      streetAddress: a.string(),
      city: a.string(),
      state: a.string(),
      zipCode: a.string(),
      county: a.string(),
      commitmentTime: a.string(),
      oneWayTravelTime: a.string(),

      latitude: a.float(),
      longitude: a.float(),
      geofenceRadiusFeet: a.integer(),

      locationType: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
