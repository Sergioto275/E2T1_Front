new Vue({
    el: '#app',
    data: {
      listaBezero:[],
      listaKolore:[],
      arrayId:[],
      bezeroSeleccionado:[],
      izenaActu:"",
      izenaCrear:"",
      telefonoCrear:"",
      pielCrear:"",
      abizenaCrear:"",
      kodeaActu:"",
      kodeaCrear:"",
      abizenaActu:"",
      currentLocale: 'es',
      translations: translations,
      environment: 'http://localhost/Erronka2/Back/talde1erronka2',
    },
    methods: {
      changeEnvironment(env){
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
      console.log(bezero)
      try {
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

      this.listaKolore = datuak
        .filter(kolore => kolore.ezabatze_data === null && kolore.id_bezeroa == bezero || kolore.ezabatze_data === "0000-00-00 00:00:00" && kolore.id_bezeroa == bezero);

        this.bezeroSeleccionado=this.listaBezero.filter(item => item.id === bezero);

      console.log(this.listaKolore)
    } catch (error) {
      console.error('Errorea:', error);
    }
  }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaBezeroa();
      }
  });
