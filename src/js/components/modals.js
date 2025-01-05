import { getTicketDetails } from "../api/api";

export function showModalAddTicket() {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
}

export function closeModalAddTicket() {
  const modal = document.querySelector(".modal");
  const inputShortDesc = document.querySelector(".shortDescription");
  const detailedDesc = document.querySelector(".detailedDescription");
  inputShortDesc.value = "";
  detailedDesc.value = "";
  modal.style.display = "none";
}

export async function showModalEditTicket(id) {
  const modal = document.querySelector(".editTicketModal");
  const inputShortDesc = modal.querySelector(".shortDescription");
  const detailedDesc = modal.querySelector(".detailedDescription");

  const response = await getTicketDetails(id);

  try {
    if (response) {
      modal.style.display = "block";
      inputShortDesc.value = response.name;
      detailedDesc.value = response.description;
    }
  } catch (error) {
    console.error("Некорректный ответ сервера ", error);
  }
}

export function closeModalEditTicket() {
  const modal = document.querySelector(".editTicketModal");
  const inputShortDesc = modal.querySelector(".shortDescription");
  const detailedDesc = modal.querySelector(".detailedDescription");
  inputShortDesc.value = "";
  detailedDesc.value = "";
  modal.style.display = "none";
}
