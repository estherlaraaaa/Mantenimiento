let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/materia")
                .then(res => res.json())
                .then(data => {
                    let materias = document.getElementsByClassName("materias")[0];

                    materias.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                            ` <tr>
                                <td class="id">${element._id}</td>
                                <td class="name">${element.nombre}</td>
                                <td class="uv">${element.uv}</td>
                                <td class="options"> 
                                    <a class="more" href=""> More</a>
                                    <a class="edit" href=""> Edit </a>
                                    <a class="delete" href=""> Delete </a>
                                </td>
                            </tr>`
                    }, "");

                    document.querySelectorAll(".more").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    alert('Nombre: '+ data.nombre + '\n' +
                                        'UV: '+ data.uv + '\n' +
                                        'Descripcion: '+ data.descripcion + '\n')
                                    console.log(data);
                                });
                        });
                    });

                    document.querySelectorAll(".delete").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let id = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("id")[0]
                                .innerText;
                            fetch('/materia/delete/' + id)
                                .then(res => res.json())
                                .then(function (data) {
                                    console.log(data);
                                    loadContent();

                                });
                        });
                    });

                    document.querySelectorAll(".edit").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    document.saveMateria.nombre.value = data.nombre;
                                    document.saveMateria.uv.value = data.uv;
                                    document.saveMateria.descripcion.value = data.descripcion;
                                    document.saveMateria.id.value = data._id;
                                    console.log(data);

                                });


                            // fetch('/materia/update/' + id)
                            //     .then(res => res.json())
                            //     .then(function (data) {
                            //         console.log(data);
                            //         loadContent();

                            //     });
                        });
                    });
                });
        }
        let form = document.forms.saveMateria;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if( document.saveMateria.id.value == ''){
                fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    loadContent();
                });   
            }else{
                id = document.saveMateria.id.value;
                fetch('/materia/update/' + id, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                })
                .then(res => res.json())
                .then(function (data) {
                    console.log(data);
                    loadContent();

                });
            }
        });

        loadContent();
    }
};
window.onload = () => app.init();