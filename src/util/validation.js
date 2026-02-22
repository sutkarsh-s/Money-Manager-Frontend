const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
    if (!email || !email.trim()) return false;
    return EMAIL_REGEX.test(email.trim());
};

export const validateRequired = (value, fieldName = "Field") => {
    if (!value || (typeof value === "string" && !value.trim())) {
        return `${fieldName} is required`;
    }
    return null;
};

export const validateMinLength = (value, min, fieldName = "Field") => {
    if (value && value.trim().length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }
    return null;
};

export const validateAmount = (amount) => {
    if (amount === null || amount === undefined || amount === "") {
        return "Amount is required";
    }
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
        return "Amount must be greater than zero";
    }
    return null;
};

export const validateDate = (date, { allowFuture = false } = {}) => {
    if (!date) return "Date is required";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";
    if (!allowFuture && d > new Date()) return "Date cannot be in the future";
    return null;
};

export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
};

export const validateForm = (validations) => {
    const errors = {};
    for (const [field, error] of Object.entries(validations)) {
        if (error) {
            errors[field] = error;
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
