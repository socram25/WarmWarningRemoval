(function() {
    function fetchAffiliateCode() {
        const AffiliateCode = window.location.hostname;
        switch (AffiliateCode) {
            case "cnfans.com":
                return "211067";
            case "mulebuy.com":
                return "200131166";
            case "hoobuy.com":
                return "utm_source=share&utm_medium=product_details&inviteCode=K8WG2g81";
            default:
                return "";
        }
    }

    function habilitarCheckbox() {
        const intervalo = setInterval(() => {
            const checkbox = document.querySelector("input#agree.form-check-input");
            if (checkbox && checkbox.disabled) {
                checkbox.disabled = false;
                checkbox.checked = true;
            }
        }, 500);
        setTimeout(() => clearInterval(intervalo), 12000);
    }

    function actualizarUrlConRef() {
        const url = new URL(window.location.href);
        const AffiliateCode = url.hostname;
        const ref = fetchAffiliateCode();
        if (["cnfans.com", "mulebuy.com", "hoobuy.com"].includes(AffiliateCode) && url.pathname.includes("/product") && url.searchParams.get("ref") !== ref) {
            url.searchParams.set("ref", ref);
            window.location.replace(url.toString());
        }
    }

    function esperarElementoYEjecutar(selector, callback, tiempoEspera = 5000) {
        const tiempoInicio = Date.now();
        (function buscarElemento() {
            const elemento = document.querySelector(selector);
            if (elemento) {
                callback(elemento);
            } else if (Date.now() - tiempoInicio < tiempoEspera) {
                setTimeout(buscarElemento, 100);
            }
        })();
    }

    function gestionarModal() {
        const AffiliateCode = window.location.hostname;
        const refUrl = new URL(window.location.href).searchParams.get("ref");
        const refEsperada = fetchAffiliateCode();
        
        if (["cnfans.com", "mulebuy.com"].includes(AffiliateCode)) {
            if (refUrl === refEsperada) {
                const modal = document.getElementById("keywords-modal");
                if (modal) {
                    modal.style.display = "none";
                    modal.remove();
                    chrome.storage.local.get(["removalCount"], data => {
                        const count = (data.removalCount || 0) + 1;
                        chrome.storage.local.set({ removalCount: count }, mostrarNotificacion);
                    });
                }
            }
        } else if (AffiliateCode === "hoobuy.com") {
            if (refUrl === refEsperada) {
                esperarElementoYEjecutar(".el-overlay", overlay => {
                    overlay.style.display = "none";
                    overlay.remove();
                    chrome.storage.local.get(["removalCount"], data => {
                        const count = (data.removalCount || 0) + 1;
                        chrome.storage.local.set({ removalCount: count }, mostrarNotificacion);
						  });
                });
            }
        }
    }

    function mostrarNotificacion() {
        const notificacion = document.createElement("div");
        notificacion.id = "removal-notification";
        notificacion.style.position = "fixed";
        notificacion.style.bottom = "10px";
        notificacion.style.right = "10px";
        notificacion.style.padding = "10px 20px";
        notificacion.style.backgroundColor = "#4caf50";
        notificacion.style.color = "#fff";
        notificacion.style.fontSize = "14px";
        notificacion.style.borderRadius = "5px";
        notificacion.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        notificacion.style.zIndex = "10000";
        notificacion.style.transition = "opacity 1s ease-out";
        notificacion.textContent = "Risk Reminder Removed Successfully!";
        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.style.opacity = "0";
            setTimeout(() => {
                notificacion.remove();
            }, 1000);
        }, 10000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            actualizarUrlConRef();
            gestionarModal();
            habilitarCheckbox();
        });
    } else {
        actualizarUrlConRef();
        gestionarModal();
        habilitarCheckbox();
    }
})();