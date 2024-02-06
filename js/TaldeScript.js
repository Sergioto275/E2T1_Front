new Vue({
    el: '#app',
    data: {
      selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
      arrayId :[],
      izenaActu:"",
      izenaCrear:"",
      kodeaCrear:"",
      listaTalde:[],
      listaTaldeById:[],
      existe: null,
      nombreFil:"",
      grupoFil: "",
      currentLocale: 'es',
      translations: translations,
      environment: environment,
    },
    methods: {
      changeEnvironment(env){
        this.environment = env;
      },
      changeLanguage(locale) {
        console.log('Cambiando a:', locale);
        this.currentLocale = locale;
      },
      // Langilea guztiak taulan kargatu
      async cargaLangile() {
        try {
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
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

          this.listaTalde = datuak
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        } catch (error) {
          console.error('Errorea:', error);
        }
      },
      //Editatzeko modalean aukeratutako langilearen datuak kargatzeko
      async cargarDatosModal(){
        try{
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeaklortubycode/'+this.arrayId[0], {
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

          this.listaTaldeById = datuak;
          console.log(this.listaTaldeById);

          this.izenaActu = this.listaTaldeById[0].izena;
        } catch (error){
          console.error('Errorea: ', error);
        }
      },
      // Langilearen datuak eguneratzeko
      async actuDatosModal(){
        try{
          const id=this.arrayId[0];
          const izena=this.izenaActu;
          const jsonEditatu = {
            "kodea": id,
            "izena": izena
          };

          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonEditatu),
          });

          if(!response.ok){
            console.log('Errorea eguneratzerakoan');
            throw new Error('Errorea eguneratzerakoan');
          }
          
          alert('Ondo eguneratuta');
          await this.cargaLangile();

          //Modal-a ixteko ondo egiten duenean
          const modalEditarElement = document.getElementById('exampleModalEditar');
          const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
          modalInst.hide();
        } catch(error){
          console.log('Errorea: ', error);
        }
      },
      // Langile berri bat sortzeko
      async createDatosModal(){
        try{
          const izena=this.izenaCrear;
          const kodea=this.kodeaCrear;
          const jsonSortu = {
            "kodea": kodea,
            "izena": izena
          };

          console.log(JSON.stringify(jsonSortu));

          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
          });

          if(!response.ok){
            console.log('Errorea sortzerakoan');
            throw new Error('Errorea sortzerakoan');
          }

          alert('Sortu da');
          await this.cargaLangile();

          //Modal-a ixteko ondo sortzen duenean
          const modalCrearElement = document.getElementById('exampleModalCrear');
          const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
          modalInst.hide();
        } catch(error){
          console.log('Errorea: ', error);
        }
      },
      // Langileak ezabatzeko
      async borrar() {
        let ondo = false;
        try {
          for(var i=0; i < this.arrayId.length; i++){
            const id = this.arrayId[i]
            const jsonEzabatu = {
              "kodea": id
            };
            console.log(JSON.stringify(jsonEzabatu));

            const deleteResponse = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
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
      async filtroNombre() {
        console.log(this.nombreFil)
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
  
          this.listaTalde = [];
          const datuak = await response.json();
  
          this.listaTalde = datuak
            .filter(bezero => bezero.kodea.includes(this.nombreFil) && bezero.ezabatze_data === null || bezero.kodea.includes(this.nombreFil) && bezero.ezabatze_data === "0000-00-00 00:00:00");
  
          if (this.listaTalde.length == 0) {
            this.listaTalde = datuak
              .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
          }
  
        } catch (error) {
          console.error('Errorea: ', error);
        }
      },
      callFiltro() {
        // Borra el timeout anterior (si existe)
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
  
        // Inicia un nuevo timeout para ejecutar la búsqueda después de 500 ms
        this.searchTimeout = setTimeout(() => {
          this.filtroNombre();
        }, 500);
      },
      // Sortzeko modalean aurreko langilearen datuak ez agertzeko
      limpiarCampos(){
        this.izenaCrear = "";
        this.abizenaCrear = "";
        this.kodeaCrear = "";
      }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaLangile();
      }
  });