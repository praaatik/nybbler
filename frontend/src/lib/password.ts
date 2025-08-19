export type PasswordChecks = {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    symbol: boolean;
};

export const getPasswordStrength = (password: string) => {
    const checks: PasswordChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let label: "Weak" | "Medium" | "Strong";
    if (score < 2) label = "Weak";
    else if (score < 4) label = "Medium";
    else label = "Strong";

    return { checks, score, label };
};
