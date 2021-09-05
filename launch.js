
// queue_log.enqueue("Rocket Launched : " + (this.result_rocket ? "발사 성공" : "발사 실패"));
// UpdateText_Log();

// ResetPercent_Rocket()
let temp_percent = 70;

function launch_rocket() {
    let rocket_result = false;
    let launch_attempt = 0;

    if(temp_percent <= 0) {
        return;
    }
    let rand_percent = Math.floor(Math.random() * 100) + 1

    let timerId = setInterval(() => {
        
    }, 1000)

    if(rand_percent <= temp_percent) {
        rocket_result = true
    }
    else {
        rocket_result = false
        launch_attempt++
    }
    console.log('sss')
    queue_log.enqueue(`${rocket_result ? "발사 성공!!!!!!" : "발사 실패..."}`)
    UpdateText_Log()

}