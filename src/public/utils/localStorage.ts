const tokenKey = "loginToken";

export function saveToken(token: string) {
  try {
    localStorage.setItem(tokenKey, token);
  } catch (error) {
    console.error(error);
  }
}

export function getToken() {
  const token = "";
  try {
    localStorage.getItem(tokenKey);
  } catch (error) {
    console.error(error);
    return;
  }
  return token;
}

export function removeToken(tokenKey: string) {
  localStorage.removeItem(tokenKey);
}
