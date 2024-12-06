const log4js = require("log4js");

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

log4js.addLayout("custom", (config) => (logEvent) => {
  const formattedDate = formatDate(new Date(logEvent.startTime));
  return `${formattedDate} ${logEvent.level.levelStr}: ${logEvent.data.join(
    " "
  )} | request #${logEvent.context.requestNumber}`;
});

log4js.configure({
  appenders: {
    requests: {
      type: "file",
      filename: "logs/requests.log",
      layout: { type: "custom" },
    },
    books: {
      type: "file",
      filename: "logs/books.log",
      layout: { type: "custom" },
    },
    console: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%d %p: %m",
      },
    },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
    "request-logger": { appenders: ["requests", "console"], level: "info" },
    "books-logger": { appenders: ["books"], level: "info" },
  },
});

module.exports = log4js;
