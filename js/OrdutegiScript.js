// Class: OrdutegiScript
// Ordutegiak kudeatzen dituen metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
    arrayId: [],
    arrayDias: [],
    kodeaActu: "",
    egunaActu: "",
    hasieradataActu: "",
    hasieraorduaActu: "",
    amaieradataActu: "",
    amaieraorduaActu: "",
    kodeaCrear: "",
    egunaCrear: "",
    hasieradataCrear: "",
    hasieraorduaCrear: "",
    amaieradataCrear: "",
    amaieraorduaCrear: "",
    listaOrdutegi: [],
    listaOrdutegiById: [],
    existe: null,
    currentLocale: 'es',
    translations: translations,
    environment: environment,
    listaTalde: [],
    grupoFil: "",
  },
  methods: {
    retroceder(){
      window.history.back();
  },
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
    /* Function: cargarComboBox
    Comboboxa kargatzeko.
    */
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
    /* Function: filtroGrupo
    Taldearen arabera filtratzeko.
    */
    async filtroGrupo() {
      console.log("hola")
      try {
        const response = await fetch(this.environment + '/public/api/ordutegiak', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaOrdutegi = [];
        const datuak = await response.json();
        
          for (var i = 0; i < datuak.length; i++) {
            if (datuak[i].ezabatze_data === null && datuak[i].kodea === this.grupoFil || datuak[i].ezabatze_data === "0000-00-00 00:00:00" && datuak[i].kodea === this.grupoFil) {
              if(datuak[i].eguna==1){
                var ordutegi={"kodea":datuak[i].kodea,"eguna":"Lunes","hasiera_data":datuak[i].hasiera_data,"amaiera_data":datuak[i].amaiera_data,"hasiera_ordua":datuak[i].hasiera_ordua,"amaiera_ordua":datuak[i].amaiera_data,"id":datuak[i].id}

              }else if(datuak[i].eguna==2){
                var ordutegi={"kodea":datuak[i].kodea,"eguna":"Martes","hasiera_data":datuak[i].hasiera_data,"amaiera_data":datuak[i].amaiera_data,"hasiera_ordua":datuak[i].hasiera_ordua,"amaiera_ordua":datuak[i].amaiera_data,"id":datuak[i].id}

              }else if(datuak[i].eguna==3){
                var ordutegi={"kodea":datuak[i].kodea,"eguna":"Miercoles","hasiera_data":datuak[i].hasiera_data,"amaiera_data":datuak[i].amaiera_data,"hasiera_ordua":datuak[i].hasiera_ordua,"amaiera_ordua":datuak[i].amaiera_data,"id":datuak[i].id}

              }else if(datuak[i].eguna==4){
                var ordutegi={"kodea":datuak[i].kodea,"eguna":"Jueves","hasiera_data":datuak[i].hasiera_data,"amaiera_data":datuak[i].amaiera_data,"hasiera_ordua":datuak[i].hasiera_ordua,"amaiera_ordua":datuak[i].amaiera_data,"id":datuak[i].id}

              }else if(datuak[i].eguna==5){
                var ordutegi={"kodea":datuak[i].kodea,"eguna":"Viernes","hasiera_data":datuak[i].hasiera_data,"amaiera_data":datuak[i].amaiera_data,"hasiera_ordua":datuak[i].hasiera_ordua,"amaiera_ordua":datuak[i].amaiera_data,"id":datuak[i].id}
              }
              this.listaOrdutegi.push(ordutegi);

            }
          }

        if (this.listaOrdutegi.length == 0) {
          this.cargaLangile();
        }

      } catch (error) {
        console.error('Errorea: ', error);
      }
    },
    /* Function: cargaLangile
    Langileak kargatzeko.
    */
    cargaLangile() {
      this.listaOrdutegi = [];
      fetch(this.environment + '/public/api/ordutegiak')
        .then(dato => {
          return dato.json();
        })
        .then(datos => {
          this.cargarComboBox();
          for (var i = 0; i < datos.length; i++) {

            if (datos[i].ezabatze_data === null || datos[i].ezabatze_data === "0000-00-00 00:00:00") {
              if(datos[i].eguna==1){
                var ordutegi={"kodea":datos[i].kodea,"eguna":"Lunes","hasiera_data":datos[i].hasiera_data,"amaiera_data":datos[i].amaiera_data,"hasiera_ordua":datos[i].hasiera_ordua,"amaiera_ordua":datos[i].amaiera_data,"id":datos[i].id}

              }else if(datos[i].eguna==2){
                var ordutegi={"kodea":datos[i].kodea,"eguna":"Martes","hasiera_data":datos[i].hasiera_data,"amaiera_data":datos[i].amaiera_data,"hasiera_ordua":datos[i].hasiera_ordua,"amaiera_ordua":datos[i].amaiera_data,"id":datos[i].id}

              }else if(datos[i].eguna==3){
                var ordutegi={"kodea":datos[i].kodea,"eguna":"Miercoles","hasiera_data":datos[i].hasiera_data,"amaiera_data":datos[i].amaiera_data,"hasiera_ordua":datos[i].hasiera_ordua,"amaiera_ordua":datos[i].amaiera_data,"id":datos[i].id}

              }else if(datos[i].eguna==4){
                var ordutegi={"kodea":datos[i].kodea,"eguna":"Jueves","hasiera_data":datos[i].hasiera_data,"amaiera_data":datos[i].amaiera_data,"hasiera_ordua":datos[i].hasiera_ordua,"amaiera_ordua":datos[i].amaiera_data,"id":datos[i].id}

              }else if(datos[i].eguna==5){
                var ordutegi={"kodea":datos[i].kodea,"eguna":"Viernes","hasiera_data":datos[i].hasiera_data,"amaiera_data":datos[i].amaiera_data,"hasiera_ordua":datos[i].hasiera_ordua,"amaiera_ordua":datos[i].amaiera_data,"id":datos[i].id}

              }
              this.listaOrdutegi.push(ordutegi);
              this.listaOrdutegi.sort((a, b) => a.hasiera_data - b.hasiera_data);

            }
          }
          
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });
    },
    updateEgunaActu(value) {
      this.egunaActu = this.egunaActu === value ? null : value; // Toggle entre marcar y desmarcar
    },
    /* Function: cargarDatosModal
    Modalean datuak kargatzeko.
    */
    cargarDatosModal() {
      fetch(this.environment + '/public/api/ordutegiak/' + this.arrayId[0])
        .then(dato => {
          return dato.json();
        })
        .then(datos => {
          this.listaOrdutegiById = datos;
          this.kodeaActu = this.listaOrdutegiById[0].kodea;
          this.egunaActu = this.listaOrdutegiById[0].eguna;
          this.hasieradataActu = this.listaOrdutegiById[0].hasiera_data;
          this.hasieraorduaActu = this.listaOrdutegiById[0].hasiera_ordua;
          this.amaieradataActu = this.listaOrdutegiById[0].amaiera_data;
          this.amaieraorduaActu = this.listaOrdutegiById[0].amaiera_ordua;
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });
    },
    actuDatosModal() {
      const id = this.arrayId[0];
      const kodea = this.kodeaActu;
      const eguna = this.egunaActu;
      const hasiera_data = this.hasieradataActu;
      const hasiera_ordua = this.hasieraorduaActu;
      const amaiera_data = this.amaieradataActu;
      const amaiera_ordua = this.amaieraorduaActu;
      const jsonEditatu = {
        "id": id,
        "kodea": kodea,
        "eguna": eguna,
        "hasiera_data": hasiera_data,
        "hasiera_ordua": hasiera_ordua,
        "amaiera_data": amaiera_data,
        "amaiera_ordua": amaiera_ordua
      };

      console.log(JSON.stringify(jsonEditatu));
      fetch(this.environment + '/public/api/ordutegiak', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
        },
        body: JSON.stringify(jsonEditatu), // Convertir el objeto JSON a una cadena JSON
      })
        .then(response => {
          toastr.success(this.translations[this.currentLocale].default.actualizar);
          this.listaOrdutegi = [];
          this.cargaLangile();
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });

    },
    /* Function: createDatosModal
    Ordutegi berria sortzeko.
    */
    createDatosModal() {
      for (let index = 0; index < this.arrayDias.length; index++) {
        const kodea = this.kodeaCrear;
        const eguna = this.arrayDias[index];
        const hasiera_data = this.hasieradataCrear;
        const hasiera_ordua = this.hasieraorduaCrear;
        const amaiera_data = this.amaieradataCrear;
        const amaiera_ordua = this.amaieraorduaCrear;
        const jsonEditatu = {
          "kodea": kodea,
          "eguna": eguna,
          "hasiera_data": hasiera_data,
          "hasiera_ordua": hasiera_ordua,
          "amaiera_data": amaiera_data,
          "amaiera_ordua": amaiera_ordua
        };
        fetch(this.environment + '/public/api/ordutegiak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
          },
          body: JSON.stringify(jsonEditatu), // Convertir el objeto JSON a una cadena JSON
        })
        .then(response => {
          toastr.success(this.translations[this.currentLocale].default.crear);
        })
        .catch(error => {
          console.error('Se ha producido un error:', error);
        });
      }
      // Llamar a cargaLangile una vez que todas las iteraciones del bucle hayan terminado
      this.cargaLangile();
    },
    /* Function: borrar
    Ordutegiak ezabatzeko.
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

          const deleteResponse = await fetch(this.environment + '/public/api/ordutegiak', {
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
    // Llama a tu función cargarPagina cuando el componente se monta
    this.cargaLangile();
    this.checkCookie();
  }
});