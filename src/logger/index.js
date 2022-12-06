import { prodLogger, devLogger } from "./logger";

let logger = null;

if (process.env.NODE_ENV === "development") logger = devLogger();
else logger = prodLogger();

export default logger;
