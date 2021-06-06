function rangeInput(selector, obj) {
    if(!selector) {
        return;
    }
    if(!document.querySelector(selector)) return;
    // console.log("obj", obj);
    let slider = document.querySelector(selector);
    let {range,handle,leftSlider,rightSlider,widthSlider} = setUpClass();
    let {min = 0, max = 100, step = 1, value = 50} = obj;
    // let min = 0;
    // let max = 500;
    // let step = 50;
    // let value = 100;


    function setUpClass() {
        slider.classList.add("slider");
        let content = ` 
                        <div class="slider-range"></div>
                        <span class="slider-handle"></span>
                    `;
        slider.innerHTML = content;
        return {
            range : slider.querySelector(".slider-range"),
            handle : slider.querySelector(".slider-handle"),
            leftSlider : parseInt(slider.getBoundingClientRect().left),
            rightSlider : parseInt(slider.getBoundingClientRect().right),
            widthSlider : parseInt(slider.getBoundingClientRect().width),
        }
    }


    function comparedCor(corX) {
        let checkLeft = +corX >= +leftSlider ? true : false;
        let checkRight = +corX <= +rightSlider ? true : false;
        return checkLeft && checkRight ;
    }
    function checkOutLeft(corX) {
        let checkLeft = +corX < +leftSlider ? true : false;
        return checkLeft;
    }
    function checkOutRight(corX) {
        let checkRight = +corX > +rightSlider ? true : false;
        return checkRight;
    }


    function mouseHandle(clientX) {
        let shift = clientX - leftSlider;
        if(shift <= 0 ) {
            shift = 0;
        }
        if(shift >= widthSlider) {
            shift = widthSlider;
        }
        let percentShift = 100 * shift / widthSlider ;
        let numberOfRange = (max - min) % step == 0 ? (max - min) / step : Number.parseInt( (max - min) / step) + 1;
        let percentOfEachRange = 100 / numberOfRange; 
        let minEdge = Number.parseInt( percentShift / percentOfEachRange );
        let currentValue = (minEdge * step + min) >= max ? max : (minEdge * step + min);
        let percentCurrent = Number.parseInt((currentValue) / step) * percentOfEachRange;
        document.querySelector(".value").innerHTML = currentValue;
        document.querySelector(".percent").innerHTML = percentCurrent ;
        document.querySelector(".show-value").innerHTML = percentOfEachRange + "/" + minEdge + "/" + numberOfRange;

        handle.style.left = percentCurrent + "%";
        range.style.width = percentCurrent + "%";
        return {
            currentValue,
        }
    }


    function mouseDown(e) {
        handle.ondragstart = function() {return false};
        function mouseMove(e) {
            let {currentValue} = mouseHandle(e.clientX);
            sliderCallback();
            
        }
        function mouseUp(e) {
            document.onmousemove = null;
            this.onmouseup = null;
        }

        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
    }


    handle.onmousedown = mouseDown;
    function sliderCallback() {
        console.log("after call");
    }
    return {

    }
}
// rangeInput.prototype.setUpClass

// window.rangeInput = rangeInput;
// window.rangeInput("#slider-custom", "");

let obj = {
    a : 5,
    b : 7,
    get: function() {
        function goi() {
            console.log("incal", this)
        };
        console.log("out",this);
        goi.call(this);
    }
}
obj.get();

// document.querySelector(".test").addEventListener("click", function(){
//     console.log(this);
//     function call() {
//         console.log(this);
//     }
//     call();

// })