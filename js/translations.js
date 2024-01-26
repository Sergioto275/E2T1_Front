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
        grupos: {
          titulo: 'Grupos',
          codigo: 'Código',
          nombre: 'Nombre',
          modal: {
            editar: 'Editar grupo',
            añadir: 'Añadir grupo'
          }
        },
        tareas: {
          titulo:'Turnos',
          tipo: 'Tipo',
          fecha: 'Fecha',
          trabajador: 'Trabajador',
          modal: {
            editar: 'Editar turno',
        }
        },
        productos:{
          titulo: 'Productos',
          id: 'ID',
          nombre: 'Nombre',
          descripcion: 'Descripción',
          marca: 'Marca',
          categoria: 'Categoría',
          stock: 'Stock',
          stockAlerta: 'Alerta stock',
          kategoriaFil: 'Selecciona una categoría',
          modal: {
            editar: 'Editar producto',
            añadir: 'Añadir producto',
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
          citas:'Citas',
      },
      citas:{
        titulo: 'Citas',
        ticket: 'Generar Ticket',
        hora:'Hora',
        asiento:'Asiento',
        alumno:'Alumno',
        asignar:'Asignar Alumno',
        ticket:'Generar Ticket',
        precioFuera:'Precio Fuera',
        precioDentro:'Precio Dentro',
        seleccionarCita:{
          titulo: 'Seleccionar Cita'
        },
        crear: {
          titulo:'Insertar cita',
          fecha:'Fecha',
          horaIni:'Hora Inicio',
          horaFin:'Hora Fin',
          nombre:'Nombre',
          telefono:'Telefono',
          descripcion:'Descripcion',
          centro:'Centro'      
        },
        editar:{
          titulo: 'Editar cita'
          titulo: "Editar cita"
        }
      },
      fichas:{
        titulo: "Fichas",
        nombre:"Nombre",
        apellido:"Apellidos",
        seleccionCasa:"Seleccione una casa",
        seleccionTinte:"Seleccione un tinte",
        nombreape:"Nombre y apellidos",
        telefono:"Telefono",
        sensible:"Sensible",
        fecha:"Fecha",
        tinte:"Tinte",
        casa:"Casa",
        cantidad:"Cantidad",
        volumenes:"Volumenes",
        observaciones:"Observaciones",
        añadirCliente:{
          titulo: "Modificar Cliente",
          nombre:"Nombre",
          apellido:"Apellidos",
          telefono:"Telefono",
          sensible:"Piel Sensible",
        },
        modificarCliente: {
          titulo:"Insertar cita",
          nombre:"Nombre",
          apellido:"Apellidos",
          telefono:"Telefono",
          sensible:"Piel Sensible",     
        },
        añadirRegistro:{
          titulo: "Añadir Tratamiento",
          fecha:"Fecha",
          casa:"Casa",
          tinte:"Tinte",
          cantidad:"Cantidad",
          volumenes:"Volumenes",
          observaciones:"Observaciones",
        },
        editarRegistro:{
          titulo: "Editar Tratamiento",
          fecha:"Fecha",
          casa:"Casa",
          tinte:"Tinte",
          cantidad:"Cantidad",
          volumenes:"Volumenes",
          observaciones:"Observaciones",
        },
      tratamientos:{
        titulo:'Tratamientos',
        precioFuera:'Precio Fuera',
        precioDentro:'Precio Dentro',
        editar:'Editar Tratamiento',
        crear:'Crear Tratamiento',
        nombre:'Nombre'
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
      grupos: {
        titulo: 'Taldeak',
        codigo: 'Kodea',
        nombre: 'Izena',
        modal: {
          editar: 'Taldea editatu',
          añadir: 'Taldea sortu'
        }
      },
      tareas: {
        titulo:'Txanda',
        tipo: 'Mota',
        fecha: 'Data',
        trabajador: 'Langilea',
        modal: {
          editar: 'Taldea editatu',
        }
      },
      productos:{
        titulo: 'Produktuak',
        id: 'ID',
        nombre: 'Izena',
        descripcion: 'Deskribapena',
        marca: 'Marka',
        categoria: 'Kategoria',
        stock: 'Stock',
        stockAlerta: 'Stock alerta',
        kategoriaFil: 'Kategoria bat aukeratu',
        modal: {
          editar: 'Produktua editatu',
          añadir: 'Produktua sortu',
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
    },
    citas:{
      titulo: 'Hitzorduak',
      ticket: 'Ticket-a sortu',
      hora:'Ordua',
      asiento:'Eserleku',
      alumno:'Ikaslea',
      asignar:'Ikaslea Esleitu',
      ticket:'Ticket-a sortu',
      precioFuera:'Kanpoko prezioa',
      precioDentro:'Barruko Prezioa',
      seleccionarCita:{
        titulo: 'Hitzordua Aukeratu'
      },
      crear: {
        titulo: 'Hitzordua gehitu',
        fecha:'Data',
        horaIni:'Hasiera ordua',
        horaFin:'Amaiera ordua',
        nombre:'Izena',
        descripcion:'Deskribapena',
        telefono:'Telefonoa',
        centro:'Centrokoa'      
      },
      editar:{
        titulo: 'Hitzordua editatu'
        titulo: "Hitzordua editatu"
      }
    },
    fichas:{
      titulo: "Fitxak",
      nombre:"Izena",
      apellido:"Abizenak",
      seleccionCasa:"Aukeratu etxe bat",
      seleccionTinte:"Aukeratu tindagai bat",
      nombreape:"Izena y Abizenak",
      telefono:"Telefonoa",
      sensible:"Sentikorra",
      fecha:"Data",
      tinte:"Tindagai",
      casa:"Etxea",
      cantidad:"Kantitatea",
      volumenes:"Bolumena",
      observaciones:"Behaketak",
      añadirCliente:{
        titulo: "Sortu Bezero",
        nombre:"Izena",
        apellido:"Abizenak",
        telefono:"Telefonoa",
        sensible:"Azal Sentikorra",
      },
      modificarCliente: {
        titulo:"Eguneratu Bezero",
        nombre:"Izena",
        apellido:"Abizenak",
        telefono:"Telefonoa",
        sensible:"Azal Sentikorra",     
      },
      añadirRegistro:{
        titulo: "Tratamendua Sortu",
        fecha:"Data",
        casa:"Etxea",
        tinte:"Tindagai",
        cantidad:"Kantitatea",
        volumenes:"Bolumena",
        observaciones:"Behaketak",
      },
      editarRegistro:{
        titulo: "Tratamendua Editatu",
        fecha:"data",
        casa:"Etxea",
        tinte:"Tindagai",
        cantidad:"Kantitatea",
        volumenes:"Bolumena",
        observaciones:"Behaketak",
      },
    tratamientos:{
      titulo:'Tratamenduak',
      precioFuera:'Kanpoko Prezioa',
      precioDentro:'Barruko Prezioa',
      editar:'Tratamendua Editatu',
      crear:'Tratamendua Sortu',
      nombre:'Izena'
    }
  }
};
