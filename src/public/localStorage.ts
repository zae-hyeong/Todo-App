const tokenKey = 'loginToken'

export function saveToken(token: string) {

}

export function getToken() {
  return localStorage.getItem(tokenKey);
}