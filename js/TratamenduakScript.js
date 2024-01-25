const vue = new Vue({
    el: "#app",
    data: {
        tratamenduArray: [],
        currentLocale: 'es',
        translations: translations,
        environment: 'http://localhost/Erronka2/Back/talde1erronka2'
    },
    methods: {
        changeEnvironment(env){
            this.environment = env;
          },
          changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
          }
        
    },
    mounted() {
        this.cargarTratamenduak();
      }
});

