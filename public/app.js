const buttonOk = document.createElement("button");
buttonOk.className = "btn btn-danger";

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    event.stopPropagation();
    const id = event.target.dataset.id;
    fetch(`/${id}`, { method: "DELETE" });
    event.target.closest("li").remove();
  } else if (event.target.dataset.type === "edit") {
    event.stopPropagation();
    const newTitle = prompt("Введите новую заметку");
    if (!newTitle) {
      return;
    }
    const id = event.target.dataset.id;
    fetch(`/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, id }),
    });
    document.querySelector("[data-type='title']").innerText = newTitle;
  }
});
