const a = document.getElementsByClassName("a")[0];
a.addEventListener("click", function () {
    console.log(this);
}, false)
const b = document.getElementsByClassName("b")[0];
b.onclick = function () {
    console.log(this)
}
function test() {
    console.log(this)
}