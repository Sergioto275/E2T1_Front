// Class: ProduktuakAteraScript
// Produktuak ateratzeko behar diren metodo guztiak batzen dituen script-a.
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
    markaFil: "first",
    currentLocale: 'es',
    translations: translations,
    environment: environment,
    carrito: [],
    mensaje: '',
    accionActual: null,
    listaTalde: [],
    taldeFil: '',
    listaLangile: [],
    langileFil: '',
    listaMarka: [],
  },
  methods: {
    /* Function: modalAtera
    Modala erakusteko.
    */
    modalAtera() {
      this.cargaTalde();
      $('#modalAtera').modal('show');
    },
    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: addCarrito
    Produktu zehatz bat orgatxoan sartzeko.
    Parameters:
      produktu - Produktua.
    */
    addCarrito(produktu) {
      const existingProduct = this.carrito.find(item => item.id === produktu.id);

      if (existingProduct) {
        // Produktua aurkitu du eta begiratuko du stock-a dagoen edo ez
        if (existingProduct.kantitate < produktu.stock) {
          // Stock-a badago kantitatea handituko du
          existingProduct.kantitate++;

          // Stock alerta-ra heldu bada abisua emango du
          if (existingProduct.kantitate > produktu.stock_alerta) {
            console.warn('¡Alerta! La cantidad en el carrito supera el stock de alerta.');
            toastr.warning(this.translations[this.currentLocale].productos.aviso.stockSeguridad)
          }
        } else {
          // Stock-arik ez badago abisua emango du eta ez du ezer ere ez egingo
          console.error('¡Alerta! No hay suficiente stock disponible.');
          toastr.error(this.translations[this.currentLocale].productos.aviso.stockMaximo)
        }
      } else {
        // Produktua orgatxoan ez badago stock-a dagoen edo ez begiratuko du
        if (produktu.stock > 0) {
          this.carrito.push({
            id: produktu.id,
            izena: produktu.izena,
            deskribapena: produktu.deskribapena,
            stock: produktu.stock,
            stock_alerta: produktu.stock_alerta,
            kantitate: 1
          });

          // Stock alerta-ra heldu bada abisua emango du
          if (1 > produktu.stock_alerta) {
            console.warn('¡Alerta! La cantidad en el carrito supera el stock de alerta.');
            toastr.warning(this.translations[this.currentLocale].productos.aviso.stockSeguridad);
          }
        } else {
          // Stock-arik ez badago abisua emango du eta ez du ezer ere ez egingo
          console.warn('¡Alerta! No hay suficiente stock disponible.');
          toastr.error(this.translations[this.currentLocale].productos.aviso.stockMaximo);
        }
      }
    },
    /* Function: removeCarrito
    Produktu zehatz bat orgatxotik ateratzeko.
    Parameters:
      produktu - Produktua.
    */
    removeCarrito(produktu) {
      const index = this.carrito.findIndex(item => item.id === produktu.id);

      if (index !== -1) {
        this.carrito.splice(index, 1);
      }
    },
    /* Function: limpiarCarrito
    Orgatxoa husteko.
    */
    limpiarCarrito() {
      this.carrito = []
    },
    /* Function: updateCantidad
    Aukeratutako produktuaren kantitatea aldatzeko balidazioarekin.
    Parameters:
      event - Ebentoa.
      produktu - Aukeratutako produktua.
    */
    updateCantidad(event, produktu) {
      const newCantidad = parseInt(event.target.value);

      if (!isNaN(newCantidad) && newCantidad >= 0) {
        // Kantitatea zenbakizkoa bada (ondo badago) aldatzen saiatuko da
        this.updateCarritoCantidad(produktu, newCantidad);
      } else {
        // Zenbakizko ez bada errorea erakutsiko du
        this.updateCarritoCantidad(produktu, 0);
        console.warn('¡Error! Ingresa una cantidad válida.');
      }
    },
    /* Function: updateCarritoCantidad
    Orgatxoan dagoen produktu baten kantitatea aldatzeko balidazioekin.
    Parameters:
      newCantidad - Kantitate berria.
      produktu - Aukeratutako produktua.
    */
    updateCarritoCantidad(produktu, newCantidad) {
      // Produktua bilatuko du
      const index = this.carrito.findIndex(item => item.id === produktu.id);

      // Orgatxoan tamaina aldatuko du
      if (index !== -1) {
        if (newCantidad <= produktu.stock) {
          this.$set(this.carrito, index, { ...produktu, kantitate: newCantidad });

          // Stock alerta baino handiagoa bada abisua erakutsiko du
          if (newCantidad > produktu.stock_alerta) {
            console.warn('¡Alerta! La cantidad en el carrito supera el stock de alerta.');
            toastr.warning(this.translations[this.currentLocale].productos.aviso.stockSeguridad);
          }
        } else {
          // Stock-a baino gehiago bada abisua erakutsiko du eta stock kantitatea jarriko du
          const maxCantidad = produktu.stock;
          this.$set(this.carrito, index, { ...produktu, kantitate: maxCantidad });

          console.warn('¡Error! No hay suficiente stock disponible.');
          toastr.error(this.translations[this.currentLocale].productos.aviso.stockMaximo);
        }
      }
    },
    /* Function: deskribapenaZatitu
    Produktuen deskribapena 50 karaktereetara gutxitzeko..
    Parameters:
      produktu - Aukeratutako produktua.
    */
    deskribapenaZatitu(produktu) {
      if (produktu.deskribapena.length > 50) {
        return produktu.deskribapena.slice(0, 50);
      } else {
        return produktu.deskribapena;
      }
    },
    /* Function: toggleDescription
    Produktu horren deskribapena guztiz erakusteko edo ez.
    Parameters:
      produktu - Aukeratutako produktua.
    */
    toggleDescription(produktu) {
      produktu.showFullDescription = !produktu.showFullDescription;
    },
    /* Function: showFullDescription
    Produktu horren deskribapena guztiz erakusten ari den edo ez bueltatzen du.
    Parameters:
      produktu - Aukeratutako produktua.
    Returns:
      True edo False.
    */
    showFullDescription(produktu) {
      // Devuelve el valor de showFullDescription para decidir si mostrar la descripción completa o no
      return produktu.showFullDescription || false;
    },
    /* Function: ateraProduktuak
    Produktuak ateratzeko.
    */
    async ateraProduktuak() {
      try {
        const requestData = {
          id: this.langileFil,
          produktuak: this.carrito
        };

        console.log(JSON.stringify(requestData));

        const response = await fetch(this.environment + '/public/api/produktuak/atera', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          console.log("Error al actualizar el stock:", response.statusText);
          throw new Error("Error al actualizar el stock");
        }

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);

        // Ondo egiten bada orgatxoa hutsik geratuko da eta berriro kargatuko du taula stock berria ikusi ahal izateko.
        this.carrito = [];
        this.cargaProduktu();

        toastr.success(this.translations[this.currentLocale].default.correcto);
        $('#modalAtera').modal('hide');
        this.listaTalde = [];
        this.taldeFil = '';
        this.listaLangile = [];
        this.langileFil = '';

      } catch (error) {
        console.error("Error en la actualización del stock:", error);
        toastr.error(this.translations[this.currentLocale].default.error);
      }
    },
    /* Function: cargaProduktu
    Produktuak taulan kargatzeko.
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
          .filter(produktu => produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00")
          .map(produktu => ({ ...produktu, showFullDescription: false }));

        // Markak lortu
        this.listaMarka = [...new Set(this.listaProduktu.map(produktu => produktu.marka.toLowerCase()))];

        this.cargarKategoria();
        toastr.success(this.translations[this.currentLocale].default.datosCargados);
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    /* Function: cargaTalde
    Talde guztiak kargatzeko.
    */
    async cargaTalde() {
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
    /* Function: cargaLangile
    Langile guztiak kargatzeko.
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

        this.listaLangile = datuak
          .filter(langile => langile.kodea === this.taldeFil || this.taldeFil === null)
          .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        
        this.langileFil = '';
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
    // Langilearen datuak eguneratzeko
    async actuDatosModal() {
      try {
        const id = this.arrayId[0];
        const izena = this.izenaActu;
        const deskribapena = this.deskribapenaActu;
        const id_kategoria = this.kategoriaActu;
        const marka = this.markaActu;
        const stock = this.stockActu;
        const stock_alerta = this.stockAlertaActu;
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
          "izena": izena,
          "deskribapena": deskribapena,
          "id_kategoria": id_kategoria,
          "marka": marka,
          "stock": stock,
          "stock_alerta": stock_alerta,
          "eguneratze_data": eguneratze_data
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

        toastr.success(this.translations[this.currentLocale].default.actualizar);
        await this.cargaProduktu();

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
        const deskribapena = this.deskribapenaCrear;
        const id_kategoria = this.kategoriaCrear;
        const marka = this.markaCrear;
        const stock = this.stockCrear;
        const stock_alerta = this.stockAlertaCrear;
        const sortze_data_primaria = new Date();
        const year = sortze_data_primaria.getFullYear();
        const month = ('0' + (sortze_data_primaria.getMonth() + 1)).slice(-2);
        const day = ('0' + sortze_data_primaria.getDate()).slice(-2);
        const hours = ('0' + sortze_data_primaria.getHours()).slice(-2);
        const minutes = ('0' + sortze_data_primaria.getMinutes()).slice(-2);
        const seconds = ('0' + sortze_data_primaria.getSeconds()).slice(-2);
        const sortze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const jsonSortu = {
          "izena": izena,
          "deskribapena": deskribapena,
          "id_kategoria": id_kategoria,
          "marka": marka,
          "stock": stock,
          "stock_alerta": stock_alerta,
          "sortze_data": sortze_data
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

        toastr.success(this.translations[this.currentLocale].default.crear);
        await this.cargaProduktu();

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
        toastr.success(this.translations[this.currentLocale].default.actualizar);
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
    Filtroa izenaren arabera.
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
    async aplicarFiltros() {
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
    
        let filteredData = datuak;
    
        if (this.kategoriaFil=="first" && this.markaFil!="first") {
          filteredData = filteredData.filter(produktu =>
            produktu.marka.toLowerCase() === this.markaFil
          );
        }else if (this.markaFil=="first" && this.kategoriaFil!="first" ) {
          filteredData = filteredData.filter(produktu =>
            produktu.id_kategoria === this.kategoriaFil &&
            (produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00")
          );
        }else if(this.kategoriaFil && this.markaFil ){
          filteredData = filteredData.filter(produktu =>
            produktu.marka.toLowerCase() === this.markaFil &&
            produktu.id_kategoria === this.kategoriaFil &&
            (produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00")
          );
        }
    
        this.listaProduktu = filteredData;
    
        if (this.listaProduktu.length === 0) {
          this.listaProduktu = datuak.filter(produktu =>
            produktu.ezabatze_data === null || produktu.ezabatze_data === "0000-00-00 00:00:00"
          );
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