// Class: MaterialaAteraScript
// Materiala ateratzeko behar diren metodo guztiak batzen dituen script-a.
new Vue({
    el: '#app',
    data: {
        contrasena: "",
        usuario: "",
        environment: environment,
        userError: false,
        passError: false,
        showPassword: false,
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
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(jsonSortu),
                });

                if (!response.ok) {
                    console.log('Errorea sortzerakoan');
                    toastr.success("Esta mal");
                    this.userError = true;
                    this.passError = true;

                } else {
                    console.log('Esta bien');
                    toastr.success("Esta bien");
                    document.cookie = user;
                    this.userError = false;
                    this.passError = false;
                    if (user == "ikasle") {
                        window.location.href = "http://localhost/Erronka2/Front/DistribucionInicial.html";
                    } else {
                        window.location.href = "http://localhost/Erronka2/Front/Home.html";

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
