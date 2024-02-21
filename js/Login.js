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
                const user = this.contrasena;
                const pass = this.usuario;
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
                }
                console.log(response);
                toastr.success("Esta bien");

    
            } catch (error) {
                console.log('Errorea: ', error);
                toastr.error("Error gordo");
            }
        }
    }

    });
