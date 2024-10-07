const apiUrl = 'https://www.raydelto.org/agenda.php';

// Obtener los contactos al cargar la página
window.onload = function() {
    fetch(apiUrl)
        .then(response => {
            console.log('Estado de la respuesta al obtener contactos:', response.status);
            if (!response.ok) {
                throw new Error('Error al obtener los contactos');
            }
            return response.json();
        })
        .then(data => {
            const contactList = document.getElementById('contact-list');
            contactList.innerHTML = ''; 
            data.forEach(contact => {
                const listItem = document.createElement('li');
                listItem.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                contactList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al obtener los contactos:', error));
};

// Manejar el envío del formulario para agregar un nuevo contacto
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    // Validar si los campos están vacíos
    if (!nombre || !apellido || !telefono) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    console.log('Enviando datos:', nuevoContacto);

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(nuevoContacto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Estado de la respuesta al agregar contacto:', response.status); // Depuración de estado
        if (!response.ok) {
            throw new Error(`Error al agregar el contacto. Estado: ${response.status}`);
        }
        return response.text(); // Ver la respuesta en crudo
    })
    .then(data => {
        console.log('Respuesta del servidor:', data); // Mostrar la respuesta del servidor
        alert('Contacto agregado exitosamente');

        // Agregar el nuevo contacto a la lista
        const contactList = document.getElementById('contact-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${nombre} ${apellido} - ${telefono}`;
        contactList.appendChild(listItem);

        // Limpiar el formulario
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error al agregar el contacto:', error);
        alert(`Hubo un problema al agregar el contacto. ${error.message}`);
    });
});
