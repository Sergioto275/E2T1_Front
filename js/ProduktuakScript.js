// Class: ProduktuakScript
// Produktuak kudeatzen duen metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
    arrayId: [],
    izenaActu: "",
    deskribapenaActu: "",
    markaActu: "",
    kategoriaActu: "",
    stockActu: "",
    stockAlertaActu: "",
    izenaCrear: "",
    deskribapenaCrear: "",
    markaCrear: "",
    kategoriaCrear: "",
    stockCrear: "",
    stockAlertaCrear: "",
    listaProduktu: [],
    listaProduktuById: [],
    listaKategoria: [],
    existe: null,
    nombreFil: "",
    kategoriaFil: "first",
    currentLocale: 'es',
    translations: translations,
    environment: environment,
  },
  methods: {
    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: cargaProduktu
    Produktu guztiak kargatzeko.
    */
    async cargaProduktu() {
      try {
        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskaera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaProduktu = datuak
          .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00");

        this.cargarKategoria();
        console.log(this.listaProduktu)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    /* Function: cargarDatosModal
    Editatzeko modalean datu guztiak kargatzeko.
    */
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/produktuak/' + this.arrayId[0], {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskaera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaProduktuById = datuak;
        console.log(this.listaProduktuById);

        this.izenaActu = this.listaProduktuById[0].izena;
        this.deskribapenaActu = this.listaProduktuById[0].deskribapena;
        this.markaActu = this.listaProduktuById[0].marka;
        this.kategoriaActu = this.listaProduktuById[0].id_kategoria;
        this.stockActu = this.listaProduktuById[0].stock;
        this.stockAlertaActu = this.listaProduktuById[0].stock_alerta;
        await this.cargarKategoria();

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: actuDatosModal
    Produktua datu berriekin eguneratzeko.
    */
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.izenaActu;
        const deskribapena = this.deskribapenaActu;
        const id_kategoria = this.kategoriaActu;
        const marka = this.markaActu;
        const stock = this.stockActu;
        const stock_alerta = this.stockAlertaActu;
        const jsonEditatu = {
          "id": id,
          "izena": izena,
          "deskribapena": deskribapena,
          "id_kategoria": id_kategoria,
          "marka": marka,
          "stock": stock,
          "stock_alerta": stock_alerta
        };

        const response = await fetch(this.environment + '/public/api/produktuak', {
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
        await this.cargaProduktu();

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('exampleModalEditar');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    /* Function: createDatosModal
    Produktua berria sortzeko.
    */
    async createDatosModal() {
      try {
        const izena = this.izenaCrear;
        const deskribapena = this.deskribapenaCrear;
        const id_kategoria = this.kategoriaCrear;
        const marka = this.markaCrear;
        const stock = this.stockCrear;
        const stock_alerta = this.stockAlertaCrear;
        const jsonSortu = {
          "izena": izena,
          "deskribapena": deskribapena,
          "id_kategoria": id_kategoria,
          "marka": marka,
          "stock": stock,
          "stock_alerta": stock_alerta
        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/produktuak', {
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
        await this.cargaProduktu();

        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    /* Function: borrar
    Produktuak ezabatzeko.
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

          const deleteResponse = await fetch(this.environment + '/public/api/produktuak', {
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
          this.cargaProduktu();
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
      this.deskribapenaCrear = "";
      this.kategoriaCrear = "";
      this.markaCrear = "";
      this.stockCrear = "";
      this.stockAlertaCrear = "";

      this.cargarKategoria();

    },
    /* Function: cargarKategoria
    Kategoria guztiak kargatzeko.
    */
    async cargarKategoria() {
      try {
        const response = await fetch(this.environment + '/public/api/kategoriak', {
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
        this.listaKategoria = datuak
          .filter(kategoria => kategoria.ezabatze_data === null || kategoria.ezabatze_data === "0000-00-00 00:00:00");

        console.log(this.listaKategoria);
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: filtroNombre
    Izenaren arabera datuak filtratzeko.
    */
    async filtroNombre() {
      console.log("hola")
      try {
        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaProduktu = [];
        const datuak = await response.json();

        this.listaProduktu = datuak
          .filter(produktu => produktu.izena.includes(this.nombreFil) && produktu.ezabatze_data === null || produktu.izena.includes(this.nombreFil) && produktu.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaProduktu.length == 0) {
          this.listaProduktuById = datuak
            .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00");
        }

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: filtroKategoria
    Kategoriaren arabera datuak filtratzeko.
    */
    async filtroKategoria() {
      try {
        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaProduktu = [];
        const datuak = await response.json();

        this.listaProduktu = datuak
          .filter(produktu => produktu.id_kategoria === this.kategoriaFil && produktu.ezabatze_data === null || produktu.id_kategoria === this.kategoriaFil && produktu.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaProduktu.length == 0) {
          this.listaProduktu = datuak
            .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00");

        }

      } catch (error) {
        console.error('Errorea: ', error);
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
    this.cargaProduktu();
  }
});