const apiUrl = 'http://www.raydelto.org/agenda.php';

window.onload = function() {
    fetch(apiUrl)
        .then(response => {
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

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    if (!nombre || !apellido || !telefono) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(nuevoContacto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el contacto');
        }
        return response.text(); 
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Contacto agregado exitosamente');

        const contactList = document.getElementById('contact-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${nombre} ${apellido} - ${telefono}`;
        contactList.appendChild(listItem);

        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error al agregar el contacto:', error);
        alert('Hubo un problema al agregar el contacto');
    });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

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
        console.log('Estado de la respuesta:', response.status);
        if (!response.ok) {
            throw new Error('Error al agregar el contacto: ' + response.status);
        }
        return response.text(); 
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Contacto agregado exitosamente');

        const contactList = document.getElementById('contact-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${nombre} ${apellido} - ${telefono}`;
        contactList.appendChild(listItem);

        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error al agregar el contacto:', error);
        alert('Hubo un problema al agregar el contacto');
    });
});
