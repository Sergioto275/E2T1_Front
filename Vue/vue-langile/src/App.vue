<script setup>
Vue.component('tablaLangile', {
    
    data: function () {
        return {
          listaLangile:[],
        }
    },methods: {
      async cargaLangile() {
        console.log("si");
        try {
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak', {
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
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        } catch (error) {
          console.error('Errorea:', error);
        }
      }
    },
    mounted() {
        this.cargaLangile();
      },
      template: `
    <tr class="table-secondary" v-for="langile in listaLangile" data-tor="hover:bg-darken(x1)">
                    <td class="table-secondary"><input type="checkbox" :value="langile.id" v-model="arrayId"></td>
                    <td>{{langile.izena}}</td>
                    <td>{{langile.abizenak}}</td>
                    <td>{{langile.kodea}}</td>
    </tr>`
});
new Vue({
    el: '#app',
    data: {
      selectedCheckbox: null, // Esta variable almacenará la ID del checkbox seleccionado
      arrayId :[],
      izenaActu:"",
      abizenaActu:"",
      kodeaActu:"",
      izenaCrear:"",
      abizenaCrear:"",
      kodeaCrear:"",
      listaLangile:[],
      listaTalde:[],
      listaLangileById:[],
      existe: null
    },
    methods: {
      // Langilea guztiak taulan kargatu
      async cargaLangile() {
        try {
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak', {
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
            .filter(langile => langile.ezabatze_data === null || langile.ezabatze_data === "0000-00-00 00:00:00");
        } catch (error) {
          console.error('Errorea:', error);
        }
      },
      //Editatzeko modalean aukeratutako langilearen datuak kargatzeko
      async cargarDatosModal(){
        try{
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak/'+this.arrayId[0], {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
          });

          if(!response.ok) {
            console.log('Errorea eskera egiterakoan');
            throw new Error('Errorea eskaera egiterakoan');
          }

          const datuak = await response.json();

          this.listaLangileById = datuak;
          console.log(this.listaLangileById);

          this.izenaActu = this.listaLangileById.izena;
          this.abizenaActu = this.listaLangileById.abizenak;
          this.kodeaActu = this.listaLangileById.kodea;
          await this.cargarComboBox();

        } catch (error){
          console.error('Errorea: ', error);
        }
      },
      // Langilearen datuak eguneratzeko
      async actuDatosModal(){
        try{
          const id=this.arrayId[0];
          const izena=this.izenaActu;
          const abizenak=this.abizenaActu;
          const kodea=this.kodeaActu;
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
            "abizenak": abizenak,
            "kodea": kodea,
            "eguneratze_data": eguneratze_data
          };

          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonEditatu),
          });

          if(!response.ok){
            console.log('Errorea eguneratzerakoan');
            throw new Error('Errorea eguneratzerakoan');
          }
          
          alert('Ondo eguneratuta');
          await this.cargaLangile();

          //Modal-a ixteko ondo egiten duenean
          const modalEditarElement = document.getElementById('exampleModalEditar');
          const modalInst = bootstrap.Modal.getInstance(modalEditarElement);
          modalInst.hide();
        } catch(error){
          console.log('Errorea: ', error);
        }
      },
      // Langile berri bat sortzeko
      async createDatosModal(){
        try{
          const izena=this.izenaCrear;
          const abizenak=this.abizenaCrear;
          const kodea=this.kodeaCrear;
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
            "abizenak": abizenak,
            "kodea": kodea,
            "sortze_data": sortze_data
          };

          console.log(JSON.stringify(jsonSortu));

          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Indicar el tipo de contenido como JSON
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonSortu), // Convertir el objeto JSON a una cadena JSON
          });

          if(!response.ok){
            console.log('Errorea sortzerakoan');
            throw new Error('Errorea sortzerakoan');
          }

          alert('Sortu da');
          await this.cargaLangile();

          //Modal-a ixteko ondo sortzen duenean
          const modalCrearElement = document.getElementById('exampleModalCrear');
          const modalInst = bootstrap.Modal.getInstance(modalCrearElement);
          modalInst.hide();
        } catch(error){
          console.log('Errorea: ', error);
        }
      },
      // Langileak ezabatzeko
      async borrar() {
        let ondo = false;
        try {
          for(var i=0; i < this.arrayId.length; i++){
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

            const deleteResponse = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/langileak', {
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
        if(ondo){
          alert("Eguneratu egin da");
        }

        this.arrayId = [];
      },
      // Sortzeko modalean aurreko langilearen datuak ez agertzeko
      limpiarCampos(){
        this.izenaCrear = "";
        this.abizenaCrear = "";
        this.kodeaCrear = "";

        this.cargarComboBox();

      },
      async cargarComboBox() {
        try{
          const response = await fetch('http://localhost/Erronka2/Back/talde1erronka2/public/api/taldeak',{
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
          });

          if(!response.ok) {
            console.log('Errorea eskera egiterakoan');
            throw new Error('Errorea eskaera egiterakoan');
          }
          const datuak = await response.json();
          this.listaTalde = datuak
          .filter(talde => talde.ezabatze_data === null || talde.ezabatze_data === "0000-00-00 00:00:00");

          console.log(this.listaTalde);
        } catch (error){
          console.error('Errorea: ', error);
        }
      }
    },
    mounted() {
        // Konponentea sortzen denean taula kargatzeko
        this.cargaLangile();
      }
  });

</script>

<template>
    
</template>

<style scoped>
/* @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'); */
</style>