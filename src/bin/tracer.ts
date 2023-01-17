// tracing.js
"use strict";
import { Logger } from "@log";

const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
process.env.OTEL_EXPORTER_OTLP_ENDPOINT = "host.docker.internal:4318";
// process.env.OTEL_RESOURCE_ATTRIBUTES = service.name = "node_app";
new Logger("TRACING", null, "tracing started");

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

sdk
  .start()
  .then(() => new Logger("TRACING", null, "open telemetry is running"))
  .catch((error) => new Logger("TRACING", null, "open telemetry failed"));

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => new Logger("TRACING", null, "open telemetry removed"))
    .catch((error) => new Logger("TRACING", error, "open telemetry error"))
    .finally(() => process.exit(0));
});
