const vue = new Vue({
    el: "#app",
    data: {
        hitzorduArray: [],
        citasEditarArray: [],
        calendar: null,
        citas: [],
        organizer: null,
        dataTest:null,
        dataSelec:null,
        citaSelec:null,
        idSelec:null,
        hasOrduaTest:null,
        amaOrduaTest:null,
        izenaCrear:null,
        telfCrear:null,
        deskCrear:null,
        etxekoCrear:null,
        dataSelec:null,
        dataEditar:null,
        hasOrduaEditar:null,
        amaOrduaEditar:null,
        izenaEditar:null,
        telfEditar:null,
        deskEditar:null,
        etxekoEditar:null,
        citasDisponible:null,
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
          async citasDisponibles(){
            if(!this.dataTest || !this.amaOrduaTest || !this.hasOrduaTest){
                return 0;
            }
            try{
                const json_data = {
                    "data":this.dataTest,
                    "hasiera_ordua":this.hasOrduaTest,
                    "amaiera_ordua":this.amaOrduaTest
                }
                const response = await fetch(this.environment + '/public/api/hitzordu_eskuragarri',{
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
                const datuak = await response.json();
                if(datuak < 0){
                    this.citasDisponible = ("No hay ordutegi asignado")
                }else{
                    this.citasDisponible = datuak;
                }
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
          },
          cargar_cita_selec(id){
            cita = this.citasEditarArray.filter(citas => citas.id === id);
            this.idSelec = id;
            this.dataEditar = cita[0].data;
            this.hasOrduaEditar = cita[0].hasiera_ordua;
            this.amaOrduaEditar = cita[0].amaiera_ordua;
            this.izenaEditar = cita[0].izena;
            this.telfEditar = cita[0].telefonoa;
            this.deskEditar = cita[0].deskribapena;
            if(cita[0].etxekoa == "E"){
                this.etxekoEditar = true;
            }else{
                this.etxekoEditar = false;
            };  
          },
          async editar_cita(){
            try{
                var etxeko;
                if(this.etxekoEditar){
                    etxeko = "E";
                }else{
                    etxeko = "K";
                };  
                const json_data = {
                    "id":this.idSelec,
                    "data":this.dataEditar,
                    "hasiera_ordua":this.hasOrduaEditar,
                    "amaiera_ordua":this.amaOrduaEditar,
                    "izena":this.izenaEditar,
                    "telefonoa":this.telfEditar,
                    "deskribapena":this.deskEditar,
                    "etxekoa":etxeko
                }
                const response = await fetch(this.environment + '/public/api/hitzorduak',{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "PUT",
                    body: JSON.stringify(json_data)
                });
                if(!response.ok){
                    throw new Error('Errorea eskaera egiterakoan');
                }
                alert('Ondo eguneratuta');
                await this.cargarHitzordu();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
          },
          async eliminar_cita(){
            try{ 
                const json_data = {
                    "id":this.idSelec
                }
                const response = await fetch(this.environment + '/public/api/hitzorduak',{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "DELETE",
                    body: JSON.stringify(json_data)
                });
                if(!response.ok){
                    throw new Error('Errorea eskaera egiterakoan');
                }
                alert('Ondo eguneratuta');
                await this.cargarHitzordu();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
          },
          async cargar_citas(){
            try{
                const response = await fetch(this.environment + '/public/api/hitzorduakbydate/'+this.dataSelec,{
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

                this.citasEditarArray = datuak.filter(citas => citas.ezabatze_data === null || citas.ezabatze_data === "0000-00-00 00:00:00");
            }catch(error){
                throw new Error("Error al cargar las citas:"+error);
            }
          },
        async cargarHitzordu() {
            document.getElementById('organizerContainer').innerHTML = "";
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
                const data = this.dataTest;
                const hasOrdua = this.hasOrduaTest;
                const amaOrdua = this.amaOrduaTest;
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

