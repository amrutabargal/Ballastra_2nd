import appleSignin from "apple-signin-auth";
import jwt from "jsonwebtoken";
import axios from "axios";

// Generate Apple Client Secret (for exchanging authorizationCode)
function generateAppleClientSecret() {
    const privateKey = `
-----BEGIN PRIVATE KEY-----
YOUR_APPLE_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----
`;

    return jwt.sign(
        {
            iss: "YOUR_TEAM_ID",           // TEAM ID from Apple Developer
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600, // valid for 1 hour
            aud: "https://appleid.apple.com",
            sub: "com.your.app",           // APP BUNDLE ID
        },
        privateKey,
        {
            algorithm: "ES256",
            keyid: "YOUR_KEY_ID",          // Apple key ID
        }
    );
}

export default {
    // STEP 1 → Verify id_token (mandatory)
    async verifyIdToken(idToken) {
        try {
            const data = await appleSignin.verifyIdToken(idToken, {
                audience: "com.your.app",  // <-- Your App's Bundle ID
            });
            return data;
        } catch (err) {
            console.error("APPLE TOKEN VERIFY ERROR:", err);
            throw new Error("Invalid Apple token");
        }
    },

    // STEP 2 → Exchange authorizationCode for real Apple token (optional)
    async exchangeAuthorizationCode(code) {
        try {
            const params = new URLSearchParams();
            params.append("client_id", "com.your.app"); // Bundle ID
            params.append("client_secret", generateAppleClientSecret());
            params.append("code", code);
            params.append("grant_type", "authorization_code");

            const response = await axios.post(
                "https://appleid.apple.com/auth/token",
                params
            );

            return response.data; // Contains accessToken, refreshToken, etc.
        } catch (err) {
            console.error("APPLE CODE EXCHANGE ERROR:", err);
            throw new Error("Authorization code exchange failed");
        }
    }
};
