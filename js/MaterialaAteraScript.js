// Class: MaterialaAteraScript
// Materiala ateratzeko behar diren metodo guztiak batzen dituen script-a.
new Vue({
  el: '#app',
  data: {
    selectedCheckbox: null,
    arrayId: [],
    listaMaterial: [],
    listaMaterialById: [],
    existe: null,
    nombreFil: "",
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
    searchTimeout: null,
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
    /* Function: modalAtera
    Modala kargatzeko.
    */
    modalAtera() {
      this.cargaTalde();
      $('#modalAtera').modal('show');
    },
    /* Function: enCarrito
    Material bat orgatxoan dagoen edo ez bueltatzen du.
    Parameters:
      material - Aukeratutako materiala.
    */
    enCarrito(material) {
      return this.carrito.some(item => item.id === material.id);
    },
    changeEnvironment(env) {
      this.environment = env;
    },
    /* Function: addCarrito
    Material bat orgatxoan sartzeko.
    Parameters:
      material - Aukeratutako materiala.
    */
    addCarrito(material) {
      const existingMaterial = this.carrito.find(item => item.id === material.id);

      if (existingMaterial) {
        // El material ya está en el carrito, no se puede volver a añadir
        console.warn('¡Alerta! El material ya está en el carrito.');
        toastr.warning(this.translations[this.currentLocale].aviso.materialEnCarrito);
      } else {
        // Añadir el nuevo material al carrito
        this.carrito.push({
          id: material.id,
          etiketa: material.etiketa,
          izena: material.izena,
        });

        // Puedes agregar aquí la lógica para mostrar una alerta si es necesario
      }
    },
    /* Function: removeCarrito
    Material bat orgatxotik kentzeko.
    Parameters:
      produktu - Aukeratutako materiala.
    */
    removeCarrito(produktu) {
      const index = this.carrito.findIndex(item => item.id === produktu.id);

      if (index !== -1) {
        this.carrito.splice(index, 1);
      }
    },
    limpiarCarrito() {
      this.carrito = []
    },
    /* Function: ateraMaterial
    Aukeratutako materiala ateratzeko.
    */
    async ateraMaterial() {
      try {
        const requestData = {
          id: this.langileFil,
          materiala: this.carrito
        };

        console.log(JSON.stringify(requestData));

        const response = await fetch(this.environment + '/public/api/materiala/atera', {
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

        // Ondo egiten bada orgatxoa hutsik geratuko da eta berriro kargatuko du taula
        this.carrito = [];
        this.cargaMaterial();

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
    /* Function: cargaMaterial
    Material guztia kargatzeko taulan.
    */
    async cargaMaterial() {
      try {
        const response = await fetch(this.environment + '/public/api/materialalibre', {
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

        this.listaMaterial = datuak
          .filter(material =>
            (material.ezabatze_data === null || material.ezabatze_data === "0000-00-00 00:00:00")
          )
          .filter((material, index, self) =>
            index === self.findIndex(m => m.id === material.id)
          );

        toastr.success(this.translations[this.currentLocale].default.datosCargados);
      } catch (error) {
        console.error('Errorea:', error);
      }
    },
    /* Function: cargaTalde
    Talde guztiak kargatzeko taulan.
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
    Langile guztiak kargatzeko taulan.
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
    /* Function: filtroNombre
    Izenaren arabera filtratzeko.
    */
    async filtroNombre() {
      try {
        const response = await fetch(this.environment + '/public/api/materialalibre', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        });

        if (!response.ok) {
          console.log('Errorea eskera egiterakoan');
          throw new Error('Errorea eskaera egiterakoan');
        }

        this.listaMaterial = [];
        const datuak = await response.json();
        const nombreFilLower = this.nombreFil.toLowerCase();

        this.listaMaterial = datuak
          .filter(material => material.izena.toLowerCase().includes(nombreFilLower) && material.ezabatze_data === null || material.izena.includes(this.nombreFil) && material.ezabatze_data === "0000-00-00 00:00:00");

        if (this.listaMaterial.length == 0) {
          this.listaMaterialById = datuak
            .filter(material => material.ezabatze_data === null || material.ezabatze_data === "0000-00-00 00:00:00");
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
    /* Function: changeLanguage
    Hizkuntza aldatzeko.
    Parameters:
      locale - Hizkuntza.
    */
    changeLanguage(locale) {
      console.log('Cambiando a:', locale);
      this.currentLocale = locale;
    }, checkCookie() {
      if (document.cookie == "") {
        window.location.href = "http://localhost/Erronka2/Front/E2T1_Front/Login.html";
      }
    }
  },
  mounted() {
    // Konponentea sortzen denean taula kargatzeko
    this.cargaMaterial();
    this.checkCookie();
  }
});
