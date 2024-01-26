const vue = new Vue({
    el: "#app",
    data: {
        tratamenduArray: [],
        currentLocale: 'es',
        translations: translations,
        idSelec:null,
        izenaCrear:null,
        izenaEditar:null,
        kanpoko_prezioaCrear:null,
        kanpoko_prezioaEditar:null,
        etxeko_prezioaCrear:null,
        etxeko_prezioaEditar:null,
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
        },
        cargar_datos(id){
            const tratamendu = this.tratamenduArray.filter(tratamendu => tratamendu.id == id)
            this.idSelec = id;
            this.izenaEditar = tratamendu[0].izena;
            this.etxeko_prezioaEditar = tratamendu[0].etxeko_prezioa;
            this.kanpoko_prezioaEditar = tratamendu[0].kanpoko_prezioa;
        },
        async createTratamendu(){
            try{ 
                const json_data = {
                    "izena":this.izenaCrear,
                    "etxeko_prezioa":this.etxeko_prezioaCrear,
                    "kanpoko_prezioa":this.kanpoko_prezioaCrear
                }
                const response = await fetch(this.environment + '/public/api/tratamenduak',{
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
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalCrearElement = document.getElementById('exampleModalCrear');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
        },
        async editarTratamendu(){
            try{ 
                const json_data = {
                    "id":this.idSelec,
                    "izena":this.izenaEditar,
                    "etxeko_prezioa":this.etxeko_prezioaEditar,
                    "kanpoko_prezioa":this.kanpoko_prezioaEditar
                }
                const response = await fetch(this.environment + '/public/api/tratamenduak',{
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
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
        },
        async borrarTratamendu(){
            try{ 
                const json_data = {
                    "id":this.idSelec
                }
                const response = await fetch(this.environment + '/public/api/tratamenduak',{
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
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                modalInst.hide();
            }catch(error){
                throw new Error("Error en carga de citas disponibles:"+error);
            }
        },
    },
    mounted() {
        this.cargarTratamenduak();
      }
});

