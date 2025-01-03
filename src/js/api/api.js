async function sendRequest(options = {}) {
  const {
    headers = {},
    data = {},
    responseType = "json",
    method = "GET",
  } = options;

  const URL = "http://localhost:9000/";
  const params = new URLSearchParams(data).toString();
  const fullURL =
    method === "GET" ? `${URL}?${params}` : `${URL}?method=${data.method}`;

  try {
    const response = await fetch(fullURL, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method === "GET" ? null : JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    if (responseType === "json") {
      return await response.json();
    } else if (responseType === "text") {
      return await response.text();
    } else if (responseType === "blob") {
      return await response.blob();
    } else {
      throw new Error("Неизвестный тип ответа");
    }
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
}

export default async function getAllTickets() {
  const response = await sendRequest({
    method: "GET",
    data: {
      method: "allTickets",
    },
    responseType: "json",
  });
  return response;
}

export async function getTicketDetails(id) {
  const response = await sendRequest({
    method: "GET",
    data: {
      method: "ticketById",
      id: id,
    },
    responseType: "text",
  });
  return response;
}

export async function createTicket(data) {
  const response = await sendRequest({
    method: "POST",
    data: {
      method: "createTicket",
      name: data.name,
      description: data.description,
    },
    responseType: "json",
  });
  return response;
}

export async function updateTicket(id, data) {
  const response = await sendRequest({
    method: "POST",
    data: {
      method: "editTicket",
      id: id,
      name: data.name,
      description: data.description,
      status: data.status,
    },
    responseType: "json",
  });
  return response;
}

export async function deleteTicket(id) {
  try {
    const response = await sendRequest({
      method: "POST",
      data: {
        method: "deleteTicket",
        id: id,
      },
      responseType: "json",
    });
    return response;
  } catch (error) { 
    console.error("Ошибка при удалении тикета:", error);
  }
}
