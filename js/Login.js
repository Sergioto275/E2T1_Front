// Class: MaterialaAteraScript
// Materiala ateratzeko behar diren metodo guztiak batzen dituen script-a.
new Vue({
    el: '#app',
    data: {
        contrasena: "",
        usuario: "",
        environment: environment,
        userError: false, // Nueva propiedad para manejar el estado de error del usuario
        passError: false, // Nueva propiedad para manejar el estado de error de la contraseña
        showPassword: false, // Nueva propiedad para controlar la visibilidad de la contraseña
    },
    methods: {
        changeEnvironment(env) {
            this.environment = env;
          },
        async LogIn() {
            try {
                const pass = this.contrasena;
                const user = this.usuario;
                const jsonSortu = {
                    "username": user,
                    "pasahitza": pass,
                };

                console.log(JSON.stringify(jsonSortu));

                const response = await fetch(this.environment + '/public/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    toastr.success("Esta mal");
                    this.userError = true; // Marcar error en el usuario
                    this.passError = true; // Marcar error en la contraseña

                }else{
                    console.log('Esta bien');
                    toastr.success("Esta bien");
                    document.cookie = user;
                    this.userError = false; // Marcar error en el usuario
                    this.passError = false; // Marcar error en la contraseña
                    if(user=="ikasle"){
                        window.location.href = "http://localhost/erronka2/Front/DistribucionInicial.html";
                    }else{
                        window.location.href = "http://localhost/erronka2/Front/Home.html";

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
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
    mounted() {
      // Konponentea sortzen denean taula kargatzeko
      this.borrarTodasLasCookies();
    }

    });
