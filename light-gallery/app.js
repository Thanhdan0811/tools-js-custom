document.addEventListener("DOMContentLoaded", function(e) {
    function lightBoxRun(containerImgs) {
        document.querySelector(containerImgs)?.addEventListener("click", function(e){
            let indexImgClicked = null;
            if(!(e.target.tagName == "IMG")) return;
            let childImg = e.currentTarget.querySelectorAll("img");
            for(let i = 0; i < childImg.length; i++) {
                if(!(childImg[i] === e.target)) continue;
                indexImgClicked = i;
                break;
            }
            document.querySelector(".light-box-container").style.display = "block";
            document.querySelector(`.light-box-container .thum-item[data-index="${indexImgClicked}"]`)?.click();

        })
        let imgChildren = document.querySelectorAll(`${containerImgs} [src]`);

        

        
        let content = `
                <div class="slider-wrap">
                        <div class="slider-imgs">
                            ${
                                (function(){
                                    let content = ""
                                    imgChildren.forEach((ele, ind) => {
                                        console.log(ele.getAttribute("src"));
                                        let img = new Image();
                                        let height = 300;
                                        img.onload = function() {
                                            console.log("in height", this.height)
                                            height = this.height;
                                        }
                                        img.src = ele.getAttribute("src");
                                        console.log(height);
                                        content += `<div class="slider-item" >
                                                <img src="${ele.getAttribute("src")}" alt="img" />
                                        </div>`
                                    })
                                    return content;
                                })()
                            }
                        </div>
                </div>
                <span class="arrow pre"></span>
                <span class="arrow next"></span>
                <div class="images-thum">
                    ${
                        (function(){
                            let content = ""
                            imgChildren.forEach((ele, ind) => {
                                content += `<div class="thum-item" data-index=${ind}>
                                                <img src=${ele.getAttribute("src")} alt="">
                                            </div>
                                            `
                            })
                            return content;
                        })()
                    }
                </div>
                <span class="close">X</span>
                
        `
        let lightBoxContainer = document.createElement("div")
        lightBoxContainer.classList.add("light-box-container");
        lightBoxContainer.innerHTML = content;
        document.body.append(lightBoxContainer);
        // click thum-item event
        let imagesThum = document.querySelector(".light-box-container .images-thum");
        console.log(imagesThum)
        imagesThum.onclick = function(e) {
            if(!e.target.closest(".thum-item")) return;
            this.querySelector(".thum-item.active")?.classList.remove("active");
            e.target.closest(".thum-item").classList.add("active");
            // 
            let index = e.target.closest(".thum-item").dataset.index;
            
            
            let sliders = document.querySelector(".light-box-container .slider-imgs");
            let width = document.querySelector(".light-box-container .slider-wrap img").offsetWidth;
            console.log("width", width);
            sliders.style = `transform:translateX(-${index*width}px)`
        }
        // close event
        let close = document.querySelector(".light-box-container .close");
        close.onclick = function(e) {
            this.closest(".light-box-container").style.display = "none";
        }
        // next pre
        document.querySelector(".light-box-container .pre").onclick = function(e) {
            let activeImg = document.querySelector(".light-box-container .thum-item.active");
            let index = +activeImg.dataset.index;
            if(index == 0) return;
            index--;
            document.querySelector(`.light-box-container .thum-item[data-index="${index}"]`)?.click();
        }
        document.querySelector(".light-box-container .next").onclick = function(e) {
            let activeImg = document.querySelector(".light-box-container .thum-item.active");
            let index = +activeImg.dataset.index;
            if(index == imgChildren.length) return;
            index++;
            document.querySelector(`.light-box-container .thum-item[data-index="${index}"]`)?.click();
        }
    }
    lightBoxRun(".container-imgs");
})