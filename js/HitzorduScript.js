const vue = new Vue({
    el: "#app",
    data: {
        hitzorduArray: [],
        calendar: null,
        citas: [],
        organizer: null,
        dataCrear:null,
        hasOrduaCrear:null,
        amaOrduaCrear:null,
        izenaCrear:null,
        telfCrear:null,
        deskCrear:null,
        etxekoCrear:null,
        currentLocale: 'es',
        translations: translations,
        environment: 'http://localhost/Erronka2/Back/talde1erronka2'
    },
    methods: {
        changeEnvironment(env){
            this.environment = env;
          },
          changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
          },

        async cargarHitzordu() {
            console.log("aaa");
            try{
                const response = await fetch(this.environment + '/public/api/hitzorduak',{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
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
        },
        async createCita(){
            try{
                const data = this.dataCrear;
                const hasOrdua = this.hasOrduaCrear;
                const amaOrdua = this.amaOrduaCrear;
                const izena = this.izenaCrear;
                const telefonoa = this.telfCrear;
                const deskribapena = this.deskCrear;
                var etxeko;
                if(this.etxekoCrear){
                    etxeko = "E";
                }else{
                    etxeko = "K";
                };
                const json_data = {
                    "data": data,
                    "hasOrdua": hasOrdua,
                    "amaOrdua": amaOrdua,
                    "izena":izena,
                    "telefonoa":telefonoa,
                    "deskribapena":deskribapena,
                    "etxekoa":etxeko
                }
                const response = await fetch(this.environment + '/public/api/hitzorduak',{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "POST",
                    body: JSON.stringify(json_data)
                });
                if(!response.ok){
                    throw new Error('Errorea eskaera egiterakoan');
                }
                alert('Sortu da');
                document.getElementById('organizerContainer').innerHTML = "";
                await this.cargarHitzordu();
      
                //Modal-a ixteko ondo sortzen duenean
                const modalCrearElement = document.getElementById('exampleModalCrear');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Ez da sortu".error);
            }
        }
    },
    mounted() {
        this.cargarHitzordu();
      }
});

