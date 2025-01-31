document.addEventListener("DOMContentLoaded", function () {
  const inventoryForm = document.getElementById("inventory-form");
  const inventoryTableBody = document.getElementById("inventory-table-body");

  let editRow = null;

  inventoryForm.addEventListener("submit", function (event) {
      event.preventDefault(); 

      const itemName = document.getElementById("itemName").value.trim();
      const itemQuantity = document.getElementById("itemQuantity").value.trim();
      const itemPrice = document.getElementById("itemPrice").value.trim();

      if (itemName === "" || itemQuantity === "" || itemPrice === "") {
          alert("Please fill in all fields.");
          return;
      }

      if (editRow) {
          editRow.cells[0].textContent = itemName;
          editRow.cells[1].textContent = itemQuantity;
          editRow.cells[2].textContent = `$${parseFloat(itemPrice).toFixed(2)}`;

          editRow = null;
      } else {
          const newRow = document.createElement("tr");

          newRow.innerHTML = `
              <td>${itemName}</td>
              <td>${itemQuantity}</td>
              <td>$${parseFloat(itemPrice).toFixed(2)}</td>
              <td>
                  <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                  <button class="btn btn-danger btn-sm delete-btn">Delete</button>
              </td>
          `;

          inventoryTableBody.appendChild(newRow);

          newRow.querySelector(".edit-btn").addEventListener("click", function () {
              editRow = newRow;
              document.getElementById("itemName").value = newRow.cells[0].textContent;
              document.getElementById("itemQuantity").value = newRow.cells[1].textContent;
              document.getElementById("itemPrice").value = parseFloat(newRow.cells[2].textContent.replace("$", ""));
          });

          newRow.querySelector(".delete-btn").addEventListener("click", function () {
              newRow.remove();
          });
      }

      inventoryForm.reset();
  });
});
