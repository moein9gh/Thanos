// tracing.js
"use strict";
import { Logger } from "@log";
import { DI } from "@DI";
import { TYPES } from "@types";
import { PREFIXES } from "@log";

const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "host.docker.internal:4318";

const logger = DI.get<Logger>(TYPES.Logger);
logger.print(PREFIXES.TRACING, null, "tracing started");

const exporterOptions = {
  url: "http://host.docker.internal:4318/v1/traces"
};
const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "node_app"
  })
});
// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
logger.print(PREFIXES.TRACING, null, "open telemetry failed");
sdk
  .start()
  .then(() => logger.print(PREFIXES.TRACING, null, "open telemetry is running"))
  .catch((error) =>
    logger.print(PREFIXES.TRACING, error, "open telemetry failed " + error.message)
  );

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => logger.print(PREFIXES.TRACING, null, "open telemetry removed"))
    .catch((error) => logger.print(PREFIXES.TRACING, error, "open telemetry error"))
    .finally(() => process.exit(0));
});
