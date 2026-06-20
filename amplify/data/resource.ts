import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Load: a
    .model({
      storeNumber: a.string().required(),
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
