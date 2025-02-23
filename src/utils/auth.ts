import Cookies from "js-cookie";

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, { expires: 7 });
  Cookies.set("refreshToken", refreshToken, { expires: 30 });
};

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.reload();
};

export const setAdminTokens = (accessToken: string) => {
  Cookies.set("adminAccessToken", accessToken, { expires: 7 });
};

export const adminToken = (token: string) => {
  Cookies.set("adminAccessToken", token, { expires: 7 });
};

export const getAdminToken = () => Cookies.get("adminAccessToken");
export const adminLogout = () => {
  Cookies.remove("adminAccessToken");
  window.location.reload();
};
