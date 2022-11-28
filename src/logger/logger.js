import winston from "winston";
const { format, createLogger, transports } = winston;
const { timestamp, combine, printf, errors } = format;
function devLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level.toUpperCase().padEnd(5)} - ${stack || message}`;
  });
  return createLogger({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}
export default devLogger;
