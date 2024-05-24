// Class: Txanda
// Txanda kudeatzen duen metodo guztiak batzen dituen script-a.
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
        listaLangile: [],
        listaTalde: [],
        existe: null,
        nombreFil: "",
        grupoFil: "",
        fechaFil: "",
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
        /* Function: changeLanguage
        Hizkuntza aldatzeko.
        Parameters:
            locale - Hizkuntza.
        */
        changeLanguage(locale) {
            console.log('Cambiando a:', locale);
            this.currentLocale = locale;
        },
        /* Function: cargaTxanda
        Txanda guztiak kargatzeko.
        */
        async cargaTxanda() {
            this.listaTxanda = [];
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

                    const cadenaFecha = datuak[index]["data"];
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
                            }
                        }

                    } catch (error) {

                    }
                }

                if (this.listaTxanda.length == 0) {
                    var nohay = { id: "no", mota: ">:(", data: "No hay datos en esta fecha", id_langilea: "🤫🧏‍♀️" }
                    this.listaTxanda.push(nohay);
                }
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        /* Function: cargarDatosModal
        Editatu nahi den txanda kargatzeko modalean.
        */
        async cargarDatosModal() {
            try {
                const response = await fetch(this.environment + '/public/api/txanda/' + this.arrayId[0], {
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
                this.tareaActu = this.listaTxandaById.mota;
                this.langileActu = this.listaTxandaById.id_langilea;


                await this.grupoCorrecto();
                await this.cargarComboBox();

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        /* Function: actuDatosModal
        Txanda eguneratzeko.
        */
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
                    "eguneratze_data": eguneratze_data
                };

                console.log(JSON.stringify(jsonEditatu));
                const response = await fetch(this.environment + '/public/api/txanda', {
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
                await this.cargaTxanda();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                modalInst.hide();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        /* Function: createDatosModal
        Txanda berria sortzeko.
        */
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


                const response = await fetch(this.environment + '/public/api/taldeak', {
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
                await this.cargaLangile();

                //Modal-a ixteko ondo sortzen duenean
                const modalCrearElement = document.getElementById('exampleModalCrear');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                modalInst.hide();
            } catch (error) {
                console.log('Errorea: ', error);
            }
        },
        // Langileak ezabatzek,
        // Sortzeko modalean aurreko langilearen datuak ez agertzeko
        limpiarCampos() {
            this.izenaCrear = "";
            this.abizenaCrear = "";
            this.kodeaCrear = "";
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

            } catch (error) {
                console.error('Errorea: ', error);
            }
        },
        async grupoCorrecto() {
            try {
                const response = await fetch(this.environment + '/public/api/langileak/' + this.langileActu, {
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
        },
        async filtroFecha() {
            this.listaTxanda = [];
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
                var datuak = "";
                datuak = await response.json();


                for (let index = 0; index < datuak.length; index++) {

                    const cadenaFecha = datuak[index]["data"];
                    const fechaEjemplo = new Date(cadenaFecha);
                    const fechaActual = new Date(this.fechaFil);

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
                        console.log(persona);
                        if (this.listaTxanda.includes(persona)) {

                        } else {
                            this.listaTxanda.push(persona);
                        }
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
                            }
                        }

                    } catch (error) {

                    }
                }

                if (this.listaTxanda.length == 0) {
                    var nohay = { id: "no", mota: ">:(", data: "No hay datos en esta fecha", id_langilea: "🤫🧏‍♀️" }
                    this.listaTxanda.push(nohay);
                }
            } catch (error) {
                console.error('Errorea:', error);
            }
        },
        checkCookie() {
            if (document.cookie == "") {
                window.location.href = "http://localhost/Erronka2/Front/Login.html";
            }
        }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaTxanda();
        this.checkCookie();
    }
});