console.log("Hello, World!");

const agenda = [
  {
    nombre: "Pedro",
    apellido: "Suarez",
    telefono: 5511223344,
    correo: "pedro@telmex.com",
    empresa: "Telmex",
  },

  {
    nombre: "Luisa",
    apellido: "Rosas",
    telefono: 621133445566,
    correo: "luisa@cemex.com",
    empresa: "Cemex",
  },

  {
    nombre: "Javier",
    apellido: "Ortiz",
    telefono: 99887766554,
    correo: "javi.orti@movistar.com",
    empresa: "Movistar",
  },

  {
    nombre: "Laura",
    apellido: "Flores",
    telefono: "5566778899",
    correo: "lauflow@google.com",
    empresa: "Google",
  },

  {
    nombre: "Joaquin",
    apellido: "Ramirez",
    telefono: "8837465748",
    correo: "joaram@apple.com",
    empresa: "Apple",
  },
];
const formContacto = document.getElementById("formularioContacto");

formContacto.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputTelefono = document.getElementById("telefono");
  const inputCorreo = document.getElementById("correo");
  const inputEmpresa = document.getElementById("empresa");

  if (
    !inputNombre.value ||
    !inputApellido.value ||
    !inputTelefono.value ||
    !inputCorreo.value ||
    !inputEmpresa.value
  ) {
    alert("Por favor llena todos los campos para continuar");
  } else {
    agenda.push({
      nombre: inputNombre.value,
      apellido: inputApellido.value,
      telefono: inputTelefono.value,
      correo: inputCorreo.value,
      empresa: inputEmpresa.value
    });
    renderlistaDeContactos ()
  }
});

const contactList = document.getElementById("listaDeContactos");

function renderlistaDeContactos() {
    listaDeContactos.innerHTML = "";
  

    const table = document.createElement("table");
  

    const headers = ["Nombre", "Teléfono", "Correo", "Empresa", "",""];
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  

    const tbody = document.createElement("tbody");
    agenda.forEach((contact, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="nombre-cell">${contact.nombre} ${contact.apellido}</td>
        <td class="telefono-cell">${contact.telefono}</td>
        <td class="correo-cell">${contact.correo}</td>
        <td class="empresa-cell">${contact.empresa}</td>
        <td><button class="edit-button" data-index="${index}">Editar</button></td>
        <td><button class="delete-button" data-index="${index}">Eliminar</button></td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  

    contactList.appendChild(table);
  

    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach(button => {
      button.addEventListener("click", handleEditContact);
    });
  
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
      button.addEventListener("click", handleDeleteContact);
    });
  }
  
renderlistaDeContactos();

function handleEditContact(event) {
    const index = event.target.dataset.index;
    const contact = agenda[index];
  
    const row = event.target.parentNode.parentNode;
    const cells = row.querySelectorAll("td");
  
    cells.forEach((cell, index) => {
      if (index !== cells.length - 2) {
        cell.contentEditable = true;
        cell.classList.add("editing");
      }
    });
  
    const editButton = event.target;
    editButton.textContent = "Guardar";
    editButton.removeEventListener("click", handleEditContact);
    editButton.addEventListener("click", handleSaveContact);
  }
  
  function handleSaveContact(event) {
    const index = event.target.dataset.index;
    const contact = agenda[index];
  
    const row = event.target.parentNode.parentNode;
    const cells = row.querySelectorAll("td");
  
    cells.forEach((cell, index) => {
      if (index !== cells.length - 2) {
        cell.contentEditable = false;
        cell.classList.remove("editing");
      }
    });
  
    contact.nombre = cells[0].textContent;
    contact.telefono = cells[1].textContent;
    contact.correo = cells[2].textContent;
    contact.empresa = cells[3].textContent;
  
    const saveButton = event.target;
    saveButton.textContent = "Editar";
    saveButton.removeEventListener("click", handleSaveContact);
    saveButton.addEventListener("click", handleEditContact);
  }
    
  function handleDeleteContact(event) {
    const index = event.target.dataset.index;
    agenda.splice(index, 1);
  
    const row = event.target.parentNode.parentNode;
    row.remove();
  }

