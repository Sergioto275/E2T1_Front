new Vue({
    el: '#app',
    data: {
      selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
      arrayId :[],
      izenaActu:"",
      abizenaActu:"",
      kodeaActu:"",
      izenaCrear:"",
      materialFil:"",
      abizenaCrear:"",
      kodeaCrear:"",
      materialActu:"",
      langileActu:"",
      listaDevolver:[],
      listaLangile:[],
      listaMaterial:[],
      listaLangileById:[],
      existe: null,
      nombreFil:"",
      grupoFil:"",
      fechaFil:"",
      currentLocale: 'es',
      translations: translations,
      environment: environment,
    },
    computed: {
      listaFiltradaPorNombre() {
        return this.listaLangile.filter(langile => {
          return langile.izena.toLowerCase().includes(this.nombreFil.toLowerCase()) &&
                 (langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        });
      }
    },
    methods: {
      changeEnvironment(env){
        this.environment = env;
      },
      // Langilea guztiak taulan kargatu
      async cargaLangile() {
        console.log("Hello")
        try {
          const response = await fetch(this.environment + '/public/api/devolver', {
            mode: 'cors',
            headers: {  
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaDevolver = datuak
          .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");

        this.cargarComboBox();
        console.log(this.listaDevolver)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    async cargarDatosSinEntregar() {
      console.log("Hello")
      try {
        const response = await fetch(this.environment + '/public/api/devolver', {
          mode: 'cors',
          headers: {  
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

      if (!response.ok) {
        console.log('Errorea eskera egiterakoan');
        throw new Error('Errorea eskaera egiterakoan');
      }

      const datuak = await response.json();

      this.listaDevolver = datuak
        .filter(langile => langile.ezabatze_data === null && langile.amaiera_data==null || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.amaiera_data==null);

      this.cargarComboBox();
      console.log(this.listaDevolver)
    } catch (error) {
      console.error('Errorea:', error);
    }
  },
    //Editatzeko modalean aukeratutako langilearen datuak kargatzeko
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/devolver/' + this.arrayId[0], {
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaLangileById = datuak;
        console.log(this.listaLangileById);

        this.langileActu = this.listaLangileById.langilea_izena;
        this.materialActu = this.listaLangileById.materiala_izena;
        await this.cargarComboBox();

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    // Langilearen datuak eguneratzeko
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.langileActu;
        const abizenak = this.materialActu;
        const jsonEditatu = {
          "id": id,
          "id_langilea": izena,
          "id_materiala": abizenak,
        };

        const response = await fetch(this.environment + '/public/api/devolver', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(jsonEditatu),
        });

        if (!response.ok) {
          console.log('Errorea eguneratzerakoan');
          throw new Error('Errorea eguneratzerakoan');
        }

        alert('Ondo eguneratuta');
        await this.cargaLangile();

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('exampleModalEditar');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async devolver() {
      for (let index = 0; index < this.arrayId.length; index++) {
        try {
          const id = this.arrayId[index];
          const jsonEditatu = [
            {
              "id": id,
            }
          ];
          
          const response = await fetch(this.environment + '/public/api/materiala/bueltatu', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonEditatu),
          });
    
          if (!response.ok) {
            console.log('Errorea eguneratzerakoan');
            throw new Error('Errorea eguneratzerakoan');
          }
    
          await this.cargaLangile();
    
          //Modal-a ixteko ondo egiten duenean
          const modalEditarElement = document.getElementById('exampleModalEditar');
          const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
          modalInst.hide();
        } catch (error) {
          console.log('Errorea: ', error);
        }
      }
      
    }
    ,
    // Sortzeko modalean aurreko langilearen datuak ez agertzeko
    limpiarCampos() {
      this.izenaCrear = "";
      this.abizenaCrear = "";
      this.kodeaCrear = "";

      this.cargarComboBox();

    },
    async cargarComboBox() {
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
        this.listaLangile = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");

        console.log(this.listaLangile);
      } catch (error) {
        console.error('Errorea: ', error);
      }

      try {
        const response = await fetch(this.environment + '/public/api/materiala', {
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
        this.listaMaterial = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");

        console.log(this.listaMaterial);
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async filtroFecha() {
      try {
        const response = await fetch(this.environment + '/public/api/devolver', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });
    
        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }
    
        this.listaDevolver = [];
        const datuak = await response.json();
    
        if(this.materialFil!=""){
          this.listaDevolver = datuak
          .filter(kolore => {
            // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
            return kolore.hasiera_data.includes(this.fechaFil) && kolore.id_materiala == this.materialFil && (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
          });
        }else{
          this.listaDevolver = datuak
          .filter(kolore => {
            // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
            return kolore.hasiera_data.includes(this.fechaFil) && (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
          });
        }
        
    
        if (this.listaDevolver.length == 0) {
          this.listaDevolver = datuak
            .filter(kolore => {
              // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
              return kolore.hasiera_data.includes(this.fechaFil) && (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
            });
        }
    
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async fitroMaterial() {
      console.log(this.fechaFil)
      try {
        const response = await fetch(this.environment + '/public/api/devolver', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });
    
        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }
    
        this.listaDevolver = [];
        const datuak = await response.json();
    
        if(this.fechaFil!=""){
          this.listaDevolver = datuak
          .filter(kolore => {
            // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
            return kolore.id_materiala == this.materialFil && (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
          });
        }else{
          this.listaDevolver = datuak
          .filter(kolore => {
            // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
            return kolore.hasiera_data.includes(this.fechaFil) && kolore.id_materiala == this.materialFil && (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
          });
        }
        
    
        if (this.listaDevolver.length == 0) {
          this.listaDevolver = datuak
            .filter(kolore => {
              // Comparar si la fecha en formato "2024-01-31 08:36:23" incluye la fecha en formato "31/01/2024"
              return (kolore.ezabatze_data === null || kolore.ezabatze_data === "0000-00-00 00:00:00");
            });
        }
    
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
      convertirFecha(fecha) {
        const partes = fecha.split('/');
        const fechaConvertida = partes[2] + '-' + partes[1] + '-' + partes[0] + ' 00:00:00';
        return fechaConvertida;
      },
      changeLanguage(locale) {
        console.log('Cambiando a:', locale);
        this.currentLocale = locale;
      }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaLangile();
      }
  });
