const types = {
  datos: {
    html: `
      <div class="buttons"></div>
      <div class="files">
        <div class="file">
          <img src="sprites/file icon.png" alt="" class="icon">
          <div class="label">Estudios</div>
        </div>
      </div>
    `,
    range: [100, 400, 300, 1000], // minY, maxY, minX, maxX
    size: [700, 500] //width, height
    }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);   // redondea hacia arriba
  max = Math.floor(max);  // redondea hacia abajo
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let windows = [];
function openWindow(type, app) {
    for(let win of windows) {
        if (win.app == app){
            return;
        }
    }
    const newIndex = windows.length + 1;

    const newWindow = document.createElement("div");
    newWindow.className = "window";
    newWindow.id = "window" + newIndex;

    newWindow.style.position = "absolute"; 
    newWindow.style.top = getRandomInt(types[app].range[0], types[app].range[1]) + "px";
    newWindow.style.left = getRandomInt(types[app].range[2], types[app].range[3]) + "px";
    newWindow.style.zIndex = newIndex;
    newWindow.style.width = types[app].size[0] + "px";
    newWindow.style.height = types[app].size[1]+"px";

    const window = document.body.appendChild(newWindow);

    windows.push({id: "window"+newIndex, type: type, app: app});

    window.innerHTML = types[app].html;

    requestAnimationFrame(() => {
        window.classList.add("show");
    });
}

const cursor = document.getElementById("cursor");
window.addEventListener('mousemove', e => {
  const x = e.pageX - cursor.offsetWidth / 2;
  const y = e.pageY - cursor.offsetHeight / 2;
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