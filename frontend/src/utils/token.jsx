const TOKEN_KEY = 'auth_token';

export const storeToken = (token, expiryInMs = 24 * 60 * 60 * 1000) => {
    const item = {
        token: token,
        expiry: Date.now() + expiryInMs,

    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(item));
};

export const getToken = () => {
    const itemStr = localStorage.getItem(TOKEN_KEY);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    try {
        if (Date.now() > item.expiry) {
            localStorage.removeItem(TOKEN_KEY);
            return null
        }
        return item.token;
    } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
    }

};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

