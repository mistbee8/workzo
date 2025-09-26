const getTokenFromCookies = () => {
  const name = "access_token=";
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookies.split(";");

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const isAuthenticated = () => {
  let token = localStorage.getItem("access_token");

  if (!token) {
    token = getTokenFromCookies();
  }

  if (!token) {
    return false;
  }

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }


    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
