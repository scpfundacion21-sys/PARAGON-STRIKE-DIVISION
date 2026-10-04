/* ==================================================
   SUPABASE
================================================== */

const SUPABASE_URL =
  "https://cvgwsiacixohezdkrgxg.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_YBK8BkixOiz7ygSGORbTsg_6HgVaDiD";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* ==================================================
   ELEMENTOS PRINCIPALES
================================================== */

const intro =
  document.getElementById("intro");

const site =
  document.getElementById("site");

const bar =
  document.getElementById("progressBar");

const boot =
  document.getElementById("boot");

const status =
  document.getElementById("introStatus");

const skip =
  document.getElementById("skip");


/* ==================================================
   AUDIO DEL INTRO
================================================== */

const introAudio = new Audio(
  "https://scpfundacion21-sys.github.io/bienvenida1/bienvenida.mp3"
);

introAudio.preload = "auto";
introAudio.volume = 1.0;


/* ==================================================
   INTRO
================================================== */

skip.style.display = "none";

let progress = 0;

const loading =
  setInterval(() => {

    progress++;

    bar.style.width =
      progress + "%";

    boot.textContent =
      `SYSTEM BOOT // ${String(progress).padStart(2, "0")}%`;

    if (progress > 25) {

      status.textContent =
        "SECURE CONNECTION ESTABLISHED...";

    }

    if (progress > 55) {

      status.textContent =
        "TACTICAL NETWORK ONLINE...";

    }

    if (progress > 82) {

      status.textContent =
        "AUTHORIZATION ACCEPTED // WELCOME";

    }

    if (progress >= 100) {

      clearInterval(loading);

      boot.textContent =
        "SYSTEM BOOT // 100%";

      status.textContent =
        "AUTHORIZATION ACCEPTED // READY";

      skip.style.display =
        "inline-block";

    }

  }, 45);


/* ==================================================
   ENTRAR
================================================== */

skip.addEventListener(
  "click",
  () => {

    introAudio.currentTime = 0;

    introAudio.play().catch(
      (error) => {

        console.log(
          "No se pudo reproducir el audio:",
          error
        );

      }
    );

    showSite();

  }
);


function showSite() {

  intro.style.transition =
    "opacity .8s ease";

  intro.style.opacity =
    "0";

  setTimeout(() => {

    intro.remove();

    site.classList.add("show");

  }, 800);

}


/* ==================================================
   TERMINAL
================================================== */

const terminalText = `
PARAGON SECURE DATABASE
--------------------------------

CONNECTION: ENCRYPTED
NETWORK: ONLINE
AUTHORIZATION: LEVEL 04

> Tactical command systems operational.
> Current deployments: 03
> Active operators: 04
> Communications: SECURE

SYSTEMS:
> ARMORY DATABASE: ONLINE
> EQUIPMENT DATABASE: ONLINE
> OPERATOR REGISTRATION: ACTIVE
> INTELLIGENCE NETWORK: ONLINE

WARNING:
Unauthorized access is prohibited.

PARAGON STRIKE DIVISION

// END TRANSMISSION
`;


const terminal =
  document.getElementById(
    "terminalText"
  );


let index = 0;

let started = false;


const observer =
  new IntersectionObserver(
    (entries) => {

      if (
        entries[0].isIntersecting &&
        !started
      ) {

        started = true;

        const typing =
          setInterval(() => {

            terminal.textContent +=
              terminalText[index] || "";

            index++;

            if (
              index >=
              terminalText.length
            ) {

              clearInterval(typing);

            }

          }, 18);

      }

    },
    {
      threshold: 0.4
    }
  );


observer.observe(terminal);


/* ==================================================
   REGISTRO DE OPERADOR
================================================== */

const registerButton =
  document.getElementById(
    "registerButton"
  );


const systemRegisterButton =
  document.getElementById(
    "systemRegisterButton"
  );


const registrationOverlay =
  document.getElementById(
    "registrationOverlay"
  );


const registrationBox =
  document.getElementById(
    "registrationBox"
  );


const loadingBox =
  document.getElementById(
    "loadingBox"
  );


const registeredBox =
  document.getElementById(
    "registeredBox"
  );


const closeRegistration =
  document.getElementById(
    "closeRegistration"
  );


const submitRegistration =
  document.getElementById(
    "submitRegistration"
  );


const registrationEmail =
  document.getElementById(
    "registrationEmail"
  );


const operatorVideo =
  document.getElementById(
    "operatorVideo"
  );


/* ==================================================
   FUNCIÓN PARA ABRIR REGISTRO
================================================== */

function openRegistration() {

  registrationOverlay.classList.add(
    "active"
  );

  showRegistrationBox();

  registrationEmail.value =
    "";

  setTimeout(() => {

    registrationEmail.focus();

  }, 100);

}


/* ==================================================
   BOTÓN PRINCIPAL
================================================== */

registerButton.addEventListener(
  "click",
  openRegistration
);


/* ==================================================
   BOTÓN OPERADORES DE SYSTEMS
================================================== */

systemRegisterButton.addEventListener(
  "click",
  openRegistration
);


/* ==================================================
   MOSTRAR CUADRO 1
================================================== */

function showRegistrationBox() {

  registrationBox.classList.add(
    "active"
  );

  loadingBox.classList.remove(
    "active"
  );

  registeredBox.classList.remove(
    "active"
  );

}


/* ==================================================
   MOSTRAR CUADRO 2
================================================== */

function showLoadingBox() {

  registrationBox.classList.remove(
    "active"
  );

  loadingBox.classList.add(
    "active"
  );

  registeredBox.classList.remove(
    "active"
  );

}


/* ==================================================
   MOSTRAR CUADRO 3
================================================== */

function showRegisteredBox() {

  registrationBox.classList.remove(
    "active"
  );

  loadingBox.classList.remove(
    "active"
  );

  registeredBox.classList.add(
    "active"
  );

  operatorVideo.muted =
    true;

  operatorVideo.volume =
    0;

  operatorVideo.currentTime =
    0;

  operatorVideo.play().catch(
    (error) => {

      console.log(
        "No se pudo reproducir el video:",
        error
      );

    }
  );


  setTimeout(() => {

    closeRegistrationFlow();

  }, 6000);

}


/* ==================================================
   CONTINUAR + SUPABASE
================================================== */

async function registerOperator() {

  const email =
    registrationEmail.value.trim();


  /* COMPROBAR CORREO VACÍO */

  if (!email) {

    registrationEmail.focus();

    return;

  }


  /* COMPROBAR FORMATO */

  if (
    !registrationEmail.checkValidity()
  ) {

    registrationEmail.reportValidity();

    return;

  }


  /* MOSTRAR REGISTRANDO */

  showLoadingBox();


  console.log(
    "Registrando operador:",
    email
  );


  /* GUARDAR EN SUPABASE */

  const { data, error } =
    await supabaseClient
      .from("operadores")
      .insert([
        {
          email: email,
          estado: "ACTIVO"
        }
      ])
      .select();


  /* COMPROBAR ERROR */

  if (error) {

    console.error(
      "Error de Supabase:",
      error
    );


    showRegistrationBox();


    if (
      error.code === "23505"
    ) {

      alert(
        "ESTE CORREO YA ESTÁ REGISTRADO."
      );

    } else {

      alert(
        "ERROR DE REGISTRO\n\n" +
        "No se pudo completar el registro."
      );

    }


    registrationEmail.focus();

    return;

  }


  /* REGISTRO CORRECTO */

  console.log(
    "OPERADOR REGISTRADO CORRECTAMENTE:",
    data
  );


  /*
     Esperamos 2.2 segundos para
     mantener la animación REGISTRANDO.
  */

  setTimeout(() => {

    showRegisteredBox();

  }, 2200);

}


/* ==================================================
   BOTÓN CONTINUAR
================================================== */

submitRegistration.addEventListener(
  "click",
  registerOperator
);


/* ==================================================
   CERRAR REGISTRO
================================================== */

closeRegistration.addEventListener(
  "click",
  () => {

    closeRegistrationFlow();

  }
);


/* ==================================================
   CLICK FUERA
================================================== */

registrationOverlay.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      registrationOverlay
    ) {

      closeRegistrationFlow();

    }

  }
);


/* ==================================================
   CERRAR TODO
================================================== */

function closeRegistrationFlow() {

  registrationOverlay.classList.remove(
    "active"
  );

  registrationBox.classList.remove(
    "active"
  );

  loadingBox.classList.remove(
    "active"
  );

  registeredBox.classList.remove(
    "active"
  );

  operatorVideo.pause();

  operatorVideo.currentTime =
    0;

  operatorVideo.muted =
    true;

  operatorVideo.volume =
    0;

}


/* ==================================================
   ENTER EN CORREO
================================================== */

registrationEmail.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter"
    ) {

      submitRegistration.click();

    }

  }
);
