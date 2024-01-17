const vue = new Vue({
    el: "#app",
    data: {
        hitzorduArray: [],
        calendar: null,
        citas: [],
        organizer: null,
        environment: 'http://localhost/Erronka2/Back/talde1erronka2'
    },
    methods: {
        changeEnvironment(env){
            this.environment = env;
          },

        async cargarHitzordu() {
            console.log("aaa");
            try{
                const response = await fetch(this.environment + '/public/api/hitzorduak',{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                if(!response.ok){
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.hitzorduArray = datuak
                this.calendar = new Calendar("calendarContainer", "small",
                            [ "Monday", 3 ],
                            ["#ffc107", "#ffa000", "#ffffff", "#ffecb3"],
                            {
                                days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",  "Saturday" ],
                                months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                                indicator: false,
                                placeholder: "<span>No hay ninguna cita</span>"
                            });
                this.organizer = new Organizer("organizerContainer", this.calendar, this.hitzorduArray);
            }catch(error){
                console.log("Errorea: "+error);
            }
        }
    },
    mounted() {
        this.cargarHitzordu();
      }
});

