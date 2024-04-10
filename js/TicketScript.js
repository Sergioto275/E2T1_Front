// Class: TratamenduakScript
// Tratamenduak kudeatzen duen metodo guztiak batzen dituen script-a.
const vue = new Vue({
    el: "#app",
    data: {
        ticketArray: [],
        currentLocale: 'es',
        translations: translations,
        environment: environment
    },
    methods: {
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
        /* Function: cargarTicket
        Ticket guztiak kargatzeko.
        */
        async cargarTicket() {
            try {
                const response = await fetch(this.environment + '/public/api/ticket_lerro', {
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
                this.ticketArray = datuak.filter(ticket => ticket.ezabatze_data === null || ticket.ezabatze_data === '0000-00-00 00:00:00');
            } catch (error) {
                console.log("Errorea: " + error);
            }
        }
    },
    mounted() {
        this.cargarTicket();
    }
});
