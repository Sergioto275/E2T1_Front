// Class: TratamenduakScript
// Tratamenduak kudeatzen duen metodo guztiak batzen dituen script-a.
const vue = new Vue({
    el: "#app",
    data: {
        tratamenduArray: [],
        tratamenduKategoria: [],
        tratKategoriaIdCrear: null,
        tratKategoriaIdEditar: null,
        kategoriaIzenaEditar: null,
        kategoriaColorEditar: null,
        kategoriaExtraEditar: null,
        kategoriaIzenaCrear: null,
        kategoriaColorCrear: null,
        kategoriaExtraCrear: null,
        currentLocale: 'es',
        translations: translations,
        idSelec: null,
        izenaCrear: null,
        izenaEditar: null,
        kanpoko_prezioaCrear: null,
        kanpoko_prezioaEditar: null,
        etxeko_prezioaCrear: null,
        etxeko_prezioaEditar: null,
        environment: environment
    },
    methods: {
        retroceder(){ 
            window.history.back(); 
        }, 

        changeEnvironment(env) {
            this.environment = env;
        },
        limpiar_campos() {
            this.tratKategoriaIdCrear = null;
            this.tratKategoriaIdEditar = null;
            this.kategoriaIzenaEditar = null;
            this.kategoriaColorEditar = null;
            this.kategoriaExtraEditar = null;
            this.kategoriaIzenaCrear = null;
            this.kategoriaColorCrear = null;
            this.kategoriaExtraCrear = null;
            this.idSelec = null;
            this.izenaCrear = null;
            this.izenaEditar = null;
            this.kanpoko_prezioaCrear = null;
            this.kanpoko_prezioaEditar = null;
            this.etxeko_prezioaCrear = null;
            this.etxeko_prezioaEditar = null;
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
        /* Function: cargarTratamenduak
        Tratamendu guztiak kargatzeko.
        */
        async cargarTratamenduak() {
            try {
                const response = await fetch(this.environment + '/public/api/tratamenduak', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.tratamenduArray = datuak.filter(tratamendua => tratamendua.ezabatze_data === null || tratamendua.ezabatze_data === '0000-00-00 00:00:00');
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        /* Function: cargar_datos
        IDaren arabera tratamenduak kargatzeko.
        Parameters:
            id - Tratamenduaren IDa
        */
        cargar_datos(id) {
            const tratamendu = this.tratamenduArray.filter(tratamendu => tratamendu.id == id)
            this.idSelec = id;
            this.izenaEditar = tratamendu[0].izena;
            this.etxeko_prezioaEditar = tratamendu[0].etxeko_prezioa;
            this.kanpoko_prezioaEditar = tratamendu[0].kanpoko_prezioa;
            this.tratKategoriaIdEditar = tratamendu[0].id_katTratamendu;
        },
        /* Function: cargar_datos_kategoria
        Tratamenduen kategoriak kargatzeko.
        */
        cargar_datos_kategoria() {
            const kategoria = this.tratamenduKategoria.filter(kategoria => kategoria.id == this.tratKategoriaIdEditar)
            this.kategoriaIzenaEditar = kategoria[0].izena;
            if (kategoria[0].kolorea == 's') {
                this.kategoriaColorEditar = true;
            } else {
                this.kategoriaColorEditar = false;
            }
            if (kategoria[0].extra == 's') {
                this.kategoriaExtraEditar = true;
            } else {
                this.kategoriaExtraEditar = false;
            }
        },
        /* Function: createTratamendu
        Tratamendu berria sortzeko.
        */
        async createTratamendu() {
            try {
                const json_data = {
                    "izena": this.izenaCrear,
                    "etxeko_prezioa": this.etxeko_prezioaCrear,
                    "kanpoko_prezioa": this.kanpoko_prezioaCrear,
                    "id_katTratamendu": this.tratKategoriaIdCrear
                }
                console.log(JSON.stringify(json_data))
                const response = await fetch(this.environment + '/public/api/tratamenduak', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "POST",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalCrearElement = document.getElementById('exampleModalCrear');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        /* Function: createKategoria
        Tratamendu kategoria berria sortzeko.
        */
        async createKategoria() {
            var color;
            var extra;
            if (this.kategoriaColorCrear) {
                color = "s";
            } else {
                color = "n";
            }
            if (this.kategoriaExtraCrear) {
                extra = "s";
            } else {
                extra = "n";
            }
            try {
                const json_data = {
                    "izena": this.kategoriaIzenaCrear,
                    "kolorea": color,
                    "extra": extra
                }
                console.log(JSON.stringify(json_data))
                const response = await fetch(this.environment + '/public/api/kategoriaTratamendu', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "POST",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();
                await this.cargarCategorias();

                //Modal-a ixteko ondo egiten duenean
                const modalCrearElement = document.getElementById('exampleModalAñadirKategoria');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        /* Function: editarTratamendu
        Nahi den tratamendua editatzeko.
        */
        async editarTratamendu() {
            try {
                const json_data = {
                    "id": this.idSelec,
                    "izena": this.izenaEditar,
                    "etxeko_prezioa": this.etxeko_prezioaEditar,
                    "kanpoko_prezioa": this.kanpoko_prezioaEditar,
                    "id_katTratamendu": this.tratKategoriaIdEditar
                }
                const response = await fetch(this.environment + '/public/api/tratamenduak', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "PUT",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        /* Function: editarKategoria
        Nahi den tratamendu kategoria editatzeko.
        */
        async editarKategoria() {
            var color;
            var extra;
            if (this.kategoriaColorEditar) {
                color = "s";
            } else {
                color = "n";
            }
            if (this.kategoriaExtraEditar) {
                extra = "s";
            } else {
                extra = "n";
            }
            try {
                const json_data = {
                    "id": this.tratKategoriaIdEditar,
                    "izena": this.kategoriaIzenaEditar,
                    "kolorea": color,
                    "extra": extra
                }
                console.log(JSON.stringify(json_data))
                const response = await fetch(this.environment + '/public/api/kategoriaTratamendu', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "PUT",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();
                await this.cargarCategorias();

                //Modal-a ixteko ondo egiten duenean
                const modalCrearElement = document.getElementById('exampleModalEditarKategoria');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        /* Function: deleteKategoria
        Nahi den tratamendu kategoria ezabatzeko.
        */
        async deleteKategoria() {
            try {
                const json_data = {
                    "id": this.tratKategoriaIdEditar
                }
                const response = await fetch(this.environment + '/public/api/kategoriaTratamendu', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "DELETE",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();
                await this.cargarCategorias();

                //Modal-a ixteko ondo egiten duenean
                const modalCrearElement = document.getElementById('exampleModalEditarKategoria');
                const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        /* Function: cargarCategorias
        Tratamendu kategoriak kargatzeko.
        */
        async cargarCategorias() {
            this.tratamenduKategoria = [];
            try {
                const response = await fetch(this.environment + '/public/api/kategoriaTratamendu', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                const datuak = await response.json();
                this.tratamenduKategoria = datuak.filter(katTratamendu => katTratamendu.ezabatze_data === null || katTratamendu.ezabatze_data === '0000-00-00 00:00:00');
            } catch (error) {
                console.log("Errorea: " + error);
            }
        },
        /* Function: borrarTratamendu
        Nahi den tratamendua ezabatzeko.
        */
        async borrarTratamendu() {
            try {
                const json_data = {
                    "id": this.idSelec
                }
                const response = await fetch(this.environment + '/public/api/tratamenduak', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    method: "DELETE",
                    body: JSON.stringify(json_data)
                });
                if (!response.ok) {
                    throw new Error('Errorea eskaera egiterakoan');
                }
                toastr.success(this.translations[this.currentLocale].default.actualizar);
                await this.cargarTratamenduak();

                //Modal-a ixteko ondo egiten duenean
                const modalEditarElement = document.getElementById('exampleModalEditar');
                const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
                this.limpiar_campos();
                modalInst.hide();
            } catch (error) {
                throw new Error("Error en carga de citas disponibles:" + error);
            }
        },
        checkCookie() {
            if (document.cookie == "") {
                window.location.href = "http://localhost/Erronka2/Front/Login.html";
            } else if (document.cookie == "ikasle") {
                window.location.href = "http://localhost/Erronka2/Front/Home.html";
            }
        },
    },
    mounted() {
        this.cargarTratamenduak();
        this.cargarCategorias();
        this.checkCookie();
    }
});

