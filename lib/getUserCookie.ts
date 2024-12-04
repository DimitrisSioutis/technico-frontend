import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getUserCookie = () => {
    const cookie = cookies().get("token")?.value;
    if (cookie) {
        try {
            const secretKey = "NAWHFWIZ7JjQeBvAMe27GWvatNqkKwRG";
            const decoded = jwt.verify(cookie, secretKey);
            const userId = decoded.sub;
            
            return { userId, decoded }; // Return the user ID and the decoded token
        } catch (error) {
            console.error('Token verification error:', error);
            return null;
        }
    }
    return null;
};
