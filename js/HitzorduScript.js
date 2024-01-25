const vue = new Vue({
    el: "#app",
    data: {
        startHour : '10:00:00',
        endHour : '16:00:00',
        hitzorduArray: [],
        citasEditarArray: [],
        tratamenduArray:[],
        tratamenduSelec:[],
        taldeArray: [],
        langileArray: [],
        eserlekuKop:[],
        hoursArray:[],
        idLangile: null,
        idTalde: null,
        seats: [], 
        citas: [],
        dataTest:null,
        citaSelec:null,
        idSelec:null,
        izenaSelec:null,
        hasOrduaTest:null,
        amaOrduaTest:null,
        eserlekuaCrear:null,
        izenaCrear:null,
        telfCrear:null,
        deskCrear:null,
        etxekoCrear:null,
        dataSelec:"",
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
        limpiar_campos(){
            this.dataTest=null;
            this.citaSelec=null;
            this.idSelec=null;
            this.hasOrduaTest=null;
            this.amaOrduaTest=null;
            this.izenaCrear=null;
            this.telfCrear=null;
            this.deskCrear=null;
            this.etxekoCrear=null;
            this.dataSelec=null;
            this.dataEditar=null;
            this.hasOrduaEditar=null;
            this.amaOrduaEditar=null;
            this.izenaEditar=null;
            this.telfEditar=null;
            this.deskEditar=null;
            this.etxekoEditar=null;
            this.citasDisponible=null;
        },
        changeEnvironment(env){
            this.environment = env;
          },
          changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
          },
          today(){
            const eguneratze_data_primaria = new Date();
            const year = eguneratze_data_primaria.getFullYear();
            const month = ('0' + (eguneratze_data_primaria.getMonth() + 1)).slice(-2);
            const day = ('0' + eguneratze_data_primaria.getDate()).slice(-2);
            return (`${year}-${month}-${day}`);
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
            console.log(id)
            cita = this.hitzorduArray.filter(citas => citas.id == id);
            console.log(cita)
            this.idSelec = id;
            this.dataEditar = cita[0].data;
            this.hasOrduaEditar = cita[0].hasiera_ordua;
            this.amaOrduaEditar = cita[0].amaiera_ordua;
            this.izenaSelec = cita[0].izena;
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
          async asignar_cita(){
            try{ 
                const json_data = {
                    "id":this.idSelec,
                    "id_langilea":this.idLangile
                }
                const response = await fetch(this.environment + '/public/api/hitzorduesleitu',{
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
                const modalAsignarElement = document.getElementById('exampleModalAsignar');
                const modalInst = bootstrap.Modal.getInstance(modalAsignarElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
          },
          async generar_ticket(){
            try{
                const json_data = {
                    "id":this.idSelec
                }
                const response = await fetch(this.environment + '/public/api/hitzorduaamaitu',{
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
            }catch(error){
                throw new Error("Error en generacion de citas disponibles:"+error)
            }
            try{
                const json_data = {
                    "id_hitzordu":this.idSelec,
                    "tratamendua":this.tratamenduSelec
                }
                const response = await fetch(this.environment + '/public/api/ticket_lerro',{
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
                alert('Ondo eguneratuta');
                await this.cargarHitzordu();
            }catch(error){
                throw new Error("Error en generacion de citas disponibles:"+error)
            }
          },
          async cargar_citas(terminadas){
            this.citasEditarArray = [];
            try{
                const response = await fetch(this.environment + '/public/api/hitzorduak/'+this.dataSelec,{
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
                if(terminadas){
                    this.citasEditarArray = datuak.filter(citas => citas.ezabatze_data === null || citas.ezabatze_data === "0000-00-00 00:00:00");
                }else{
                    this.citasEditarArray = datuak.filter(citas =>citas.amaiera_ordua_erreala === null && (citas.ezabatze_data === null || citas.ezabatze_data === "0000-00-00 00:00:00"));
                }
            }catch(error){
                throw new Error("Error al cargar las citas:"+error);
            }
          },
          async cargarComboBox() {
            try {
              const response = await fetch(this.environment + '/public/api/taldeak', {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
              });
      
              if (!response.ok) {
                console.log('Errorea eskera egiterakoan');
                throw new Error('Errorea eskaera egiterakoan');
              }
              const datuak = await response.json();
              this.taldeArray = datuak
                .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");
      
              console.log(this.taldeArray);
            } catch (error) {
              console.error('Errorea: ', error);
            }

            try {
                const response = await fetch(this.environment + '/public/api/langileak', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
                });
        
                if (!response.ok) {
                  console.log('Errorea eskera egiterakoan');
                  throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.langileArray = datuak
                  .filter(langile => langile.ezabatze_data === null && langile.kodea == this.idTalde || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.kodea == this.idTalde);
        
                console.log(this.langileArray);
              } catch (error) {
                console.error('Errorea: ', error);
              }
          },
          seleccionar_citaCrear(eserlekua,time){
            if(this.dataTest){
                if(this.dataTest != this.dataSelec){
                    if(confirm("Desea cambiar de el dia?")){
                        this.dataTest = this.dataSelec;
                        this.hasOrduaTest = time;
                        this.amaOrduaTest = this.hoursArray[this.hoursArray.indexOf(time)+1];
                        this.eserlekuaCrear = eserlekua;
                    }
                }else{
                    if(this.eserlekuaCrear != eserlekua){
                        if(confirm("Desea cambiar el asiento?")){
                            this.hasOrduaTest = time;
                            this.amaOrduaTest = this.hoursArray[this.hoursArray.indexOf(time)+1];
                            this.eserlekuaCrear = eserlekua;
                        }
                    }else{
                        if(this.hasOrduaTest < time){
                            this.amaOrduaTest = this.hoursArray[this.hoursArray.indexOf(time)+1];
                        }else{
                            this.hasOrduaTest = time;
                        }
                    }
                }
            }else{
                this.dataTest = this.dataSelec;
                this.hasOrduaTest = time;
                this.amaOrduaTest = this.hoursArray[this.hoursArray.indexOf(time)+1];
                this.eserlekuaCrear = eserlekua;
            }
          },
          getCitasAtTimeAndSeat(time, seatId, dato) {
            console.log(time);
            // Filtrar citas para obtener las citas en la hora y asiento específicos
            const filteredCitas = this.hitzorduArray.filter(cita => (cita.hasiera_ordua <= time && cita.amaiera_ordua > time && cita.eserlekua === seatId));
            // Puedes personalizar cómo mostrar la información de las citas aquí
            switch(dato){
                case 'id':
                    return filteredCitas.map(cita => cita.id).join(', '); // Muestra los nombres de las personas
                case 'izena':
                    return filteredCitas.map(cita => cita.izena).join(', '); // Muestra los nombres de las personas
                case 'deskribapena':
                    return filteredCitas.map(cita => cita.deskribapena).join(', '); // Muestra los nombres de las personas
            }
          },
        async cargarHitzordu() {
            // this.limpiar_campos();
            this.hitzorduArray = [];
            try{
                // console.log(this.dataSelec)
                const response = await fetch(this.environment + '/public/api/hitzorduak/'+this.dataSelec,{
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
                console.log(datuak)
                this.hitzorduArray = datuak.filter(hitzordu => hitzordu.ezabatze_data === null || hitzordu.ezabatze_data === "0000-00-00 00:00:00");
            }catch(error){
                console.log("Errorea: "+error);
            }
            try{
                const response2 = await fetch(this.environment + '/public/api/langileak/count/'+this.dataSelec,{
                    headers: {  
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if(!response2.ok){
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak2 = await response2.json();
                this.eserlekuKop = [];
                for (let i = 1; i <= datuak2; i++) {
                    this.eserlekuKop.push({id:i});
                }
                // this.getHoursInRange();

            }catch(error){
                console.log("Errorea: "+error);
            }
        },
        getHoursInRange() {
            const startTime = new Date(`2022-01-01 ${this.startHour}`);
            const endTime = new Date(`2022-01-01 ${this.endHour}`);
            this.hoursArray = [];
          
            while (startTime <= endTime) {
              const formattedHour = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,second:'2-digit'});
              this.hoursArray.push(formattedHour);
              startTime.setMinutes(startTime.getMinutes() + 30);
            }
          
          },
        async createCita(){
            try{
                const data = this.dataTest;
                const hasOrdua = this.hasOrduaTest;
                const amaOrdua = this.amaOrduaTest;
                const eserlekua = this.eserlekuaCrear;
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
                    "eserlekua": eserlekua,
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
        },
        async cargarTratamenduak() {
            try{
                const response = await fetch(this.environment + '/public/api/tratamenduak',{
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
                this.tratamenduArray = datuak.filter(tratamendua => tratamendua.ezabatze_data === null || tratamendua.ezabatze_data === '0000-00-00 00:00:00');
            }catch(error){
                console.log("Errorea: "+error);
            }
        }
    },
    mounted() {
        this.cargarHitzordu();
        this.cargarComboBox();
        this.getHoursInRange();
        this.cargarTratamenduak();
      }
});

