(function () {
  // Función para obtener el código de referencia basado en el dominio
  const obtenerCodigoDeReferencia = () => {
    const dominioActual = window.location.hostname;

    const mapeoReferencias = {
      "cnfans.com": "211067",
      "mulebuy.com": "200131166",
      "hoobuy.com": "utm_source=share&utm_medium=product_details&inviteCode=K8WG2g81",
      "joyabuy.com": "300200683",
      "oopbuy.com": "utm_source=share&utm_medium=product_details&inviteCode=LTN8WJJHI"
    };

    return mapeoReferencias[dominioActual] || "";
  };

  // Activar y marcar el checkbox "Aceptar" si está presente
  const activarCheckboxDeAceptar = () => {
    const temporizador = setInterval(() => {
      const checkbox = document.querySelector("input#agree.form-check-input");
      if (checkbox && checkbox.disabled) {
        checkbox.disabled = false;
        checkbox.checked = true;
      }
    }, 200);

    // Detener la búsqueda después de 12 segundos
    setTimeout(() => clearInterval(temporizador), 12000);
  };

  // Modificar el parámetro "ref" en la URL si es necesario
  const ajustarReferenciaEnURL = () => {
    const urlActual = new URL(window.location.href);
    const codigoRef = obtenerCodigoDeReferencia();
    const esProducto = urlActual.pathname.includes("/product");
    const referenciaExistente = urlActual.searchParams.get("ref");

    if (codigoRef && esProducto && referenciaExistente !== codigoRef) {
      urlActual.searchParams.set("ref", codigoRef);
      window.location.replace(urlActual.toString());
    }
  };

  // Función para esperar que un elemento se cargue en el DOM
  const esperarElementoEnDOM = (selector, cuandoEncontrado, tiempoEspera = 5000) => {
    const inicio = Date.now();

    (function verificarElemento() {
      const elemento = document.querySelector(selector);
      if (elemento) {
        cuandoEncontrado(elemento);
      } else if (Date.now() - inicio < tiempoEspera) {
        setTimeout(verificarElemento, 100);
      }
    })();
  };

  // Manejar la eliminación de modales y contar las eliminaciones
  const eliminarModalYContar = () => {
    const codigoRef = obtenerCodigoDeReferencia();
    const selectorModal = {
      "cnfans.com": "#keywords-modal",
      "mulebuy.com": "#keywords-modal",
      "hoobuy.com": ".el-overlay",
      "joyabuy.com": "#keywords-modal",
      "oopbuy.com": ".el-overlay",
    }[window.location.hostname];

    if (codigoRef && selectorModal) {
      esperarElementoEnDOM(selectorModal, (modal) => {
        modal.style.display = "none";
        modal.remove();
        incrementarContadorDeEliminaciones();
      });
    }
  };

  // Incrementar el contador de eliminaciones en el almacenamiento local
  const incrementarContadorDeEliminaciones = () => {
    chrome.storage.local.get(["contadorEliminaciones"], (datos) => {
      const nuevoContador = (datos.contadorEliminaciones || 0) + 1;
      chrome.storage.local.set({ contadorEliminaciones: nuevoContador }, mostrarNotificacion);
    });
  };

  // Mostrar notificación de eliminación de modal
  const mostrarNotificacion = () => {
    const notificacion = document.createElement("div");
    Object.assign(notificacion.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "15px 25px",
      backgroundColor: "#28a745",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "14px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
      opacity: "0",
      transition: "opacity 0.5s",
    });

    notificacion.textContent = "Risk Reminder Removed Successfully!";
    document.body.appendChild(notificacion);

    requestAnimationFrame(() => {
      notificacion.style.opacity = "1";
    });

    setTimeout(() => {
      notificacion.style.opacity = "0";
      setTimeout(() => notificacion.remove(), 500);
    }, 4000);
  };

  // Extraer el ID de la URL
  const obtenerIdDeUrl = (url) => {
    const coincidencia = url.match(/id=(\d+)/);
    return coincidencia ? coincidencia[1] : null;
  };

  // Crear botones de redirección a plataformas relevantes
  const agregarBotonesDeRedireccion = () => {
    const url = window.location.href;
    if (url.includes("shop_id")) return;

    const plataformas = [
      { nombre: "Taobao", clave: "taobao", color: "#fc6d26" },
      { nombre: "Weidian", clave: "weidian", color: "#33a1fd" },
      { nombre: "1688", clave: "ali_1688", color: "#ff9900" },
    ];

    const contenedorBotones = document.createElement("div");
    Object.assign(contenedorBotones.style, {
      position: "fixed",
      bottom: "20px",
      left: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: "1000",
    });

    plataformas.forEach(({ nombre, clave, color }) => {
      if (url.includes(clave)) {
        const boton = document.createElement("button");
        boton.textContent = `SEE QUALITY CHECK PHOTOS (${nombre})`;
        Object.assign(boton.style, {
          padding: "24px 45px", 
          fontSize: "25px",    
          fontFamily: "Impact, Charcoal, sans-serif", 
          backgroundColor: color,
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "all 0.3s",
        });

        boton.addEventListener("click", () => {
          const id = obtenerIdDeUrl(url);
          if (id) {
            window.open(`https://finds.ly/product/${clave.toUpperCase()}/${id}`, "_blank");
          } else {
            alert("No se encontró el ID en la URL.");
          }
        });

        contenedorBotones.appendChild(boton);
      }
    });

    document.body.appendChild(contenedorBotones);
  };

  // Función principal para inicializar el script
  const iniciarScript = () => {
    ajustarReferenciaEnURL();
    eliminarModalYContar();
    activarCheckboxDeAceptar();
    agregarBotonesDeRedireccion();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarScript);
  } else {
    iniciarScript();
  }
})();