var result = document.getElementById("input")
var btn = document.getElementById("startBtn")

// all worker code here
function worker_function() {
    onmessage = function (e) {
        setInterval(() => {
            console.log('Worker: Message received from main script');
            var req = new XMLHttpRequest();
            var workerResult;
            req.open('GET', 'https://imhome-server.herokuapp.com/api/order/branch/incomplete', false);
            // 2주일짜리 토큰값 28일까지
            req.setRequestHeader("x-access-token", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNzZW9uIiwiYnJhbmNoQ29kZSI6IjAwNCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTQ0NzE2MDA3LCJleHAiOjE1NDU5MjU2MDcsImlzcyI6ImltaG9tZS5jb20iLCJzdWIiOiJ1c2VySW5mbyJ9.HQOQVcvO0xG-HnWU8l0oQhF8o6zKHPWUZ7T099SOvA9I5vYoqGTLWbTsuyE7jZVPo6bLr80VZumZHp-J3GXHXg");
            req.send(null);
            if (req.status == 200) {
                workerResult = req.responseText;
            }
            console.log('Worker: Posting message back to main script');
            postMessage(workerResult);
        }, 5000);
    }
}

if (window.Worker) {
    // 기본적으로 원래 Worker를 사용하려면 이렇게 경로와 파일명을 적어서 그곳에 구현을 한다.
    // var myWorker = new Worker("worker.js");
    var myWorker = new Worker(URL.createObjectURL(new Blob(["(" + worker_function.toString() + ")()"], { type: 'text/javascript' })));

    btn.onclick = function () {
        myWorker.postMessage(["Start"]); // Sending message as an array to the worker
        console.log('Main (first.onchange): Message posted to worker');
    }

    myWorker.onmessage = function (e) {
        result.value = e.data;
        console.log('Main (myWorker.onmessage): Message received from worker');
    }
}