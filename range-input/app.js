let handle = document.querySelector(".slider-handle");
let range = document.querySelector(".slider-range");
let slider = document.querySelector(".slider");
function move(e) {
    let moveX = e.touches[0].clientX;
    let handleRec = handle.getBoundingClientRect();
    console.log(handleRec.left)
    // if(moveX > 0) {
        // console.log("aksdhflk",e)
        // handle.style.left = e.clientX + "px"; 
    // }
    // if(moveX > 0) {
        let x = 1;
        let left = Number.parseInt(getComputedStyle(handle).left);
        let sliderWidth = slider.clientWidth;
        if(left >= sliderWidth) return;
        if(left < 0) return;
        handle.style.left = left + x + "px"; 
    // }
    // if(moveX < 0) {
    //     let x = -1;
    //     let left = Number.parseInt(getComputedStyle(handle).left);
    //     let sliderWidth = slider.clientWidth;
    //     handle.style.left = left + x + "px"; 
    // }
}
function remove(e) {
    console.log("remove")
    // document.removeEventListener("mousemove", moveh);
    document.onmousemove = null;
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchmove = null;
    document.ontouchend = null
}
handle.ondragstart = function() {
    console.log("stop drag");
    return false;
};
function down(e) {
    console.log("down")
    e.stopPropagation();
    // document.addEventListener("mousemove", move);
    // document.onmousemove = move;
    document.ontouchmove = move;
    // document.onmouseup = remove;
    document.ontouchend = remove;

}
// handle.addEventListener('mousedown', down)
handle.onmousedown = down;
handle.ontouchstart = down;
// handle.addEventListener("touchstart", down);
// handle.onmouseup = function() {
//     document.removeEventListener("mousemove", moveh);
//     document.removeEventListener("mouseup", removeh);
//     document.onmousemove = null;
// }
// document.addEventListener("mousemove", function(e){
//     document.querySelector(".test").innerHTML = e.clientX;
// })