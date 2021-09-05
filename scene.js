function openScene() {
    scene01_opening();
    // scene02_ingame()
}

// queue_log.enqueue("Rocket Launched : " + (this.result_rocket ? "발사 성공" : "발사 실패"));
// UpdateText_Log();

function scene01_opening() {
    let fieldCenter = document.querySelector('#field_display_center')
    fieldCenter.innerHTML = `
    <div id="scene01_container">
        <div class="scene01_field_top">
            <div id="scene01_moon"></div>
        </div>
        <div class="scene01_field_bottom">
            <div class="scene01_rabbit">
⠀⢀⣆⡉⠭⠭⠕⢂⠤⠤⠤⠄⢀⠀⠀
⢰⡉⠀⠈⠀⠀⣀⠈⠀⠟⠀⠀⠀⡇⠀
⠀⠈⠑⠒⠚⠉⠙⡀⠀⠀⠀⢀⠜⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠉⠳⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⡈⡅⠀
⠀⠀⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⡇⡇⠀
⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠈⠲⡓⠜⠀
⠀⠀⠀⣀⡎⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀
⠀⠀⢰⡁⠰⡀⠀⠀⠀⠀⠀⢠⣃⠀⠀
⠀⠀⠀⠑⠓⠊⠂⠠⠤⠤⠬⠤⠬⠅⠀
            </div>
            <div class="scene01_rabbit">
⠀⢀⣆⡉⠭⠭⠕⢂⠤⠤⠤⠄⢀⠀⠀
⢰⡉⠀⠈⠀⠀⣀⠈⠀⠟⠀⠀⠀⡇⠀
⠀⠈⠑⠒⠚⠉⠙⡀⠀⠀⠀⢀⠜⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠉⠳⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⡈⡅⠀
⠀⠀⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⡇⡇⠀
⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠈⠲⡓⠜⠀
⠀⠀⠀⣀⡎⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀
⠀⠀⢰⡁⠰⡀⠀⠀⠀⠀⠀⢠⣃⠀⠀
⠀⠀⠀⠑⠓⠊⠂⠠⠤⠤⠬⠤⠬⠅
            </div>
        </div>
    </div>
    `
    let rabbits = document.querySelector('.scene01_field_bottom');
    let check = true;
    let timerId = setInterval(() => {
        if(check) {
            rabbits.style.justifyContent= "space-evenly";
            check = false;
        } else {
            rabbits.style.justifyContent= "center";
            check = true;
        }
    }, 1000);
}

function scene02_ingame() {
    let fieldCenter = document.querySelector('#field_display_center')
    let rabbit_count = 1;
    fieldCenter.innerHTML = `
    <div id="scene02_container">
        <div id=rabbit${rabbit_count++} class="scene02_rabbicon">
            🐇
        </div>
        <div class ="scene02_spaceship">⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣾⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⢿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣾⣿⡏⠻⣿⣿⣿⠏⢿⣿⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢾⣿⡟⠀⢠⣿⠈⠁⠀⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡟⠀⠀⠀⠀⠙⠛⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        </div>
        <div id=rabbit${rabbit_count++} class="scene02_rabbicon">
            🐇
        </div>
    </div>
    `
    scene02_move_rabbits(rabbit_count)
}

function scene02_move_rabbits(rabbit_input) {
    let timerId = setInterval(() => {
        for(let i = 1; i < rabbit_input; i++) {
            let top_rand = (Math.random() * 360) - 180
            let left_rand = (Math.random() * 140) - 70
            let rabbit_id = document.querySelector(`#rabbit${i}`)
            rabbit_id.style.top = top_rand + 'px'
            rabbit_id.style.left = left_rand + 'px'
        }
    }, 1000)

}