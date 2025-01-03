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

export function showModalEditTicket() {
  const modal = document.querySelector(".editTicketModal");
  modal.style.display = "block";
}

export function closeModalEditTicket() {
  const modal = document.querySelector(".editTicketModal");
  const inputShortDesc = modal.querySelector(".shortDescription");
  const detailedDesc = modal.querySelector(".detailedDescription");
  inputShortDesc.value = "";
  detailedDesc.value = "";
  modal.style.display = "none";
}
