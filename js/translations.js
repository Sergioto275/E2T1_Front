// Class: translations
// Web aplikazioan agertzen diren testu guztiak gaztelaniaz eta euskaraz, baita erabiltzen ari den host helbidea.
// Testuak euskaraz eta gaztelaniaz
const translations = {
  es: {
    default: {
      editar: 'Editar',
      añadir: 'Añadir',
      borrar: 'Borrar',
      salir: 'Salir',
      guardar: 'Guardar',
      filtroGrupo: 'Selecciona un grupo',
      correcto: 'Operación realizada correctamente',
      error: 'Error al realizar la operación',
      aceptar: 'Aceptar',
      limpiar: 'Limpiar',
      datosCargados: 'Datos cargados correctamente',
      avisoCarrito: 'Ya se encuentra en el carrito',
      crear: 'Se ha creado',
      actualizar: 'Se ha actualizado',
      exist: 'Ya existe un registro igual'
    },

    trabajador: {
      titulo: 'Trabajador',
      id: 'ID',
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      codigo: 'Código',
      grupo: 'Grupo',
      modal: {
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
      titulo: 'Turnos',
      grupos:'Grupos',
      tipo: 'Tipo',
      fecha: 'Fecha',
      trabajador: 'Trabajador',
      saltar: 'Saltar',
      completar: 'Completar',
      historico: 'Historico Semana Pasada',
      mostrador: 'Mostrador',
      limpieza: 'Limpieza',
      modal: {
        editar: 'Editar turno',
      }
    },

    productos: {
      titulo: 'Productos',
      id: 'ID',
      nombre: 'Nombre',
      descripcion: 'Descripción',
      marca: 'Marca',
      marcaFil: 'Selecciona una marca',
      categoria: 'Categoría',
      stock: 'Stock',
      stockAlerta: 'Alerta stock',
      kategoriaFil: 'Selecciona una categoría',
      carrito: 'Carrito',
      modal: {
        editar: 'Editar producto',
        añadir: 'Añadir producto',
        sacar: 'Sacar productos'
      },
      grupo: 'Grupo',
      trabajador: 'Trabajador',
      aviso: {
        stockMaximo: 'Stock máximo alcanzado',
        stockSeguridad: 'Stock de seguridad alcanzado'
      }
    },
    menu: {
      alertas: 'Alertas',
      alertaVacia: 'No hay alertas',
      almacen: {
        titulo: 'Almacen',
        producto: {
          titulo: 'Producto',
          sacar: 'Sacar',
          historico: 'Histórico'
        },
        material: {
          titulo: 'Material',
          sacar: 'Sacar',
          entregar: 'Entregar',
          historico: 'Historico'
        },
      },
      profesor: {
        titulo: 'Profesor',
        almacen: {
          titulo: 'Almacen',
          productos: 'Productos',
          material: 'Material'
        },
        tratamientos: 'Tratamientos',
        alumnado: {
          titulo: 'Alumnado',
          alumnos: 'Alumnos',
          grupos: 'Grupos'
        },
        calendario: 'Calendario'
      },
      tareas: 'Tareas',
      citas: 'Citas',
      calendar: {
        meses: {
          enero:'Enero',
          febrero:'Febrero',
          marzo:'Marzo',
          abril:'Abril',
          mayo:'Mayo',
          junio:'Junio',
          julio:'Julio',
          agosto:'Agosto',
          septiembre:'Septiembre',
          octubre:'Octubre',
          noviembre:'Noviembre',
          diciembre:'Diciembre'
        },
        dias: {
          lunes:'Lunes',
          martes:'Martes',
          miercoles:'Miercoles',
          jueves:'Jueves',
          viernes:'Viernes',
          sabado:'Sabado',
          domingo:'Domingo' 
        },
        placeholder: "No hay citas"
      }
    },

    citas: {
      titulo: 'Citas',
      fichaCliente: 'Ficha de Clientes',
      ticket: 'Generar Ticket',
      hora: 'Hora',
      asiento: 'Asiento',
      alumno: 'Alumno',
      asignar: 'Asignar Alumno',
      precioFuera: 'Precio Fuera',
      precioDentro: 'Precio Dentro',
      registrarCliente: 'Debe registrar la ficha del cliente',
      redireccionCliente: 'Desea ser redireccionado a registrar la ficha del cliente?',
      precioMessage:'Precio Total: ',
      citaReservada: 'Esta cita ya esta reservada',
      seleccionarCita: {
        titulo: 'Seleccionar Cita'
      },
      crear: {
        titulo: 'Insertar cita',
        fecha: 'Fecha',
        horaIni: 'Hora Inicio',
        horaFin: 'Hora Fin',
        nombre: 'Nombre',
        telefono: 'Telefono',
        descripcion: 'Descripcion',
        centro: 'Cliente del Centro'
      },
      editar: {
        titulo: 'Editar cita'
      }
    },

    fichas: {
      titulo: "Fichas",
      nombre: "Nombre",
      apellido: "Apellidos",
      seleccionCasa: "Seleccione una casa",
      seleccionTinte: "Seleccione un tinte",
      nombreape: "Nombre y apellidos",
      telefono: "Telefono",
      sensible: "Sensible",
      fecha: "Fecha",
      tinte: "Tinte",
      casa: "Casa",
      cantidad: "Cantidad",
      volumenes: "Volumenes",
      observaciones: "Observaciones",
      añadirCliente: {
        titulo: "Modificar Cliente",
        nombre: "Nombre",
        apellido: "Apellidos",
        telefono: "Telefono",
        sensible: "Piel Sensible",
      },
      modificarCliente: {
        titulo: "Insertar cita",
        nombre: "Nombre",
        apellido: "Apellidos",
        telefono: "Telefono",
        sensible: "Piel Sensible",
      },
      añadirRegistro: {
        titulo: "Añadir Tratamiento",
        fecha: "Fecha",
        casa: "Casa",
        tinte: "Tinte",
        cantidad: "Cantidad",
        volumenes: "Volumenes",
        observaciones: "Observaciones",
      },
      editarRegistro: {
        titulo: "Editar Tratamiento",
        fecha: "Fecha",
        casa: "Casa",
        tinte: "Tinte",
        cantidad: "Cantidad",
        volumenes: "Volumenes",
        observaciones: "Observaciones",
      },
    },
    tratamientos: {
      titulo: 'Tratamientos',
      precioFuera: 'Precio Fuera',
      precioDentro: 'Precio Dentro',
      editar: 'Editar Tratamiento',
      crear: 'Crear Tratamiento',
      nombre: 'Nombre',
      añadirKategoria:"Añadir Categoria",
      editarCentro:"Editar Categoria",
      color:"Utiliza Colorantes",
      extras:"Extras"
    },

    material: {
      titulo: 'Material',
      id: 'ID',
      etiqueta: 'Etiqueta',
      nombre: 'Nombre',
      carrito: 'Carrito',
      modal: {
        editar: 'Editar material',
        añadir: 'Añadir material',
        sacar: 'Sacar material'
      },
      grupo: 'Grupo',
      trabajador: 'Trabajador',
      materialLibre: 'Material libre',
      devolver: {
        titulo: 'Devolver Material',
        devuelto: 'Devolver',
        todos: 'Todos',
        trabajador: 'Trabajador',
        codigo: 'Codigo del Material',
        inicio: 'Fecha Inicio',
        fin: 'Fecha Fin'
      }
    },
  },

  eu: {
    default: {
      editar: 'Editatu',
      añadir: 'Gehitu',
      borrar: 'Ezabatu',
      salir: 'Irten',
      guardar: 'Gorde',
      filtroGrupo: 'Taldea aukeratu',
      correcto: 'Eragiketa egokia izan da',
      error: 'Errorea eragiketa egitean',
      aceptar: 'Onartu',
      limpiar: 'Garbitu',
      datosCargados: 'Datuak kargatu egin dira',
      avisoCarrito: 'Orgatxoan dago jada',
      crear: 'Sortu da',
      actualizar: 'Eguneratu da',
      exist: 'Erregistro berdin bat existitzen da'
    },

    trabajador: {
      titulo: 'Langile',
      id: 'ID',
      nombre: 'Izena',
      apellidos: 'Abizenak',
      codigo: 'Kodea',
      grupo: 'Taldea',
      modal: {
        editar: 'Langilea editatu',
        añadir: 'Langilea gehitu',
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
        añadir: 'Ordutegia gehitu',
      }
    },

    grupos: {
      titulo: 'Taldeak',
      codigo: 'Kodea',
      nombre: 'Izena',
      modal: {
        editar: 'Taldea editatu',
        añadir: 'Taldea gehitu'
      }
    },

    tareas: {
      titulo: 'Txanda',
      grupos:'Taldeak',
      tipo: 'Mota',
      fecha: 'Data',
      saltar:'Salto',
      completar: 'Amaitu',
      historico: 'Pasa den Asteko Historiala',
      mostrador: 'Mostradore',
      limpieza: 'Garbiketa',
      trabajador: 'Langilea',
      modal: {
        editar: 'Taldea editatu',
      }
    },

    productos: {
      titulo: 'Produktuak',
      id: 'ID',
      nombre: 'Izena',
      descripcion: 'Deskribapena',
      marca: 'Marka',
      marcaFil: 'Marka bat aukeratu',
      categoria: 'Kategoria',
      stock: 'Stock',
      stockAlerta: 'Stock alerta',
      kategoriaFil: 'Kategoria bat aukeratu',
      modal: {
        editar: 'Produktua editatu',
        añadir: 'Produktua gehitu',
        sacar: 'Produktuak atera'
      },
      grupo: 'Talde',
      trabajador: 'Langile',
      carrito: 'Orgatxoa',
      aviso: {
        stockMaximo: 'Gehienezko stockera iritsi da',
        stockSeguridad: 'Segurtasun stockera iritsi da'
      }
    },

    menu: {
      alertas: 'Alertak',
      alertaVacia: 'Ez daude alertak',
      almacen: {
        titulo: 'Biltegia',
        producto: {
          titulo: 'Produktuak',
          sacar: 'Atera',
          historico: 'Historikoa'
        },
        material: {
          titulo: 'Materiala',
          sacar: 'Atera',
          entregar: 'Gorde',
          historico: 'Historikoa'
        },
      },
      profesor: {
        titulo: 'Irakaslea',
        almacen: {
          titulo: 'Biltegia',
          productos: 'Produktuak',
          material: 'Materiala'
        },
        tratamientos: 'Tratamenduak',
        alumnado: {
          titulo: 'Ikasleak',
          alumnos: 'Ikasle',
          grupos: 'Taldeak'
        },
        calendario: 'Ordutegia'
      },
      tareas: 'Zereginak',
      citas: 'Hitzorduak',
      calendar: {
        meses: {
          enero:'Urtarrila',
          febrero:'Otsaila',
          marzo:'Martxoa',
          abril:'Apirila',
          mayo:'Maiatza',
          junio:'Ekaina',
          julio:'Ustaila',
          agosto:'Abuztua',
          septiembre:'Iraila',
          octubre:'Urria',
          noviembre:'Azaroa',
          diciembre:'Abendua'
        },
        dias: {
          lunes:'Astelehena',
          martes:'Asteartea',
          miercoles:'Asteazkena',
          jueves:'Osteguna',
          viernes:'Ostirala',
          sabado:'Larunbata',
          domingo:'Igandea' 
        },
        placeholder: "Ez dago hitzordurik"
      }
    },

    citas: {
      titulo: 'Hitzorduak',
      fichaCliente: 'Bezeroen fitxak',
      ticket: 'Ticket-a sortu',
      hora: 'Ordua',
      asiento: 'Eserleku',
      alumno: 'Ikaslea',
      asignar: 'Ikaslea Esleitu',
      precioFuera: 'Kanpoko prezioa',
      precioDentro: 'Barruko Prezioa',
      registrarCliente: 'Bezeroaren fitxa erregistratu behar da',
      redireccionCliente: 'Bezero fitxa erregistratzera birbideratzea nahi duzu?',
      precioMessage:'Prezio totala: ',
      citaReservada: 'Hitzordu hau jadanik erreserbatuta dago',
      seleccionarCita: {
        titulo: 'Hitzordua Aukeratu'
      },
      crear: {
        titulo: 'Hitzordua gehitu',
        fecha: 'Data',
        horaIni: 'Hasiera ordua',
        horaFin: 'Amaiera ordua',
        nombre: 'Izena',
        descripcion: 'Deskribapena',
        telefono: 'Telefonoa',
        centro: 'Centroko Bezeroa'
      },
      editar: {
        titulo: 'Hitzordua editatu'
      }
    },

    fichas: {
      titulo: "Fitxak",
      nombre: "Izena",
      apellido: "Abizenak",
      seleccionCasa: "Aukeratu etxe bat",
      seleccionTinte: "Aukeratu tindagai bat",
      nombreape: "Izena y Abizenak",
      telefono: "Telefonoa",
      sensible: "Sentikorra",
      fecha: "Data",
      tinte: "Tindagai",
      casa: "Etxea",
      cantidad: "Kantitatea",
      volumenes: "Bolumena",
      observaciones: "Behaketak",
      añadirCliente: {
        titulo: "Gehitu Bezero",
        nombre: "Izena",
        apellido: "Abizenak",
        telefono: "Telefonoa",
        sensible: "Azal Sentikorra",
      },
      modificarCliente: {
        titulo: "Eguneratu Bezero",
        nombre: "Izena",
        apellido: "Abizenak",
        telefono: "Telefonoa",
        sensible: "Azal Sentikorra",
      },
      añadirRegistro: {
        titulo: "Tratamendua Gehitu",
        fecha: "Data",
        casa: "Etxea",
        tinte: "Tindagai",
        cantidad: "Kantitatea",
        volumenes: "Bolumena",
        observaciones: "Behaketak",
      },
      editarRegistro: {
        titulo: "Tratamendua Editatu",
        fecha: "data",
        casa: "Etxea",
        tinte: "Tindagai",
        cantidad: "Kantitatea",
        volumenes: "Bolumena",
        observaciones: "Behaketak",
      }
    },
    tratamientos: {
      titulo: 'Tratamenduak',
      precioFuera: 'Kanpoko Prezioa',
      precioDentro: 'Barruko Prezioa',
      editar: 'Tratamendua Editatu',
      crear: 'Tratamendua Gehitu',
      nombre: 'Izena',
      añadirKategoria:"Kategoria Gehitu",
      editarCentro:"Kategoria Editatu",
      color:"Kolorea erabiltzen da",
      extras:"Extrak"
    },

    material: {
      titulo: 'Materiala',
      id: 'ID',
      etiqueta: 'Etiketa',
      nombre: 'Izena',
      carrito: 'Orgatxoa',
      modal: {
        editar: 'Materiala editatu',
        añadir: 'Materiala gehitu',
        sacar: 'Materiala atera'
      },
      grupo: 'Talde',
      trabajador: 'Langile',
      materialLibre: 'Material librea',
      devolver: {
        titulo: 'Materiala Bueltatu',
        devuelto: 'Bueltatu',
        todos: 'Guztiak',
        trabajador: 'Langileak',
        codigo: 'Material Kodea',
        inicio: 'Hasiera Data',
        fin: 'Amaiera Data'
      }
    }
  }
};
// Host helbidea
const environment = 'http://localhost/Erronka2/Back/talde1erronka2';
// const environment = 'https://www.talde1-back.edu:8443';