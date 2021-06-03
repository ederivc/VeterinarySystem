function getCookie(name) {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

class APIUsers {
  static async login(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

class APICitas {
  static async createCita(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/citas/createCita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    // console.log(json);
    // console.log(response);
    return [json, response];
  }

  static async getDates(setDates, setHasLoaded) {
    const response = await fetch("/citas/getDates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setDates(json);
    setHasLoaded(true);
  }
}

export { APIUsers, APICitas };
