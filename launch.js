
// queue_log.enqueue("Rocket Launched : " + (this.result_rocket ? "발사 성공" : "발사 실패"));
// UpdateText_Log();
// ResetPercent_Rocket()

// LAUNCH => PROPULSION => ENTER MOON
let temp_percent = 100;
let rocket_status = {
    1: 'LAUNCH',
    2: 'PROPULSION',
    3: 'ENTER MOON'
}
let status_number = 1;
let is_launch_progress = false;
function launch_rocket() {
    if(temp_percent <= 0) {
        return;
    }

    if(is_launch_progress == false) {
        is_launch_progress = true
        rocket_countdown()
    }
}

function rocket_countdown() {
    let countdown = 4;
    let timerId = setInterval(() => {
        if(countdown == 4) {
            queue_log.enqueue(`${rocket_status[status_number]} COUNTDOWN BEGIN!`)
            countdown--
        }
        else {
            queue_log.enqueue(`${countdown} . . .`)
            if(countdown == 0) {
                clearInterval(timerId)
                launch_result()
            }
            countdown--
        }
        UpdateText_Log()
    }, 1000)
}

function launch_result() {
    let rocket_result = false;
    let rand_percent = Math.floor(Math.random() * 100) + 1

    if(rand_percent <= temp_percent) {
        rocket_result = true
    }
    else {
        rocket_result = false
        count_return_rocket++

    }
    queue_log.enqueue(rocket_result ?
        `${rocket_status[status_number]} SUCESSED!!!!!` :
        `${rocket_status[status_number]} failed... That's okay, Let's go again`)
    UpdateText_Log()

    if(rocket_result) {
        status_number++
        if(status_number > 3) {
            queue_log.enqueue(`엔딩`)
        }
        else {
            rocket_countdown();
        }
    }
    // 실패.. 인게임으로 돌아간다.
    else {
        status_number = 1;
        is_launch_progress = false
    }
}
