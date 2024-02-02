new Vue({
  el: '#app',
  data: {
    searchTimeout:null,
    listaBezero: [],
    listaBezeroById: [],
    listaKolore: [],
    listaKoloreById: [],
    arrayId: [],
    arrayId2: [],
    arrayComboBoxMarka: [],
    arrayComboBoxTinte: [],
    bezeroSeleccionado: "",
    tinteFiltr:"",
    izenaEditar: "",
    izenaCrear: "",
    telefonoCrear: "",
    telefonoEditar: "",
    pielCrear: "",
    filtrNom: "",
    pielEditar: "",
    abizenaCrear: "",
    abizenaEditar: "",
    fechaCrear: "",
    fechaDefault: "",
    fechaEditar: "",
    casaCrear: "",
    casaEditar: "",
    casaFiltr:"",
    tinteCrear: "",
    tinteEditar: "",
    cantidadCrear: "",
    cantidadEditar: "",
    volumenesCrear: "",
    volumenesEditar: "",
    observacionesCrear: "",
    observacionesEditar: "",
    fechaFil:"",
    currentLocale: 'es',
    translations: translations,
    environment: 'http://localhost/Erronka2/Back/talde1erronka2',
  },
  methods: {
    changeEnvironment(env) {
      this.environment = env;
    },
    // Langilea guztiak taulan kargatu
    async cargaBezeroa() {
      console.log("Hello")
      try {
        const response = await fetch(this.environment + '/public/api/bezero', {
          mode: 'cors',
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

        this.listaBezero = datuak
          .filter(bezero => bezero.ezabatze_data === null || bezero.ezabatze_data === "0000-00-00 00:00:00");

        console.log(this.listaBezero)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    async cargaFitxa(bezero) {
      try {
        this.bezeroSeleccionado = bezero;
        const response = await fetch(this.environment + '/public/api/kolore', {
          mode: 'cors',
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

        this.fechaFil="";
        this.listaKolore = datuak
          .filter(kolore => kolore.ezabatze_data === null && kolore.id_bezeroa == bezero || kolore.ezabatze_data === "0000-00-00 00:00:00" && kolore.id_bezeroa == bezero);

        this.bezeroSeleccionado = this.listaBezero.filter(item => item.id === bezero);

        this.gestionarCombobox();

        const fecha = new Date(); // Puedes sustituir esto con tu objeto Date
        const fechaFormateada = this.formatDateToYYYYMMDD(fecha);
        this.crearFecha = fechaFormateada;
        console.log(this.listaKolore)
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    limpiarCampos() {

      this.izenaCrear = "";
      this.abizenaCrear = "";
      this.telefonoCrear = "";
      this.pielCrear = "";


      // this.cargarComboBox();

    },
    async crearDatosModal() {
      try {
        const izena = this.izenaCrear;
        const abizenak = this.abizenaCrear;
        const telefonoa = this.telefonoCrear;
        var piel = "";
        if (this.pielCrear == true) {
          piel = "E";
        } else {
          piel = "";

        }
        const jsonSortu = {
          "izena": izena,
          "abizena": abizenak,
          "telefonoa": telefonoa,
          "azal_sentikorra": piel

        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/bezero', {
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
        await this.cargaBezeroa();
        
        this.limpiarCampos();
        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('exampleModalCrear');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async cargarDatosModal() {
      try {
        const response = await fetch(this.environment + '/public/api/bezero/' + this.arrayId[0], {
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaBezeroById = datuak;
        console.log(this.listaBezeroById);

        this.izenaEditar = this.listaBezeroById.izena;
        this.abizenaEditar = this.listaBezeroById.abizena;
        this.telefonoEditar = this.listaBezeroById.telefonoa;
        if (this.listaBezeroById.azal_sentikorra) {
          this.pielEditar = true;
        } else {
          this.pielEditar = false;
        }

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.izenaEditar;
        const abizenak = this.abizenaEditar;
        const telefonoa = this.telefonoEditar;
        var piel = "";
        if (this.pielEditar == true) {
          piel = "E";
        } else {
          piel = "";

        };
        const jsonEditatu = {
          "id": id,
          "izena": izena,
          "abizena": abizenak,
          "telefonoa": telefonoa,
          "azal_sentikorra": piel
        };

        console.log(JSON.stringify(jsonEditatu))
        const response = await fetch(this.environment + '/public/api/bezero', {
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
        await this.cargaBezeroa();

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('modalModificarCliente');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
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
        const modalCrearElement = document.getElementById('modalCrearCliente');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    }, async borrar() {
      let ondo = false;
      try {
        for (var i = 0; i < this.arrayId.length; i++) {
          const id = this.arrayId[i];
          const jsonEzabatu = {
            "id": id
          };
          console.log(JSON.stringify(jsonEzabatu));

          const deleteResponse = await fetch(this.environment + '/public/api/bezero', {
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
          this.cargaBezeroa();
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
    async filtroNombre() {
      console.log(this.filtrNom)
      try {
        const response = await fetch(this.environment + '/public/api/bezero', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaBezero = [];
        const datuak = await response.json();

        this.listaBezero = datuak
          .filter(bezero => bezero.izena.includes(this.filtrNom) && bezero.ezabatze_data === null || bezero.izena.includes(this.filtrNom) && bezero.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaBezero.length == 0) {
          this.listaBezeroById = datuak
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
    async createDatosModal2() {
      try {
        const data = this.fechaCrear;
        const id_bezeroa = this.bezeroSeleccionado[0].id
        const id_produktua = this.tinteCrear;
        const kantitatea = this.cantidadCrear;
        const bolumena = this.volumenesCrear;
        const oharrak = this.observacionesCrear;
        const jsonSortu = {
          "data": data,
          "id_bezeroa": id_bezeroa,
          "id_produktua": id_produktua,
          "kantitatea": kantitatea,
          "bolumena": bolumena,
          "oharrak": oharrak,
        };

        console.log(JSON.stringify(jsonSortu));

        const response = await fetch(this.environment + '/public/api/kolore', {
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
        await this.cargaFitxa(this.bezeroSeleccionado[0].id);

        //Modal-a ixteko ondo sortzen duenean
        const modalCrearElement = document.getElementById('modalCrearResgistro');
        const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async gestionarCombobox() {
      try {

        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        const datuak = await response.json();

        for (let i = 0; i < datuak.length; i++) {
          if (this.arrayComboBoxMarka.length == 0) {
            var marka = datuak[i].marka
            this.arrayComboBoxMarka.push(marka)
            console.log("hola")

          } else {
            if (this.arrayComboBoxMarka.includes(datuak[i].marka)) {
              console.log("hola")
            } else {
              var marka = datuak[i].marka
              this.arrayComboBoxMarka.push(marka)
            }
          }

          if (this.arrayComboBoxTinte.length == 0) {
            var tinte = { "id": datuak[i].id, "izena": datuak[i].izena, "marka": datuak[i].marka }
            this.arrayComboBoxTinte.push(tinte)
          } else {

            var tinte = { "id": datuak[i].id, "izena": datuak[i].izena, "marka": datuak[i].marka }
            this.arrayComboBoxTinte.push(tinte)

          }
        }


      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async filtrarComboTintes() {
      try {

        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        const datuak = await response.json();
        this.arrayComboBoxTinte = datuak
          .filter(tinte => tinte.marka == this.casaCrear && tinte.ezabatze_data === null || tinte.marka == this.casaCrear && tinte.ezabatze_data === "0000-00-00 00:00:00");



      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async filtrarComboTintesActu() {
      try {

        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        const datuak = await response.json();
        this.arrayComboBoxTinte = datuak
          .filter(tinte => tinte.marka == this.casaEditar && tinte.ezabatze_data === null || tinte.marka == this.casaEditar && tinte.ezabatze_data === "0000-00-00 00:00:00");



      } catch (error) {
        console.log('Errorea: ', error);
      }
      
    },
    async filtrarComboTintesFiltr() {
      try {

        const response = await fetch(this.environment + '/public/api/produktuak', {
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        const datuak = await response.json();
        
          if(this.casaFiltr!=""){
            console.log("Hola")
            this.arrayComboBoxTinte = datuak
            .filter(tinte => tinte.marka == this.casaFiltr && tinte.ezabatze_data === null || tinte.marka == this.casaFiltr && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }else{
            this.arrayComboBoxTinte = datuak
            .filter(tinte => tinte.ezabatze_data === null || tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }


      } catch (error) {
        console.log('Errorea: ', error);
      }

      try {

        const response = await fetch(this.environment + '/public/api/kolore', {
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea sortzerakoan');
          throw new Error('Errorea sortzerakoan');
        }

        const datuak = await response.json();
          if(this.casaFiltr!=""){
            this.listaKolore = datuak
            .filter(tinte => tinte.produktua_marka == this.casaFiltr && tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === null || tinte.produktua_marka == this.casaFiltr && tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }else{
            this.listaKolore = datuak
            .filter(tinte => tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === null || tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }

      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    formatDateToYYYYMMDD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${day}/${month}/${year}`;
    },
    async cargarDatosModal2() {
      try {
        const response = await fetch(this.environment + '/public/api/kolore/' + this.arrayId2[0], {
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        const datuak = await response.json();

        this.listaKoloreById = datuak;
        console.log(this.listaBezeroById);

        this.fechaEditar = this.listaKoloreById[0].data;
        this.casaEditar = this.listaKoloreById[0].produktua_marka;
        this.tinteEditar = this.listaKoloreById[0].id_produktua;
        this.cantidadEditar = this.listaKoloreById[0].kantitatea;
        this.volumenesEditar = this.listaKoloreById[0].bolumena;
        this.observacionesEditar = this.listaKoloreById[0].oharrak;

      } catch (error) {
        console.error('Errorea: ', error);
      }
    }
    ,
    async actuDatosModal2() {
      try {
        const id = this.arrayId2[0];
        const data = this.fechaEditar;
        const id_bezeroa = this.bezeroSeleccionado[0].id
        const id_produktua = this.tinteEditar;
        const kantitatea = this.cantidadEditar;
        const bolumena = this.volumenesEditar;
        const oharrak = this.observacionesEditar;
        const jsonEditatu = {
          "id": id,
          "data": data,
          "id_bezeroa": id_bezeroa,
          "id_produktua": id_produktua,
          "kantitatea": kantitatea,
          "bolumena": bolumena,
          "oharrak": oharrak,
        };



        console.log(JSON.stringify(jsonEditatu))
        const response = await fetch(this.environment + '/public/api/kolore', {
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
        await this.cargaFitxa(this.bezeroSeleccionado[0].id);

        //Modal-a ixteko ondo egiten duenean
        const modalEditarElement = document.getElementById('modalEditarResgistro');
        const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
        modalInst.hide();
      } catch (error) {
        console.log('Errorea: ', error);
      }
    },
    async borrar2() {
      console.log("hola")
      let ondo = false;
      try {
        for (var i = 0; i < this.arrayId2.length; i++) {
          const id = this.arrayId2[i];
          const jsonEzabatu = {
            "id": id
          };
          console.log(JSON.stringify(jsonEzabatu));
  
          const deleteResponse = await fetch(this.environment + '/public/api/kolore', {
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
          this.cargaFitxa(this.bezeroSeleccionado[0].id);
        }
      } catch (error) {
        ondo = false;
        console.error('Errorea:', error);
      }
      if (ondo) {
        alert("Eguneratu egin da");
      }
  
      this.arrayId2 = [];
    },
    async filtroFecha() {
      console.log("holaaaaaaaaaaaaaaaa")
      try {
        const response = await fetch(this.environment + '/public/api/kolore', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaKolore = [];
        const datuak = await response.json();

        this.listaKolore = datuak
          .filter(kolore => kolore.data == this.fechaFil && kolore.id_bezeroa == this.bezeroSeleccionado[0].id && kolore.ezabatze_data === null || kolore.data == this.fechaFil && kolore.id_bezeroa == this.bezeroSeleccionado[0].id && kolore.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaKolore.length == 0) {
          this.listaKolore = datuak
            .filter(kolore => kolore.data == this.fechaFil && kolore.id_bezeroa == this.bezeroSeleccionado[0].id && kolore.ezabatze_data === null || kolore.data == this.fechaFil && kolore.id_bezeroa == this.bezeroSeleccionado[0].id && kolore.ezabatze_data === "0000-00-00 00:00:00");
        }

        } catch (error){
          console.error('Errorea: ', error);
        }
      },
      callFiltro2() {
        // Borra el timeout anterior (si existe)
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
  
        // Inicia un nuevo timeout para ejecutar la búsqueda después de 500 ms
        this.searchTimeout = setTimeout(() => {
          this.filtroFecha();
        }, 500);
      },
      async filtrarPorTintes() {
        try {
  
          const response = await fetch(this.environment + '/public/api/kolore', {
            headers: {
              'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
              'Access-Control-Allow-Origin': '*'
            },
          });
  
          if (!response.ok) {
            console.log('Errorea sortzerakoan');
            throw new Error('Errorea sortzerakoan');
          }
  
          const datuak = await response.json();
          if(this.tinteFiltr!= ""){
            this.listaKolore = datuak
            .filter(tinte => tinte.id_produktua == this.tinteFiltr && tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === null || tinte.id_produktua == this.tinteFiltr && tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }else{
            this.listaKolore = datuak
            .filter(tinte => tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === null || tinte.id_bezeroa == this.bezeroSeleccionado[0].id && tinte.ezabatze_data === "0000-00-00 00:00:00");
          }
         
  
  
  
        } catch (error) {
          console.log('Errorea: ', error);
        }
      },
      changeLanguage(locale) {
        console.log('Cambiando a:', locale);
        this.currentLocale = locale;
      }

  },
  mounted() {
    // Konponentea sortzen denean taula kargatzeko
    this.cargaBezeroa();
  }
});
