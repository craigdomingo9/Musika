"use client";
import Cookies from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


export const verifyToken = async (router: AppRouterInstance) => {
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

        if(response.account_type == "business"){
            Cookies.remove("location_is_setup");
            Cookies.set("business_code",details.code, { expires: 7 });
            console.log(details.code);
            router.push(`/b/${details.code}/admin?page=home`);
        }else{
            Cookies.remove("business_code");
            Cookies.remove("business_email");
            Cookies.remove("location_is_setup");
            router.push(`/`);
        }

        

        return true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false; // On error, consider the token invalid
    }
};