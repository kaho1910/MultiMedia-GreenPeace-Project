//Closing Minigame
export default function closeGame() {
    parent.window.postMessage("removetheiframe", "*");
}