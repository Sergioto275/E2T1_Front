const vue = new Vue({
    el: "#app",
    data: {
        mugimenduArray: [],
        filteredMugimenduArray: [],
        startDate: '',
        endDate: '',
        currentLocale: 'es',
        translations: translations,
        environment: environment
    },
    methods: {
        retroceder(){ 
            window.history.back(); 
        }, 

        changeEnvironment(env) {
            this.environment = env;
        },
        /* Function: changeLanguage
        Hizkuntza aldatzeko.
        Parameters:
            locale - Hizkuntza.
        */
        changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
            localStorage.setItem('selectedLocale', locale); // Guardar en localStorage
        },
        /* Function: mugimenduCarga
        Mugimendu guztiak kargatzeko.
        */
        async mugimenduCarga() {
            try {
                const response = await fetch(this.environment + '/public/api/mugimenduak', {
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
                this.mugimenduArray = datuak.filter(ticket => ticket.ezabatze_data === null || ticket.ezabatze_data === '0000-00-00 00:00:00');
                this.filteredMugimenduArray = this.mugimenduArray;
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        /* Function: filterByDateRange
        Filtro de movimientos por rango de fechas.
        */
        // filterByDateRange() {
        //     const start = new Date(this.startDate);
        //     const end = new Date(this.endDate);
        //     this.filteredMugimenduArray = this.mugimenduArray.filter(movement => {
        //         const movementDate = new Date(movement.data);
        //         return movementDate >= start && movementDate <= end;
        //     });
        // },
        filterByDateRange() {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            this.filteredMugimenduArray = this.mugimenduArray.filter(movement => {
                const hasieraData = new Date(movement.data);
                return (!this.startDate || hasieraData >= start) && (!this.endDate || hasieraData <= end);
            });
        },
        checkCookie() {
            if (document.cookie == "") {
                window.location.href = "http://localhost/Erronka2/Front/Login.html";
            } else if (document.cookie == "ikasle") {
                window.location.href = "http://localhost/Erronka2/Front/Home.html";
            }
        },
    },
    mounted() {
        const savedLocale = localStorage.getItem('selectedLocale');
        if (savedLocale) {
            this.currentLocale = savedLocale;
        }
        this.mugimenduCarga();
        this.checkCookie();
    }
});
