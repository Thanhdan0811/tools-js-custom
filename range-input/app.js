function rangeInput(selectorObj = {selector: "", min: 1, max: 100, step: 1} || "") {
    console.log(selectorObj)
    let {selector, min, max, step} = selectorObj;
    if(!selector) {
        return;
    }
    if(!document.querySelector(selector)) return;
    let slider = document.querySelector(selector);
    setUpClass();
    let range = slider.querySelector(".slider-range");
    let handle = slider.querySelector(".slider-handle");
    let leftSlider = parseInt(slider.getBoundingClientRect().left);
    let rightSlider = parseInt(slider.getBoundingClientRect().right);
    let widthSlider = parseInt(slider.getBoundingClientRect().width);
    // let min = 0;
    // let max = 500;
    // let step = 50;
    let value = 100;
    function setUpClass() {
        slider.classList.add("slider");
        let content = `
                        <div class="slider-range"></div>
                        <span class="slider-handle"></span>
                    `;
        slider.innerHTML = content;
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
            document.querySelector(".value").innerHTML = min;
            document.querySelector(".percent").innerHTML = 0 ;
            handle.style.left = 0 + "%";
            range.style.width = 0 + "%";
            return;
        }
        if(shift >= widthSlider) {
            document.querySelector(".value").innerHTML = max;
            document.querySelector(".percent").innerHTML = 100 ;
            handle.style.left = 100 + "%";
            range.style.width = 100 + "%";
            return;
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
    }
    function mouseDown(e) {
        handle.ondragstart = function() {return false};
        function mouseMove(e) {
            if(comparedCor(e.clientX)) {
                mouseHandle(e.clientX)
                return;
            }
            mouseHandle(e.clientX);
        }
        function mouseUp(e) {
            document.onmousemove = null;
            this.onmouseup = null;
        }

        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
    }
    handle.onmousedown = mouseDown;
}
rangeInput("#slider-custom");
