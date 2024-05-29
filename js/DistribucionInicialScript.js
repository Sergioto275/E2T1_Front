// Class: DistribucionInicialScript
// Hasierako egoera kudeatzen duen metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    listaLangile: [],
    listaTalde: [],
    listaOrdutegi: [],
    listaTxandaCont: [],
    listaTxandaContLimpia: [],
    listaTxandaDepurar: [],
    listaTxandaLast: [],
    listaFiltroTalde: [],
    grupoSeleccionado: "",
    tareaSeleccionado: "",
    langileSeleccionado: "",
    currentLocale: 'es',
    translations: translations,
    environment: environment,
  },

  methods: {
    retroceder(){ 
      window.history.back(); 
  }, 

    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: cargaLangile
    Langileak kargatzeko.
    */
    async cargaLangile() {
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
        console.log(this.grupoSeleccionado)
        this.listaLangile = datuak
          .filter(langile => langile.ezabatze_data == null && langile.kodea == this.grupoSeleccionado || langile.ezabatze_data == "0000-00-00 00:00:00" && langile.kodea == this.grupoSeleccionado);

        console.log(this.listaLangile)
        this.cargarTxanda();
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    /* Function: cargarTalde
    Taldeak kargatzeko.
    */
    async cargarTalde() {
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
        console.log(datuak);
        this.listaTalde = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");
      } catch (error) {
        console.error('Errorea: ', error);
      }

      this.listaOrdutegi = [];
      fetch(this.environment + '/public/api/ordutegiak')
        .then(dato => {
          return dato.json();
        })
        .then(datos => {
          for (var i = 0; i < datos.length; i++) {

            if (datos[i].ezabatze_data === null || datos[i].ezabatze_data === "0000-00-00 00:00:00") {
              this.listaOrdutegi.push(datos[i]);

              const cadenaFecha = datos[i]["hasiera_data"];
              const fechaEjemplo = new Date(cadenaFecha);
              const fechaActual = new Date();
              const fecha1SoloFecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
              const fecha2SoloFecha = new Date(fechaEjemplo.getFullYear(), fechaEjemplo.getMonth(), fechaEjemplo.getDate());
              if (fecha1SoloFecha.getTime() === fecha2SoloFecha.getTime()) {
                console.log("HOla")
                this.grupoSeleccionado = datos[i]["kodea"];
              }
            }
          }
          if (this.grupoSeleccionado == "") {
            console.log("llegue")
            this.grupoSeleccionado = this.listaOrdutegi[0]["kodea"];
          }
          this.cargaLangile();

        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });

    },
    /* Function: cargarTxanda
    Txanda guztiak kargatzeko.
    */
    async cargarTxanda() {
      this.listaTxandaCont = []
      this.listaTxandaLast = []

      try {
        const response = await fetch(this.environment + '/public/api/txanda', {
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
        console.log(datuak);
        for (let index = 0; index < datuak.length; index++) {
          if (this.listaTxandaCont.length === 0) {
            if (datuak[index]["mota"] === "G") {
              var persona = { id_langilea: datuak[index]["id_langilea"], limpieza: 1, mostrador: 0 };
              this.listaTxandaCont.push(persona);
            } else {
              var persona = { id_langilea: datuak[index]["id_langilea"], limpieza: 0, mostrador: 1 };
              this.listaTxandaCont.push(persona);
            }
          } else {
            let encontrado = false;
            for (let i = 0; i < this.listaTxandaCont.length; i++) {
              if (this.listaTxandaCont[i]["id_langilea"] == datuak[index]["id_langilea"]) {
                encontrado = true;
                if (datuak[index]["mota"] === "G") {
                  this.listaTxandaCont[i].limpieza++;
                } else {
                  this.listaTxandaCont[i].mostrador++;
                }
              }
            }
            if (!encontrado) {
              if (datuak[index]["mota"] === "G") {
                var persona = { id_langilea: datuak[index]["id_langilea"], limpieza: 1, mostrador: 0 };
                this.listaTxandaCont.push(persona);
              } else {
                var persona = { id_langilea: datuak[index]["id_langilea"], limpieza: 0, mostrador: 1 };
                this.listaTxandaCont.push(persona);
              }
            }
          }
        }

        for (let a = 0; a < this.listaTxandaCont.length; a++) {
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
            const datuak = await response.json()
            this.listaFiltroTalde = datuak
              .filter(langile => langile.ezabatze_data === null && langile.kodea == this.grupoSeleccionado || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.kodea == this.grupoSeleccionado);

            for (let c = 0; c < this.listaFiltroTalde.length; c++) {
              if (this.listaTxandaCont[a].id_langilea == this.listaFiltroTalde[c]["id"]) {

                this.listaTxandaCont[a].id_langilea = this.listaFiltroTalde[c]["izena"] + " " + this.listaFiltroTalde[c]["abizenak"];
                console.log(this.listaTxandaCont[a].id_langilea)
              }
            }
          } catch (error) {

          }
        }

        for (let index = 0; index < this.listaTxandaCont.length; index++) {
          if (typeof this.listaTxandaCont[index].id_langilea === 'number' && Number.isInteger(this.listaTxandaCont[index].id_langilea)) {
            this.listaTxandaCont.splice(index, 1);
          }
        }

        this.listaTxandaContLimpia = this.listaTxandaCont
          .filter(langile => isNaN(langile.id_langilea));


        console.log(this.listaTxandaContLimpia);

        for (let index = 0; index < datuak.length; index++) {
          const cadenaFecha = datuak[index]["sortze_data"];
          const fechaEjemplo = new Date(cadenaFecha);
          const fechaActual = new Date();
          const fechaSemanaPasada = new Date(fechaActual);
          fechaSemanaPasada.setDate(fechaSemanaPasada.getDate() - 7);
          if (fechaEjemplo > fechaSemanaPasada && fechaEjemplo <= fechaActual) {
            var persona = { id_langilea: datuak[index]["id_langilea"], mota: datuak[index]["mota"] };
            var listaTxandaLastStrings = this.listaTxandaLast.map(item => JSON.stringify(item));
            var personaString = JSON.stringify(persona);
            if (listaTxandaLastStrings.includes(personaString)) {
            } else {
              this.listaTxandaLast.push(persona);
            }

          }
        }

        for (let a = 0; a < this.listaTxandaLast.length; a++) {
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
            const datuak = await response.json()
            this.listaFiltroTalde = datuak
              .filter(langile => langile.ezabatze_data === null && langile.kodea == this.grupoSeleccionado || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.kodea == this.grupoSeleccionado);

            for (let c = 0; c < this.listaFiltroTalde.length; c++) {
              if (this.listaTxandaLast[a].id_langilea == this.listaFiltroTalde[c]["id"]) {

                this.listaTxandaLast[a].id_langilea = this.listaFiltroTalde[c]["izena"] + " " + this.listaFiltroTalde[c]["abizenak"];
                console.log(this.listaTxandaLast[a].id_langilea)
              }
            }


          } catch (error) {

          }
        }


      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: createDatos
    Datu berriak sortzeko.
    */
    async createDatos() {
      try {
        const id_langilea = this.langileSeleccionado;
        const kodea = this.grupoSeleccionado
        const mota = this.tareaSeleccionado;
        const sortze_data_primaria = new Date();
        const year = sortze_data_primaria.getFullYear();
        const month = ('0' + (sortze_data_primaria.getMonth() + 1)).slice(-2);
        const day = ('0' + sortze_data_primaria.getDate()).slice(-2);
        const hours = ('0' + sortze_data_primaria.getHours()).slice(-2);
        const minutes = ('0' + sortze_data_primaria.getMinutes()).slice(-2);
        const seconds = ('0' + sortze_data_primaria.getSeconds()).slice(-2);
        const sortze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const jsonSortu = {
          "id_langilea": id_langilea,
          "kodea": kodea,
          "mota": mota,
          "data": sortze_data,
          "sortze_data": sortze_data
        };

        console.log(JSON.stringify(jsonSortu));
        const response = await fetch(this.environment + '/public/api/txanda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
        });

        if (!response.ok) {
          toastr.error(this.translations[this.currentLocale].default.exist);
          console.log(response + 'Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        toastr.success(this.translations[this.currentLocale].default.crear);
        await this.cargarTxanda();
        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
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
      localStorage.setItem('selectedLocale', locale); // Guardar en localStorage
    },
    checkCookie() {
      if (document.cookie == "") {
        window.location.href = "http://localhost/Erronka2/Front/Login.html";
      }
    }
  },


  mounted() {
    const savedLocale = localStorage.getItem('selectedLocale');
    if (savedLocale) {
        this.currentLocale = savedLocale;
    }
    // Konponentea sortzen denean taula kargatzeko
    this.cargarTalde();
    this.checkCookie();
  }
});