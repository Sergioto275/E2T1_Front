// Class: MaterialaAteraScript
// Materiala ateratzeko behar diren metodo guztiak batzen dituen script-a.
new Vue({
    el: '#app',
    data: {
        contrasena: "",
        usuario: ""
    },
    methods: {
        async LogIn() {
            try {
                const pass = this.contrasena;
                const user = this.usuario;
                const jsonSortu = {
                    "username": user,
                    "pasahitza": pass,
                };

                console.log(JSON.stringify(jsonSortu));

                const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    toastr.error("Esta mal");
                }else{
                    console.log('Esta bien');
                    toastr.success("Esta bien");
                    document.cookie = user;
                    window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/Home.html";
                }
            } catch (error) {
                console.log('Errorea: ', error);
                toastr.error("Error gordo");
            }
        },
        // Sortzeko modalean aurreko langilearen datuak ez agertzeko
        borrarTodasLasCookies() {
            var cookies = document.cookie.split(";"); // Obtener todas las cookies
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie; // Obtener el nombre de la cookie
                document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Establecer la fecha de expiración en el pasado
            }
            console.log('Borrado');
        }
    },
    mounted() {
      // Konponentea sortzen denean taula kargatzeko
      this.borrarTodasLasCookies();
    }

    });
