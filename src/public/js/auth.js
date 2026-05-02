const Auth = (() => {
    const TOKEN_KEY = 'jwt_token';
    const USER_KEY  = 'jwt_user';

    const save    = (token, user) => {
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(USER_KEY,  JSON.stringify(user));
    };
    const getToken = () => sessionStorage.getItem(TOKEN_KEY);
    const getUser  = () => { try { return JSON.parse(sessionStorage.getItem(USER_KEY)); } catch { return null; } };
    const clear    = () => { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(USER_KEY); };

    const decodeToken = (token) => {
        try { return JSON.parse(atob(token.split('.')[1])); } catch { return null; }
    };
    const isExpired = (token) => {
        const p = decodeToken(token);
        return !p || !p.exp || Date.now() >= p.exp * 1000;
    };

    const requireAuth = () => {
        const token = getToken();
        if (!token || isExpired(token)) { clear(); window.location.href = '/signIn'; return false; }
        return true;
    };
    const requireRole = (role) => {
        if (!requireAuth()) return false;
        const user = getUser();
        if (!user?.roles?.includes(role)) { window.location.href = '/403'; return false; }
        return true;
    };

    const apiFetch = async (url, opts = {}) => {
        const token = getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(opts.headers || {}),
        };
        const res = await fetch(url, { ...opts, headers });
        if (res.status === 401) { clear(); window.location.href = '/signIn'; return null; }
        return res;
    };

    const signOut = () => { clear(); window.location.href = '/signIn'; };

    return { save, getToken, getUser, decodeToken, isExpired, requireAuth, requireRole, apiFetch, signOut };
})();
