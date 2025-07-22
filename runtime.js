const types = {
  datos: {
    html: `
      <div class="buttons datosButtons">
            <div class="close-btn" onclick="closeWindow('datos')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
            <div class="min-btn" onclick="minWindow('datos')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
        </div>
        <div class="files">
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 2</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 3</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 4</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 5</div>
            </div>
        </div>
    `,
    range: [6.25, 25, 18.75, 50], // minY, maxY, minX, maxX -> px/16
    size: [61.81, 34], // width, height
    closeBtnConfig: [3.125, 1.875, 58.06, 0.5], // width, height, left, top
    minBtnConfig: [3.125, 1.875, 48.06, 0.5] // width, height, left, top
  },
  estudios: {
    html: `
      <div class="buttons datosButtons">
            <div class="close-btn" onclick="closeWindow('estudios')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
            <div class="min-btn" onclick="minWindow('estudios')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
        </div>
        <div class="files">
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 2</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 3</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 4</div>
            </div>
            <div class="file">
                <img src="sprites/file icon.png" alt="" class="icon">
                <div class="label">Estudios 5</div>
            </div>
        </div>
    `,
    range: [6.25, 25, 18.75, 50],
    size: [61.81, 34],
    closeBtnConfig: [3.125, 1.875, 58.06, 0.5],
    minBtnConfig: [3.125, 1.875, 48.06, 0.5]
  },
  skills: {
    html: `
      <div class="buttons">
            <div class="close-btn" onclick="closeWindow('skills')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
            <div class="min-btn" onclick="minWindow('skills')" onmouseover="changeCursor(1)" onmouseleave="changeCursor(0)"></div>
        </div>
    `,
    range: [2.25, 14, 8.75, 30],
    size: [72.125, 45.5],
    closeBtnConfig: [3.125, 1.875, 58.06, 0.5],
    minBtnConfig: [3.125, 1.875, 48.06, 0.5]
  },
};


function getRandomInt(min, max) {
  min = Math.ceil(min);   // redondea hacia arriba
  max = Math.floor(max);  // redondea hacia abajo
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let windows = [];
let indexGiver = 0;
function openWindow(type, app) {
    for(let win of windows) {
        if (win.app == app){
            return;
        }
    }
    const newIndex = indexGiver + 1;
    indexGiver = newIndex;

    const newWindow = document.createElement("div");
    newWindow.className = "window";
    switch(app) {
      case "skills":
        newWindow.className = "window skills"
        console.log("ayuda")
        break;
    }
    newWindow.id = "window" + newIndex;

    newWindow.style.position = "absolute"; 
    newWindow.style.top = getRandomInt(types[app].range[0], types[app].range[1]) + "rem";
    newWindow.style.left = getRandomInt(types[app].range[2], types[app].range[3]) + "rem";
    newWindow.style.zIndex = newIndex;
    newWindow.style.width = types[app].size[0] + "rem";
    newWindow.style.height = types[app].size[1]+"rem";

    const window = document.body.appendChild(newWindow);

    windows.push({id: "window"+newIndex, type: type, app: app});

    window.innerHTML = types[app].html;

    requestAnimationFrame(() => {
        // window.classList.remove("closing");
        window.classList.add("show");
    });
}

const cursor = document.getElementById("cursor");
window.addEventListener('mousemove', e => {
  const x = e.pageX - cursor.offsetWidth / 4;
  const y = e.pageY - cursor.offsetHeight / 4;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
})

function changeCursor(pointer) {
  if (pointer) {
    cursor.src = "sprites/cursor pointer.webp"
  } else {
    cursor.src = "sprites/cursor.png"
  }
}

function closeWindow(app) {
  for (let i = 0; i < windows.length; i++) {
    if (windows[i].app === app) {
      const winId = windows[i].id;
      const windowEl = document.getElementById(winId);

      if (windowEl) {
        // Añade clase de cierre
        windowEl.classList.add("closing");

        // Espera a que termine la animación para eliminar del DOM
        windowEl.addEventListener('animationend', () => {
          windowEl.remove();
        }, { once: true });
      }

      // Elimina del array de ventanas
      windows.splice(i, 1);
      console.log(windows)
      break;
    }
  }
}

function minWindow(app) {
  for (let i = 0; i < windows.length; i++) {
    if (windows[i].app === app) {
      const winId = windows[i].id;
      const windowEl = document.getElementById(winId);

      if (windowEl) {
        // Añade clase de cierre
        windowEl.classList.add("minimize");
        windowEl.classList.add("closing");

        // Espera a que termine la animación para eliminar del DOM
        windowEl.addEventListener('animationend', () => {
          windowEl.remove();
        }, { once: true });
      }

      // Elimina del array de ventanas
      windows.splice(i, 1);
      console.log(windows)
      break;
    }
  }
}

(() => {
  const clock = document.getElementById("clock")
  setInterval(()=>{
    const date = new Date()
    clock.innerText = date.toLocaleString()
  }, 1000)
})();