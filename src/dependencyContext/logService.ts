import { LogService } from "./types";

// Application dependencies (services).
export let logService: LogService;

// Configure service implementation(s).
if (process.env.NODE_ENV === "development") {
  logService = (message) => console.log(`LOG: ${message}`);
} else {
  // Instantiate proper logging service for use in e.g. production environment.
  logService = () => {};
}
