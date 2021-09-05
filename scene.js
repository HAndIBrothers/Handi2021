function openScene() {
    moveRabbit();
}

function moveRabbit() {
    let rabbits = document.querySelector('.field_image_bottom');
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

