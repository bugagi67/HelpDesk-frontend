import { createTicket, deleteTicket, updateTicket } from "../api/api";
import { shortTicketHtml } from "./ticket";
import { closeModalAddTicket } from "./modals";

export default async function renderTicketList(tickets) {
  const ticketList = document.querySelector(".ticket-list");

  await tickets.forEach((element) => {
    const ticket = shortTicketHtml(
      element.name,
      element.created,
      element.description,
      element.id,
    );
    ticketList.appendChild(ticket);
  });
}

export function clearTicketList() {
  const ticketList = document.querySelectorAll(".ticket");
  ticketList.forEach(element => {
    element.remove();
  })  
}

export async function addTicket() {
  const ticketList = document.querySelector(".ticket-list");
  const inputShortDescription = document.querySelector(".shortDescription");
  const inputDetailDescription = document.querySelector(".detailedDescription");

  if (!inputShortDescription.value) {
    console.error("Форма не заполнена");
    return;
  }

  const data = {
    method: "createTicket",
    name: inputShortDescription.value.trim(),
    description: inputDetailDescription.value.trim(),
  };

  try {
    const response = await createTicket(data);

    if (!response) {
      console.error("Некорректный ответ от сервера");
      return;
    }

    const newTicket = response.find(
      (ticket) =>
        ticket.name === data.name && ticket.description === data.description,
    );
    if (!newTicket) {
      console.error("Тикет не найден в ответе сервера");
      return;
    }

    const ticketElement = shortTicketHtml(
      newTicket.name,
      newTicket.created,
      newTicket.description,
      newTicket.id,
    );
    ticketList.appendChild(ticketElement);

    closeModalAddTicket();
  } catch (error) {
    console.error("Ошибка создания тикета: ", error);
  }
}

export function closeDescription() {
  const deatilDescCollection = document.querySelectorAll(".detailDescription");
  deatilDescCollection.forEach((element) => {
    element.style.display = "none";
  });
}

export async function editTicket(id, current) {
  const formEdit = document.querySelector("#editTicketForm");
  const inputShortDescription = formEdit.querySelector(".shortDescription");
  const inputDetailDescription = formEdit.querySelector(".detailedDescription");

  const data = {
    name: inputShortDescription.value && inputShortDescription.value,
    description: inputDetailDescription.value && inputDetailDescription.value,
  };

  try {
    const response = updateTicket(id, data);
    if (!response) {
      console.error("Некорректный ответ от сервера при редактировании тикета");
      return null;
    }
    const nameTicket = current.querySelector(".label");
    const description = current.querySelector(".detailDescription");

    if (nameTicket) {
      nameTicket.textContent = data.name;
    }
    if (description) {
      description.textContent = data.description;
    }
    return response;
  } catch (error) {
    console.error("Ошибка при редактировании тикета:", error);
    return null;
  }
}

export async function removeTicket(id) {
  const response = await deleteTicket(id);
  return response;
}
