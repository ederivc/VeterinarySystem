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

  static async createUser(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/users/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async deleteUser({ user }) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch(`/users/deleteUser/${user.user_id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    const json = await response.json();
    return [json, response];
  }

  static async updateUser(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/users/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async updateUserAccount(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/users/updateUserAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
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
    return [json, response];
  }

  static async createCitaAdmin(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/citas/createCitaAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async getDates() {
    const response = await fetch("/citas/getDates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }

  static async updateCita(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/citas/updateCita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async deleteCita({ appointment }) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch(
      `/citas/deleteAppointment/${appointment.appointment_id}/`,
      {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      }
    );
    console.log(response);
    const json = await response.json();
    return [json, response];
  }

  static async deleteCitaNotification({ cita }) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/citas/deleteAppointmentNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(cita),
    });
    const json = await response.json();
    return [json, response];
  }

  static async ApproveCita(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/citas/approveCita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }
}

class APIProducts {
  static async createProduct(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/products/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async updateProduct(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/products/updateProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async deleteProduct({ product }) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch(
      `/products/deleteProduct/${product.product_id}/`,
      {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrfToken,
        },
      }
    );
    const json = await response.json();
    return [json, response];
  }
}

class APIAnimals {
  static async createAnimal(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/animals/createAnimal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }
}

class APIPedidos {
  static async createPedido(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/pedidos/createPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }

  static async updatePedido(data) {
    const csrfToken = getCookie("csrftoken");
    const response = await fetch("/pedidos/updatePedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return [json, response];
  }
}

const IMG_URL = "http://localhost:5000/static/img/products/";
const IMG_HOME_URL = "http://localhost:5000/static/img/homeProducts/";

export {
  APIUsers,
  APICitas,
  APIProducts,
  APIAnimals,
  APIPedidos,
  IMG_URL,
  IMG_HOME_URL,
};
