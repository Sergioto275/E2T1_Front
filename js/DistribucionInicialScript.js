new Vue({
  el: '#app',
  data: {
    listaLangile: [],
    listaTalde: [],
    listaTxandaCont: [],
    listaTxandaLast: [],
    listaFiltroTalde: [],
    grupoSeleccionado: "",
    tareaSeleccionado: "",
    langileSeleccionado: "",
    environment: 'http://localhost/Erronka2/Back/talde1erronka2',
  },
  methods: {
    changeEnvironment(env) {
      this.environment = env;
    },
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
          .filter(langile => langile.ezabatze_data === null && langile.kodea == this.grupoSeleccionado || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.kodea == this.grupoSeleccionado);

        this.cargarTxanda();
        console.log(this.listaLangile)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
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
        this.listaTalde = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");



        console.log(this.listaTalde);
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
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
          console.log(this.listaTxandaCont)
        }

        for (let index = 0; index < this.listaTxandaCont.length; index++) {
          if (typeof this.listaTxandaCont[index].id_langilea === 'number' && Number.isInteger(this.listaTxandaCont[index].id_langilea)) {
            this.listaTxandaCont.splice(index, 1);
          }
        }

        for (let index = 0; index < datuak.length; index++) {
          console.log(datuak[index]["sortze_data"])
          const cadenaFecha = datuak[index]["sortze_data"];
          const fechaEjemplo = new Date(cadenaFecha);
          const fechaActual = new Date();
          const fechaSemanaPasada = new Date(fechaActual);
          fechaSemanaPasada.setDate(fechaSemanaPasada.getDate() - 7);
          if (fechaEjemplo > fechaSemanaPasada && fechaEjemplo <= fechaActual) {
            var persona = { id_langilea: datuak[index]["id_langilea"], mota: datuak[index]["mota"] };
            this.listaTxandaLast.push(persona);
            console.log(this.listaTxandaLast)
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
          console.log(this.listaTxandaCont)
        }



        console.log(this.listaTxandaCont);
      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async createDatos() {
      try {
        const id_langilea = this.langileSeleccionado;
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
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        alert('Sortu da');
        await this.cargarTxanda();
        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    }
  },


  mounted() {
    // Konponentea sortzen denean taula kargatzeko
    this.cargarTalde();
  }
});