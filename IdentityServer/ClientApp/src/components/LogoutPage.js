import React, { useEffect } from 'react';


const logout = async () => {
    const query = window.location.search;
    const logoutIdQuery = query && query.toLowerCase().indexOf('?logoutid=') === 0 && query;
    const response = await fetch(`/api/authentication/logout${logoutIdQuery}`, {
        credentials: 'include'
    });
    const data = await response.json();
    window.location = data.postLogoutRedirectUri;
};
    
export const LogoutPage = () => {
    useEffect(() => {
        logout();
    }, []);

    return ( <div> You successfully logged out </div> )
};