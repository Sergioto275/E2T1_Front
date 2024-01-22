new Vue({
    el: '#app',
    data: {
      selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
      arrayId :[],
      izenaActu:"",
      abizenaActu:"",
      kodeaActu:"",
      izenaCrear:"",
      abizenaCrear:"",
      kodeaCrear:"",
      listaLangile:[],
      listaTalde:[],
      listaLangileById:[],
      existe: null,
      nombreFil:"",
      grupoFil:"",
      currentLocale: 'es',
      translations: translations,
      environment: 'https://localhost/Erronka2/Back/talde1erronka2',
    },
    methods: {
      changeEnvironment(env){
        this.environment = env;
      },
      // Langilea guztiak taulan kargatu
      async cargaLangile() {
        console.log("Hello")
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
          .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");

        this.cargarComboBox();
        console.log(this.listaLangile)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    //Editatzeko modalean aukeratutako langilearen datuak kargatzeko
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/langileak/' + this.arrayId[0], {
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

        this.listaLangileById = datuak;
        console.log(this.listaLangileById);

        this.izenaActu = this.listaLangileById.izena;
        this.abizenaActu = this.listaLangileById.abizenak;
        this.kodeaActu = this.listaLangileById.kodea;
        await this.cargarComboBox();

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    // Langilearen datuak eguneratzeko
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.izenaActu;
        const abizenak = this.abizenaActu;
        const kodea = this.kodeaActu;
        const jsonEditatu = {
          "id": id,
          "izena": izena,
          "abizenak": abizenak,
          "kodea": kodea
        };

        const response = await fetch(this.environment + '/public/api/langileak', {
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
    // Langile berri bat sortzeko
    async createDatosModal() {
      try {
        const izena = this.izenaCrear;
        const abizenak = this.abizenaCrear;
        const kodea = this.kodeaCrear;
        const jsonSortu = {
          "izena": izena,
          "abizenak": abizenak,
          "kodea": kodea
        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/langileak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        alert('Sortu da');
        await this.cargaLangile();

        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    // Langileak ezabatzeko
    async borrar() {
      let ondo = false;
      try {
        for (var i = 0; i < this.arrayId.length; i++) {
          const id = this.arrayId[i];
          const jsonEzabatu = {
            "id": id
          };
          console.log(JSON.stringify(jsonEzabatu));

          const deleteResponse = await fetch(this.environment + '/public/api/langileak', {
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
      if (ondo) {
        alert("Eguneratu egin da");
      }

      this.arrayId = [];
    },
    // Sortzeko modalean aurreko langilearen datuak ez agertzeko
    limpiarCampos() {
      this.izenaCrear = "";
      this.abizenaCrear = "";
      this.kodeaCrear = "";

      this.cargarComboBox();

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
        this.listaTalde = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");

        console.log(this.listaTalde);
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async filtroNombre() {
      console.log("hola")
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

        this.listaLangile = [];
        const datuak = await response.json();

        this.listaLangile = datuak
          .filter(langile => langile.izena.includes(this.nombreFil) && langile.ezabatze_data === null || langile.izena.includes(this.nombreFil) && langile.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaLangile.length == 0) {
          this.listaLangileById = datuak
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        }

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async filtroGrupo() {
      console.log("hola")
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

        this.listaLangile = [];
        const datuak = await response.json();

        this.listaLangile = datuak
          .filter(langile => langile.kodea === this.grupoFil && langile.ezabatze_data === null || langile.kodea === this.grupoFil && langile.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaLangile.length == 0) {
          this.listaLangile = datuak
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");

        }

        } catch (error){
          console.error('Errorea: ', error);
        }
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
