import {
  showModalAddTicket,
  closeModalAddTicket,
  showModalEditTicket,
  closeModalEditTicket,
  showModalDeleteTicket,
  closeModalDeleteTicket,
} from "./components/modals";
import getAllTickets from "./api/api";
import renderTicketList, {
  addTicket,
  closeDescription,
  editTicket,
  removeTicket,
  clearTicketList,
  setStatusTicket,
} from "./components/ticketList";

export default async function main() {
  const container = document.querySelector(".ticket-list");
  const form = document.querySelector("#addTicketForm");
  const formEdit = document.querySelector("#editTicketForm");
  const formDelete = document.querySelector("#delete-modal");
  let currentDeleteTicket = null;
  let currentEditTicket = null;
  let modalActive = null;

  const allTickets = await getAllTickets();
  renderTicketList(allTickets);

  container.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.classList.contains("ticket1")) {
      const targetTicket = target.closest(".ticket");
      const id = targetTicket.dataset.id;
      if (target.checked) {
        setStatusTicket(id, true);
      } else {
        setStatusTicket(id, false);
      }
    }

    if (target.classList.contains("add-ticket")) {
      modalActive = target;
      showModalAddTicket();
    }

    if (target.classList.contains("edit")) {
      currentEditTicket = target.closest(".ticket");
      const id = currentEditTicket.dataset.id;
      modalActive = target;
      showModalEditTicket(id);
    }

    if (target.classList.contains("delete")) {
      currentDeleteTicket = target.closest(".ticket").dataset.id;
      showModalDeleteTicket();
    }

    if (
      target.classList.contains("ticket") ||
      target.classList.contains("label") ||
      target.classList.contains("short")
    ) {
      const ticketElement = target.closest(".ticket");
      if (!ticketElement) {
        console.error("Элемент тикет не найден");
      }
      closeDescription();
      const detailDesc = ticketElement.querySelector(".detailDescription");
      detailDesc.style.display = "block";
    }
  });

  form.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains("submit")) {
      addTicket();
    }
  });

  formEdit.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const index = currentEditTicket.dataset.id;

    if (target.classList.contains("editSubmit")) {
      editTicket(index, currentEditTicket);
      closeModalEditTicket();
    }
  });

  formDelete.addEventListener("click", async (e) => {
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains("cancel-delete")) {
      closeModalDeleteTicket();
    }

    if (target.classList.contains("confirm-delete")) {
      const newList = await removeTicket(currentDeleteTicket);
      clearTicketList();
      renderTicketList(Array.from(newList));
      closeModalDeleteTicket();
    }
  });

  form.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (modalActive) {
      if (e.key === "Enter") {
        addTicket();
      }
    }
  });

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (modalActive) {
      if (e.key === "Escape") {
        closeModalAddTicket();
        closeModalEditTicket();
      }
    }
    closeDescription();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BODY" || target.tagName === "HTML") {
      closeDescription();
    }

    if (
      target.classList.contains("editTicketModal") ||
      target.classList.contains("cancelButton")
    ) {
      modalActive = null;
      closeModalEditTicket();
    }

    if (
      target.classList.contains("modal") ||
      target.classList.contains("cancelButton")
    ) {
      modalActive = null;
      closeModalAddTicket();
    }
  });
}
