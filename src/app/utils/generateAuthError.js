export function generateAuthError(message) {
    switch (message) {
    case "EMAIL_EXISTS":
        return "User with this email already exists";
    case "INVALID_PASSWORD":
        return "Invalid email or password";
    case "EMAIL_NOT_FOUND":
        return "Invalid email or password";
    default: return "Too many login attempts. Try it later...";
    }
}
