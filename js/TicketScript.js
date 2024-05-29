// TicketScript.js
const vue = new Vue({
    el: "#app",
    data: {
        ticketArray: [],
        filteredTickets: [],
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
        changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
            localStorage.setItem('selectedLocale', locale); // Guardar en localStorage
        },
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
                this.filteredTickets = this.ticketArray; // Inicialmente mostrar todos los tickets
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        checkCookie() {
            if (document.cookie == "") {
                window.location.href = "http://localhost/Erronka2/Front/Login.html";
            } else if (document.cookie == "ikasle") {
                window.location.href = "http://localhost/Erronka2/Front/Home.html";
            }
        },
        filterTicketsByDate() {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);

            if (isNaN(start) || isNaN(end)) {
                this.filteredTickets = this.ticketArray; // Si las fechas no son válidas, mostrar todos los tickets
            } else {
                this.filteredTickets = this.ticketArray.filter(ticket => {
                    const ticketDate = new Date(ticket.data);
                    return ticketDate >= start && ticketDate <= end;
                });
            }
        },
        filterTicketsByDate() {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            this.filteredTickets = this.ticketArray.filter(ticket => {
                const Data = new Date(ticket.data);
                return (!this.startDate || Data >= start) && (!this.endDate || Data <= end);
            });
        },
    },
    watch: {
        startDate: 'filterTicketsByDate',
        endDate: 'filterTicketsByDate'
    },
    mounted() {
        const savedLocale = localStorage.getItem('selectedLocale');
        if (savedLocale) {
            this.currentLocale = savedLocale;
        }
        this.cargarTicket();
        this.checkCookie();
    }
});
