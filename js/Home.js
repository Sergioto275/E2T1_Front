// Class: Home
// Hasierako orrialdearen metodo guztiak batzen dituen script-a.
const vue = new Vue({
    el: "#app",
    data: {
        hitzorduArray: [],
        stockArray: [],
        calendar: null,
        citas: [],
        organizer: null,
        currentLocale: 'es',
        translations: translations,
        isGlowing: false,
        environment: environment,
        isAdmin: false,
        isLanbide: false
    },
    methods: {
        changeEnvironment(env) {
            this.environment = env;
        },
        /* Function: changeLanguage
        Hizkuntza aldatzeko.
        Parameters:
            locale - Hizkuntza
        */
        changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
        },
        /* Function: cargarHitzordu
        Hitzorduak kargatzeko.
        */
        async cargarHitzordu() {
            document.getElementById('organizerContainer').innerHTML = "";
            try {
                const response = await fetch(this.environment + '/public/api/hitzorduHome', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.hitzorduArray = datuak
                this.calendar = new Calendar("calendarContainer", "small",
                    ["Lunes", 3],
                    ["#c7c1c1", "#b6adad", "#ffffff", "#ffffff"],
                    {
                        days: [translations[this.currentLocale].menu.calendar.dias.domingo, translations[this.currentLocale].menu.calendar.dias.lunes, translations[this.currentLocale].menu.calendar.dias.martes, translations[this.currentLocale].menu.calendar.dias.miercoles, translations[this.currentLocale].menu.calendar.dias.jueves, translations[this.currentLocale].menu.calendar.dias.viernes, translations[this.currentLocale].menu.calendar.dias.sabado],
                        months: [translations[this.currentLocale].menu.calendar.meses.enero, translations[this.currentLocale].menu.calendar.meses.febrero, translations[this.currentLocale].menu.calendar.meses.marzo, translations[this.currentLocale].menu.calendar.meses.abril, translations[this.currentLocale].menu.calendar.meses.mayo, translations[this.currentLocale].menu.calendar.meses.junio, translations[this.currentLocale].menu.calendar.meses.julio, translations[this.currentLocale].menu.calendar.meses.agosto, translations[this.currentLocale].menu.calendar.meses.septiembre, translations[this.currentLocale].menu.calendar.meses.octubre, translations[this.currentLocale].menu.calendar.meses.noviembre, translations[this.currentLocale].menu.calendar.meses.diciembre],
                        indicator: true,
                        placeholder: "<span>" + translations[this.currentLocale].menu.calendar.placeholder + "</span>"
                    });
                this.organizer = new Organizer("organizerContainer", this.calendar, this.hitzorduArray);
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        /**
         * Funtzioa stock alertak ikusteko
         */
        async stock_alerta() {
            try {
                const response = await fetch(this.environment + '/public/api/produktuakalerta', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.stockArray = datuak;
            } catch (Error) {
                throw new error("Errorea: " + error)
            }
        },

        checkCookie() {
            console.log(document.cookie)
            // Verificar si la cookie es igual a "Admin"
            const isAdminCookie = document.cookie == 'admin';
            const isLanbideCookie = document.cookie == 'lanbide';
            this.isAdmin = isAdminCookie;
            this.isLanbide = isLanbideCookie;

            // if (document.cookie == "") {
            //     window.location.href = "http://localhost/erronka2/Front/Login.html";
            // }
        },


    },
    mounted() {
        this.cargarHitzordu();
        this.stock_alerta();
        this.checkCookie();
    }
});

