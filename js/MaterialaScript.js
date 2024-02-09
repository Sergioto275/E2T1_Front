// Class: MaterialaScript
// Materiala kudeatzen duen metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
    arrayId: [],
    etiketaActu: "",
    izenaActu: "",
    etiketaCrear: "",
    izenaCrear: "",
    listaMaterial: [],
    listaMaterialById: [],
    existe: null,
    nombreFil: "",
    currentLocale: 'es',
    translations: translations,
    environment: environment,
  },
  computed: {
    listaFiltradaPorNombre() {
      return this.listaMaterial.filter(langile => {
        return langile.izena.toLowerCase().includes(this.nombreFil.toLowerCase()) &&
               (langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
      });
    }
  },
  methods: {
    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: cargaMaterial
    Materiala kargatzeko taulan.
    */
    async cargaMaterial() {
      try {
        const response = await fetch(this.environment + '/public/api/materiala', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskaera egiterakoan');
          toastr.error(this.translations[this.currentLocale].default.error);
        }

        const datuak = await response.json();

        this.listaMaterial = datuak
          .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00");

        toastr.success(this.translations[this.currentLocale].default.datosCargados);
      } catch (error) {
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);
      }
    },
    /* Function: cargarDatosModal
    Editatzeko erabiliko den modalean datuak kargatzeko.
    */
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/materiala/' + this.arrayId[0], {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskaera egiterakoan');
          toastr.error(this.translations[this.currentLocale].default.error);
        }

        const datuak = await response.json();

        this.listaMaterialById = datuak;

        this.etiketaActu = this.listaMaterialById.etiketa;
        this.izenaActu = this.listaMaterialById.izena;
      } catch (error) {
        console.error('Errorea: ', error);
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);
      }
    },
    /* Function: actuDatosModal
    Materiala eguneratzeko.
    */
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const etiketa = this.etiketaActu;
        const izena = this.izenaActu;
        const jsonEditatu = {
          "id": id,
          "etiketa": etiketa,
          "izena": izena,
        };

        const response = await fetch(this.environment + '/public/api/materiala', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(jsonEditatu),
        });

        if (!response.ok) {
          console.log('Errorea eguneratzerakoan');
          toastr.error(this.translations[this.currentLocale].default.error);
        }

        toastr.success(this.translations[this.currentLocale].default.correcto);
        await this.cargaMaterial();

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('exampleModalEditar');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);

      }
    },
    /* Function: createDatosModal
    Material berria sortzeko.
    */
    async createDatosModal() {
      try {
        const izena = this.izenaCrear;
        const etiketa = this.etiketaCrear;
        const jsonSortu = {
          "izena": izena,
          "etiketa": etiketa,
        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/materiala', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          toastr.error(this.translations[this.currentLocale].default.error);
        }

        toastr.success(this.translations[this.currentLocale].default.correcto);
        await this.cargaMaterial();

        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);
      }
    },
    /* Function: borrar
    Materiala ezabatzeko.
    */
    async borrar() {
      let ondo = false;
      try {
        for (var i = 0; i < this.arrayId.length; i++) {
          const id = this.arrayId[i];
          const jsonEzabatu = {
            "id": id
          };
          console.log(JSON.stringify(jsonEzabatu));

          const deleteResponse = await fetch(this.environment + '/public/api/materiala', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonEzabatu),
          });

          if (!deleteResponse.ok) {
            console.log('Errorea ezabatzerakoan');
            // toastr.error(this.translations[this.currentLocale].default.error);
          }

          ondo = true;
        }
        this.cargaMaterial();
      } catch (error) {
        ondo = false;
        console.error('Errorea:', error);
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);
      }
      if (ondo) {
        toastr.success(this.translations[this.currentLocale].default.correcto);
      }

      this.arrayId = [];
    },
    // Sortzeko modalean aurreko langilearen datuak ez agertzeko
    limpiarCampos() {
      this.izenaCrear = "";
      this.etiketaCrear = "";
    },
    /* Function: filtroNombre
    Izenaren arabera filtratzeko.
    */
    async filtroNombre() {
      try {
        const response = await fetch(this.environment + '/public/api/materiala', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          toastr.error(this.translations[this.currentLocale].default.error);
        }

        this.listaMaterial = [];
        const datuak = await response.json();

        this.listaMaterial = datuak
          .filter(produktu => produktu.izena.includes(this.nombreFil) && produktu.ezabatze_data === null || produktu.izena.includes(this.nombreFil) && produktu.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaMaterial.length == 0) {
          this.listaMaterialById = datuak
            .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00");
        }

      } catch (error) {
        console.error('Errorea: ', error);
        toastr.error(this.translations[this.currentLocale].default.error + " " + error);
      }
    },
    /* Function: changeLanguage
    Hizkuntza aldatzeko.
    Parameters:
      locale - Hizkuntza.
    */
    changeLanguage(locale) {
      console.log('Cambiando a:', locale);
      this.currentLocale = locale;
    }
  },
  mounted() {
    // Konponentea sortzen denean taula kargatzeko
    this.cargaMaterial();
  }
});
