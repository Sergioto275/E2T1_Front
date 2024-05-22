// Class: TaldeScript
// Taldea-ren metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
    arrayId: [],
    izenaActu: "",
    izenaCrear: "",
    kodeaCrear: "",
    listaTalde: [],
    listaTaldeById: [],
    existe: null,
    nombreFil: "",
    grupoFil: "",
    currentLocale: 'es',
    translations: translations,
    environment: environment,
  },
  methods: {
    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: changeLanguage
    Hizkuntza aldatzeko.
    Parameters:
      locale - Hizkuntza.
    */
    changeLanguage(locale) {
      console.log('Cambiando a:', locale);
      this.currentLocale = locale;
    },
    /* Function: cargaLangile
    Talde guztiak kargatzen ditu.
    */
    async cargaLangile() {
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
          .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    /* Function: cargarDatosModal
    Editatzeko modalean datu guztiak kargatzen ditu.
    */
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/taldeak/' + this.arrayId[0], {
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

        this.listaTaldeById = datuak;
        console.log(this.listaTaldeById);

        this.izenaActu = this.listaTaldeById[0].izena;
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: actuDatosModal
    Taldearen informazioa eguneratzen du.
    */
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.izenaActu;
        const jsonEditatu = {
          "kodea": id,
          "izena": izena
        };

        const response = await fetch(this.environment + '/public/api/taldeak', {
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

        toastr.success(this.translations[this.currentLocale].default.actualizar);
        await this.cargaLangile();

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('exampleModalEditar');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    /* Function: createDatosModal
    Taldearen berria sortzen du.
    */
    async createDatosModal() {
      try {
        const izena = this.izenaCrear;
        const kodea = this.kodeaCrear;
        const jsonSortu = {
          "kodea": kodea,
          "izena": izena
        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/taldeak', {
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

        toastr.success(this.translations[this.currentLocale].default.crear);
        await this.cargaLangile();

        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    /* Function: borrar
    Taldeak ezabatzeko.
    */
    async borrar() {
      let ondo = false;
      try {
        for (var i = 0; i < this.arrayId.length; i++) {
          const id = this.arrayId[i]
          const jsonEzabatu = {
            "kodea": id
          };
          console.log(JSON.stringify(jsonEzabatu));

          const deleteResponse = await fetch(this.environment + '/public/api/taldeak', {
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
        toastr.success(this.translations[this.currentLocale].default.actualizar);
      }

      this.arrayId = [];
    },
    /* Function: filtroNombre
    Izenaren arabera datuak filtratzeko.
    */
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
    /* Function: callFiltro
    Too many request errorea saiesteko timeout txikia filtroa deitzean.
    */
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
    limpiarCampos() {
      this.izenaCrear = "";
      this.abizenaCrear = "";
      this.kodeaCrear = "";
    },
    checkCookie() {
      if(document.cookie==""){
          window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/Login.html";
      }else if(document.cookie=="ikasle"){
        window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/Home.html";
      }
},
  },
  mounted() {
    // Konponentea sortzen denean taula kargatzeko
    this.cargaLangile();
    this.checkCookie();
  }
});
