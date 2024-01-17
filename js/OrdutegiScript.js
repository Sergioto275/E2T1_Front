new Vue({
    el: '#app',
    data: {
      selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
      arrayId :[],
      kodeaActu:"",
      egunaActu:"",
      hasieradataActu:"",
      hasieraorduaActu:"",
      amaieradataActu:"",
      amaieraorduaActu:"",
      kodeaCrear:"",
      egunaCrear:"",
      hasieradataCrear:"",
      hasieraorduaCrear:"",
      amaieradataCrear:"",
      amaieraorduaCrear:"",
      listaOrdutegi:[],
      listaOrdutegiById:[],
      existe: null,
      currentLocale: 'es',
      translations: translations,
      environment: 'http://localhost/Erronka2/Back/talde1erronka2',
      listaTalde:[],
      grupoFil: "",
    },
    methods: {
      changeEnvironment(env){
        this.environment = env;
      },
      changeLanguage(locale) {
        console.log('Cambiando a:', locale);
        this.currentLocale = locale;
      },
      async cargarComboBox() {
        try{
          const response = await fetch(this.environment + '/public/api/taldeak',{
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
          });

          if(!response.ok) {
            console.log('Errorea eskera egiterakoan');
            throw new Error('Errorea eskaera egiterakoan');
          }
          const datuak = await response.json();
          this.listaTalde = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");

          console.log(this.listaTalde);
        } catch (error){
          console.error('Errorea: ', error);
        }
      },
      async filtroGrupo(){
        console.log("hola")
        try{
          const response = await fetch(this.environment + '/public/api/ordutegiak', {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
          });

          if(!response.ok) {
            console.log('Errorea eskera egiterakoan');
            throw new Error('Errorea eskaera egiterakoan');
          }

          this.listaLangile=[];
          const datuak = await response.json();

          this.listaLangile = datuak
          .filter(langile => langile.kodea === this.grupoFil && langile.ezabatze_data === null || langile.kodea === this.grupoFil  && langile.ezabatze_data === "0000-00-00 00:00:00");

          if(this.listaLangile.length == 0){
            this.listaLangile = datuak
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");

          }

        } catch (error){
          console.error('Errorea: ', error);
        }
      },
      cargaLangile() {
        this.listaOrdutegi=[];
        fetch(this.environment + '/public/api/ordutegiak')
        .then(dato => {
          return dato.json();
        })
        .then(datos => {
          for(var i=0; i < datos.length; i++){
            
            if(datos[i].ezabatze_data === null || datos[i].ezabatze_data==="0000-00-00 00:00:00"){
            this.listaOrdutegi.push(datos[i]);
          }
          }
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });
      },
      cargarDatosModal(){
        fetch(this.environment + '/public/api/ordutegiakortubyid/'+this.arrayId[0])
        .then(dato => {
          return dato.json();
        })
        .then(datos => {
          this.listaOrdutegiById= datos;
          console.log(this.listaOrdutegiById);
          this.kodeaActu=this.listaOrdutegiById[0].kodea;
          this.egunaActu=this.listaOrdutegiById[0].eguna;
          this.hasieradataActu=this.listaOrdutegiById[0].hasiera_data;
          this.hasieraorduaActu=this.listaOrdutegiById[0].hasiera_ordua;
          this.amaieradataActu=this.listaOrdutegiById[0].amaiera_data;
          this.amaieraorduaActu=this.listaOrdutegiById[0].amaiera_ordua;
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });
      },
      actuDatosModal(){
        const id=this.arrayId[0];
        const kodea=this.kodeaActu;
        const eguna=this.egunaActu;
        const hasiera_data=this.hasieradataActu;
        const hasiera_ordua=this.hasieraorduaActu;
        const amaiera_data=this.amaieradataActu;
        const amaiera_ordua=this.amaieraorduaActu;
        const eguneratze_data_primaria = new Date();
        const year = eguneratze_data_primaria.getFullYear();
        const month = ('0' + (eguneratze_data_primaria.getMonth() + 1)).slice(-2);
        const day = ('0' + eguneratze_data_primaria.getDate()).slice(-2);
        const hours = ('0' + eguneratze_data_primaria.getHours()).slice(-2);
        const minutes = ('0' + eguneratze_data_primaria.getMinutes()).slice(-2);
        const seconds = ('0' + eguneratze_data_primaria.getSeconds()).slice(-2);
        const eguneratze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const jsonEditatu = {
            "id": id,
            "kodea": kodea,
            "eguna": eguna,
            "hasiera_data": hasiera_data,
            "hasiera_ordua": hasiera_ordua,
            "amaiera_data": amaiera_data,
            "amaiera_ordua": amaiera_ordua,
            "eguneratze_data": eguneratze_data
          };

        console.log(JSON.stringify(jsonEditatu));
        fetch(this.environment + '/public/api/ordutegiak', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
          },
          body: JSON.stringify(jsonEditatu), // Convertir el objeto JSON a una cadena JSON
        })
        .then(response => {
          alert("Se ha actualizado");
          this.cargaLangile();
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });

      }
      ,
      createDatosModal(){
        const kodea=this.kodeaCrear;
        const eguna=this.egunaCrear;
        const hasiera_data=this.hasieradataCrear;
        const hasiera_ordua=this.hasieraorduaCrear;
        const amaiera_data=this.amaieradataCrear;
        const amaiera_ordua=this.amaieraorduaCrear;
        const sortze_data_primaria = new Date();
        const year = sortze_data_primaria.getFullYear();
        const month = ('0' + (sortze_data_primaria.getMonth() + 1)).slice(-2);
        const day = ('0' + sortze_data_primaria.getDate()).slice(-2);
        const hours = ('0' + sortze_data_primaria.getHours()).slice(-2);
        const minutes = ('0' + sortze_data_primaria.getMinutes()).slice(-2);
        const seconds = ('0' + sortze_data_primaria.getSeconds()).slice(-2);
        const sortze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const jsonEditatu = {
            "kodea": kodea,
            "eguna": eguna,
            "hasiera_data": hasiera_data,
            "hasiera_ordua": hasiera_ordua,
            "amaiera_data": amaiera_data,
            "amaiera_ordua": amaiera_ordua,
            "sortze_data": sortze_data
          };
        fetch(this.environment + '/public/api/ordutegiak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
          },
          body: JSON.stringify(jsonEditatu), // Convertir el objeto JSON a una cadena JSON
        })
        .then(response => {
          alert("Se ha creado");
          this.cargaLangile();
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });

      },
      async borrar() {
        let ondo = false;
        try {
          for(var i=0; i < this.arrayId.length; i++){
            const id = this.arrayId[i];
            const ezabatze_data_primaria = new Date();
            const year = ezabatze_data_primaria.getFullYear();
            const month = ('0' + (ezabatze_data_primaria.getMonth() + 1)).slice(-2);
            const day = ('0' + ezabatze_data_primaria.getDate()).slice(-2);
            const hours = ('0' + ezabatze_data_primaria.getHours()).slice(-2);
            const minutes = ('0' + ezabatze_data_primaria.getMinutes()).slice(-2);
            const seconds = ('0' + ezabatze_data_primaria.getSeconds()).slice(-2);
            const ezabatze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const jsonEzabatu = {
              "id": id,
              "ezabatze_data": ezabatze_data
            };
            console.log(JSON.stringify(jsonEzabatu));

            const deleteResponse = await fetch(this.environment + '/public/api/ordutegiak', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonEzabatu),
            });

            if (!deleteResponse.ok) {
              console.log('Errorea ezabatzerakoan');
              throw new Error('Errorea ezabatzerakoan');
            }

            ondo = true;
            this.cargaLangile();
          }
        } catch (error) {
          ondo = false;
          console.error('Errorea:', error);
        }
        if(ondo){
          alert("Eguneratu egin da");
        }

        this.arrayId = [];
      },
      limpiarCampos(){
        this.izenaCrear = "";
        this.abizenaCrear = "";
        this.kodeaCrear = "";
      }
    },
    mounted() {
        // Llama a tu función cargarPagina cuando el componente se monta
        this.cargaLangile();
      }
  });