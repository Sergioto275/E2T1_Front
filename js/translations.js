// translate.js
const translations = {
    es: {
        default:{
          editar: 'Editar',
          añadir: 'Añadir',
          borrar: 'Borrar',
          salir: 'Salir',
          guardar: 'Guardar',
          filtroGrupo: 'Selecciona un grupo'
        },
        trabajador: {
          titulo: 'Trabajador',
          id: 'ID',
          nombre: 'Nombre',
          apellidos: 'Apellidos',
          codigo: 'Código',
          grupo: 'Grupo',
          modal:{
            editar: 'Editar trabajador',
            añadir: 'Añadir trabajador',
          }
        },
        horarios: {
          titulo: 'Horarios',
          id: 'ID',
          codigo: 'Código',
          dia: 'Día',
          fechaInicio: 'Fecha inicio',
          fechaFinal: 'Fecha final',
          horaInicio: 'Hora inicio',
          horaFinal: 'Hora final',
          modal: {
            editar: 'Editar horario',
            añadir: 'Añadir horario',
          }
        },
        menu: {
          almacen:{
            titulo:'Almacen',
            elemento1:{
              titulo:'Producto',
              elemento1: 'Sacar',
              elemento2: 'Entregar',
              elemento3: 'Historico'
            },
            elemento2:{
              titulo:'Material',
              elemento1: 'Sacar',
              elemento2: 'Entregar',
              elemento3: 'Historico'
            },
          },
          profesor:{
            titulo:'Profesor',
            elemento1:{
              titulo: 'Almacen',
              elemento1: 'Productos',
              elemento2: 'Material'
            },
            elemento2:'Tratamientos',
            elemento3: {
              titulo: 'Alumnado',
              elemento1: 'Alumnos',
              elemento2: 'Grupos'
            },
            elemento4:'Calendario'
          },
          tareas: 'Tareas',
          citas:'Citas'
      }
    },
    eu: {
      default:{
        editar: 'Editatu',
        añadir: 'Sortu',
        borrar: 'Ezabatu',
        salir: 'Irten',
        guardar: 'Gorde',
        filtroGrupo: 'Taldea aukeratu'
      },
      trabajador: {
        titulo: 'Langile',
        id: 'ID',
        nombre: 'Izena',
        apellidos: 'Abizenak',
        codigo: 'Kodea',
        grupo: 'Taldea',
        modal:{
          editar: 'Langilea editatu',
          añadir: 'Langilea sortu',
        }
      },
      horarios: {
        titulo: 'Ordutegiak',
        id: 'ID',
        codigo: 'Kodea',
        dia: 'Eguna',
        fechaInicio: 'Hasiera data',
        fechaFinal: 'Amaiera data',
        horaInicio: 'Hasiera ordua',
        horaFinal: 'Amaiera ordua',
        modal: {
          editar: 'Ordutegia editatu',
          añadir: 'Ordutegia sortu',
        }
      },
      menu: {
        almacen:{
          titulo:'Biltegia',
          elemento1:{
            titulo:'Produktuak',
            elemento1: 'Atera',
            elemento2: 'Gorde',
            elemento3: 'Historikoa'
          },
          elemento2:{
            titulo:'Materiala',
            elemento1: 'Atera',
            elemento2: 'Gorde',
            elemento3: 'Historikoa'
          },
        },
        profesor:{
          titulo:'Irakaslea',
          elemento1:{
            titulo: 'Biltegia',
            elemento1: 'Produktuak',
            elemento2: 'Materiala'
          },
          elemento2:'Tratamenduak',
          elemento3: {
            titulo: 'Ikasleak',
            elemento1: 'Ikasle',
            elemento2: 'Taldeak'
          },
          elemento4:'Ordutegia'
        },
        tareas: 'Zereginak',
        citas:'Hitzorduak'
    }
    }
  };