// Class: TicketScript
// Ticket kudeatzen duen metodo guztiak batzen dituen script-a.
const vue = new Vue({
    el: "#app",
    data: {
        erreserbaArray: [],
        filteredErreserbaArray: [],
        currentLocale: 'es',
        translations: translations,
        environment: environment,
        startDate: '',
        endDate: ''
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
        },
        /* Function: mugimenduCarga
        Mugimendu guztiak kargatzeko.
        */
        async mugimenduCarga() {
            try {
                const response = await fetch(this.environment + '/public/api/erreserbak', {
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
                this.erreserbaArray = datuak.filter(ticket => ticket.ezabatze_data === null || ticket.ezabatze_data === '0000-00-00 00:00:00');
                this.filteredErreserbaArray = this.erreserbaArray;
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        filterByDate() {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            this.filteredErreserbaArray = this.erreserbaArray.filter(material => {
                const hasieraData = new Date(material.hasiera_data);
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
        this.mugimenduCarga();
        this.checkCookie();
    }
});
