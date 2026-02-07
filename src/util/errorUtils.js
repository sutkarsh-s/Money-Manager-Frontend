/**
 * Extracts a user-friendly error message from an API error response.
 * Handles both JSON { message: "..." } and plain string responses.
 *
 * @param {Error} error - The error from axios or fetch
 * @returns {string} - User-friendly error message
 */
export function getErrorMessage(error) {
    if (!error) return "Something went wrong. Please try again.";

    const data = error.response?.data;

    if (data) {
        if (typeof data === "string") return data;
        if (data.message) return data.message;
        if (data.error) return data.error;
    }

    if (error.response?.status === 401) return "Session expired. Please log in again.";
    if (error.response?.status === 403) return "Access denied.";
    if (error.response?.status === 404) return "Resource not found.";
    if (error.response?.status === 500) return "Server error. Please try again later.";
    if (error.response?.status >= 500) return "Service temporarily unavailable. Please try again later.";
    if (error.code === "ECONNABORTED") return "Request timed out. Please try again.";
    if (error.code === "ERR_NETWORK") return "Network error. Please check your connection.";

    return error.message || "Something went wrong. Please try again.";
}
