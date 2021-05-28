// function getCookie(name) {
//   let cookieValue = "";
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

class APIUsers {
  static async createUser(data) {
    // const csrfToken = getCookie("csrftoken");
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}

export { APIUsers };
