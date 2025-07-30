interface SanitizationConfig {
    maxLength?: number;
    allowedChars?: RegExp;
    strictMode?: boolean;
}

export function sanitizeInput(
    input: string,
    config: SanitizationConfig = { strictMode: false }
): { sanitized: string; wasFiltered: boolean } {

    let sanitized = input;
    let wasFiltered = false;

    // Enhanced dangerous patterns for prompt injection
    const dangerousPatterns = [
        // Instruction manipulation
        /ignore\s+(previous|above|prior|all)\s+(instructions?|prompts?)/gi,
        /forget\s+(everything|all|previous)/gi,
        /you\s+are\s+now\s+/gi,
        /from\s+now\s+on/gi,
        /new\s+instructions?/gi,
        /override\s+instructions?/gi,
        /disregard\s+(previous|above|all)/gi,

        // Role manipulation
        /you\s+are\s+(a|an)\s+/gi,
        /act\s+as\s+(a|an)\s+/gi,
        /pretend\s+to\s+be/gi,
        /roleplay\s+as/gi,
        /assume\s+the\s+role/gi,

        // System prompt indicators
        /system\s*:\s*/gi,
        /assistant\s*:\s*/gi,
        /user\s*:\s*/gi,
        /human\s*:\s*/gi,

        // Common AI model delimiters
        /\[INST\]/gi,
        /\[\/INST\]/gi,
        /\<\|system\|\>/gi,
        /\<\|user\|\>/gi,
        /\<\|assistant\|\>/gi,
        /\<\|end\|\>/gi,

        // Jailbreaking attempts
        /do\s+anything\s+now/gi,
        /dan\s+mode/gi,
        /developer\s+mode/gi,
        /evil\s+mode/gi,
        /unrestricted/gi,

        // Output manipulation
        /print\s+/gi,
        /output\s+/gi,
        /generate\s+code/gi,
        /execute\s+/gi,
        /run\s+code/gi,

        // Educational content specific
        /create\s+harmful/gi,
        /inappropriate\s+questions?/gi,
        /offensive\s+content/gi,
    ];

    // Apply pattern filtering
    dangerousPatterns.forEach(pattern => {
        if (pattern.test(sanitized)) {
            sanitized = sanitized.replace(pattern, '[FILTERED]');
            wasFiltered = true;
        }
    });

    // Remove excessive whitespace and special characters
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    // Remove HTML/XML-like tags if in strict mode
    if (config.strictMode) {
        sanitized = sanitized.replace(/<[^>]*>/g, '[TAG_FILTERED]');
        if (/<[^>]*>/.test(input)) wasFiltered = true;
    }

    // Filter allowed characters (educational content typically needs alphanumeric + basic punctuation)
    if (config.allowedChars) {
        const filtered = sanitized.replace(config.allowedChars, '');
        if (filtered.length !== sanitized.length) {
            wasFiltered = true;
        }
        sanitized = sanitized.replace(config.allowedChars, '');
    }

    // Limit input length
    if (config.maxLength && sanitized.length > config.maxLength) {
        sanitized = sanitized.slice(0, config.maxLength);
        wasFiltered = true;
    }

    return { sanitized, wasFiltered };
}

// Validate educational topic input specifically
export function validateEducationalTopic(topic: string): { isValid: boolean; reason?: string } {
    // Check minimum length
    if (topic.length < 2) {
        return { isValid: false, reason: 'Topic too short' };
    }

    // Check for educational appropriateness
    const inappropriateTerms = [
        /violence/gi,
        /harmful/gi,
        /illegal/gi,
        /adult\s+content/gi,
    ];

    for (const term of inappropriateTerms) {
        if (term.test(topic)) {
            return { isValid: false, reason: 'Inappropriate educational content' };
        }
    }

    return { isValid: true };
}