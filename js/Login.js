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
                    if(user=="ikasle"){
                        window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/DistribucionInicial.html";
                    }else{
                        window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/Home.html";

                    }
                }
            } catch (error) {
                console.log('Errorea: ', error);
                toastr.error("Error gordo");
            }
        },
        // Sortzeko modalean aurreko langilearen datuak ez agertzeko
        borrarTodasLasCookies() {
            document.cookie = ' = ; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            console.log(document.cookie);
        }
    },
    mounted() {
      // Konponentea sortzen denean taula kargatzeko
      this.borrarTodasLasCookies();
    }

    });
