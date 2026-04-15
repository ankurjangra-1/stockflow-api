const statusMessages = {
  401: "Your session has expired. Please log in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "This request conflicts with existing data.",
};

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error?.response) {
    return "Unable to reach the backend. Please make sure StockFlow API is running on http://localhost:8080.";
  }

  const response = error?.response;
  const status = response?.status;
  const data = response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (statusMessages[status]) {
    return statusMessages[status];
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
}
