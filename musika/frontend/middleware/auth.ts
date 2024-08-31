"use client";
import Cookies from 'js-cookie';


export const verifyToken = async () => {
    const token = Cookies.get('token');

    if (!token) {
        return false; // No token, user is not logged in
    }

    try {
        const response = await fetch('http://localhost:8000/auth/verify-token/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

        const details = response;

        Cookies.set('code', details.code);

        return true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false; // On error, consider the token invalid
    }
};