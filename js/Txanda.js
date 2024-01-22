new Vue({
    el: '#app',
    data: {
        selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
        arrayId: [],
        tareaActu: "",
        langileActu: "",
        grupoActu: "",
        izenaCrear: "",
        kodeaCrear: "",
        listaTxanda: [],
        listaTxandaById: [],
        listaGrupoCorrecto: [],
        listaFiltroTalde: [],
        listaLangile:[],
        listaTalde:[],
        existe: null,
        nombreFil: "",
        grupoFil: "",
        currentLocale: 'es',
        translations: translations,
        environment: 'http://localhost/Erronka2/Back/talde1erronka2',
    },
    methods: {
        changeEnvironment(env) {
            this.environment = env;
        },
        changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
        },
        // Langilea guztiak taulan kargatu
        async cargaTxanda() {
            this.listaTxanda = [];
            try {
                const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/txanda', {
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

                    const cadenaFecha = datuak[index]["sortze_data"];
                    const fechaEjemplo = new Date(cadenaFecha);
                    const fechaActual = new Date();

                    function mismoDia(fechaEjemplo, fechaActual) {
                        return (
                            fechaEjemplo.getFullYear() === fechaActual.getFullYear() &&
                            fechaEjemplo.getMonth() === fechaActual.getMonth() &&
                            fechaEjemplo.getDate() === fechaActual.getDate()
                        );
                    }

                    // Ejemplo de uso
                    if (mismoDia(fechaEjemplo, fechaActual)) {
                        var persona = { id: datuak[index]["id"], id_langilea: datuak[index]["id_langilea"], data: datuak[index]["data"], mota: datuak[index]["mota"] };
                        this.listaTxanda.push(persona);
                        console.log(this.listaTxanda)
                    }

                }

                for (let a = 0; a < this.listaTxanda.length; a++) {

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
                            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");

                        for (let c = 0; c < this.listaFiltroTalde.length; c++) {
                            if (this.listaTxanda[a].id_langilea == this.listaFiltroTalde[c]["id"]) {

                                this.listaTxanda[a].id_langilea = this.listaFiltroTalde[c]["izena"] + " " + this.listaFiltroTalde[c]["abizenak"];
                                console.log(this.listaTxanda[a].id_langilea)
                            }
                        }

                    } catch (error) {

                    }
                }

                if (this.listaTxanda.length == 0) {
                    var nohay = { id: "no", mota: "no", data: "hay", id_langilea: "nada" }
                    this.listaTxanda.push(nohay);
                }
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        //Editatzeko modalean aukeratutako langilearen datuak kargatzeko
        async cargarDatosModal() {
            try {
                const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/txanda/' + this.arrayId[0], {
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

                this.listaTxandaById = datuak;
                console.log(this.listaTxandaById.id_langilea);                
                this.tareaActu = this.listaTxandaById.mota;
                this.langileActu = this.listaTxandaById.id_langilea;

                
                await this.grupoCorrecto();
                await this.cargarComboBox();

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        // Langilearen datuak eguneratzeko
        async actuDatosModal() {
            try {
                const id = this.arrayId[0];
                const mota = this.tareaActu;
                const id_langilea = this.langileActu;
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
                    "mota": mota,
                    "id_langilea": id_langilea,
                    "eguneratze_data":eguneratze_data
                };

                console.log(JSON.stringify(jsonEditatu));
                const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/txanda', {
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
                await this.cargaTxanda();

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
                const kodea = this.kodeaCrear;
                const sortze_data_primaria = new Date();
                const year = sortze_data_primaria.getFullYear();
                const month = ('0' + (sortze_data_primaria.getMonth() + 1)).slice(-2);
                const day = ('0' + sortze_data_primaria.getDate()).slice(-2);
                const hours = ('0' + sortze_data_primaria.getHours()).slice(-2);
                const minutes = ('0' + sortze_data_primaria.getMinutes()).slice(-2);
                const seconds = ('0' + sortze_data_primaria.getSeconds()).slice(-2);
                const sortze_data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                const jsonSortu = {
                    "kodea": kodea,
                    "izena": izena,
                    "sortze_data": sortze_data
                };

                console.log(JSON.stringify(jsonSortu));

                const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
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
                        "kodea": id,
                        "ezabatze_data": ezabatze_data
                    };
                    console.log(JSON.stringify(jsonEzabatu));

                    const deleteResponse = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak', {
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
                alert("Eguneratu egin da");
            }

            this.arrayId = [];
        },
        // Sortzeko modalean aurreko langilearen datuak ez agertzeko
        limpiarCampos() {
            this.izenaCrear = "";
            this.abizenaCrear = "";
            this.kodeaCrear = "";
        },
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
                  .filter(langile => langile.ezabatze_data === null && langile.kodea == this.grupoActu || langile.ezabatze_data === "0000-00-00 00:00:00" && langile.kodea == this.grupoActu);
        
                console.log(this.listaLangile);
              } catch (error) {
                console.error('Errorea: ', error);
              }
          },
          async grupoCorrecto() {
            try {
              const response = await fetch(this.environment + '/public/api/langileak/'+this.langileActu, {
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
              this.listaGrupoCorrecto = datuak
              this.grupoActu = this.listaGrupoCorrecto.kodea
            } catch (error) {
              console.error('Errorea: ', error);
            }
          }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaTxanda();
    }
});