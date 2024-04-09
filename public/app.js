const DOM = document;
const editBlock = DOM.querySelector("[data-btn='edit']");
const saveBlock = DOM.querySelector("[data-btn='save']");
const titleBlock = DOM.querySelector("[data-type='title']");

document.addEventListener("click", ({ target }) => {
  let id;

  const editItems = (isContentEditableAtribut, classSaveBtn, classEditBtn) => {
    const items = target.closest("li");
    items.childNodes[1].setAttribute(
      "contenteditable",
      isContentEditableAtribut
    );
    items.querySelector("[data-btn='save']").className = classSaveBtn;
    items.querySelector("[data-btn='edit']").className = classEditBtn;
    return items.childNodes[1].innerText;
  };

  switch (target.dataset.type) {
    case "remove":
      id = target.dataset.id;
      fetch(`/${id}`, { method: "DELETE" });
      target.closest("li").remove();
      break;
    case "edit":
      editItems(true, "d-block", "d-none");
      break;
    case "cancel":
      editItems(false, "d-none", "d-block");
      break;
    case "save":
      const title = editItems(false, "d-none", "d-block");
      id = target.dataset.id;
      fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, id }),
      });
      break;
    default:
      break;
  }
});
