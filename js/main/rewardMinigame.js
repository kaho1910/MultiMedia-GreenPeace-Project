//Minigame Reward Check
var message;
export default function rewardCheck(e) {
    if (e) {
        //reward = yes
        message = "reward=1";
    } else {
        //reward = no
        message = "reward=0";
    }
    parent.window.postMessage(message, "*");
}