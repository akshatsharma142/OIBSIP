/* ==========================================
   HASHING MODULE
   SHA-256 using Web Crypto API
========================================== */

/**
 * Convert ArrayBuffer to Hex String
 */
function bufferToHex(buffer) {

    const bytes = new Uint8Array(buffer);

    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

}

/**
 * SHA-256 Hash Function
 */
async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return bufferToHex(hashBuffer);

}

/**
 * Compare Password with Stored Hash
 */
async function verifyPassword(
    plainPassword,
    storedHash
) {

    const hashedPassword =
        await hashPassword(plainPassword);

    return hashedPassword === storedHash;

}

/**
 * Generate Random User ID
 */
function generateUserId() {

    return (
        "USER-" +
        Date.now() +
        "-" +
        Math.floor(Math.random() * 1000)
    );

}

/**
 * Current Date & Time
 */
function getCurrentDateTime() {

    const now = new Date();

    return now.toLocaleString();

}