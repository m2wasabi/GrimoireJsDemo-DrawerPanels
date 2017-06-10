gr(function(){
    let selectedFloor = null;
    let selected = false;
    let busyFloor = null;
    let floorOffset = null;
    let isBusy = false;
    console.log("Wahhooooi");
    gr("#main")("#floorbord1").on("mouseenter",function(){
        console.log("Yahhooooi");
    });
    gr("#main")("#floor1").on("mouseenter",function(){
        console.log("Yahhoooow");
    });

    gr("#main")(".floorElement").on("mouseenter",function(){
        console.log("Yahhoooow");
    });
    gr("#main")(".floorElement").on("mouseleave",function(){
        console.log(">R Yahhoooow");
        console.log(this.parent.parent.element);
        this.parent.parent.element.setAttribute("position","1,1,1");
        this.parent.parent.element.setAttribute("rotation","1,1,0");
        gr("#main")(".floorElement").setAttribute("position","1,1,1");
        // this.parent.parent.element.moveX("1");
    });

    for(let floor = 1;floor <= 10;floor++) {
        gr("#main")(".floorElement" + floor).on("mouseenter",function(){
            console.log("+" + floor);
            selectedFloor = floor;
            selected = true;
        });
        gr("#main")(".floorElement" + floor).on("mouseleave",function(){
            console.log("-" + floor);
            selectedFloor = null;
            selected = false;   
        });
    }

    document.querySelector("canvas").addEventListener("click",function(){
        if(isBusy) return;
        if(selected){
            isBusy = true;
            if(busyFloor){
                gr("#main")("#floor" + busyFloor).setAttribute("position",floorOffset);
                gr("#main")("#floor" + busyFloor).setAttribute("rotation","0,0,0");
                gr("#main")("#floor" + busyFloor).setAttribute("scale","1,1,1");
                console.log("Repair " + busyFloor);
                floorOffset = null;
                busyFloor = null;
            }
            let target = gr("#main")("#floor" + selectedFloor);
            floorOffset = target.getAttribute("position");
            // target.setAttribute("position","8,0," + floorOffset.Z);
            easing(target,"position",[15,0, 4 - floorOffset.Z],1000);
            easing(target,"rotation",[90, 0, 0],1000);
            easing(target,"scale",[1.5, 1.5, 1.5],1000);
            busyFloor = selectedFloor;
        }
    });

    function easeOut(t, d){
    return 1 - Math.pow(1 - (t / d), 5);
    }

    function easing(element,attr,targetVal,timespan) {
        let delay = 16;
        let timerVal = 1;
        let start = Date.now();
        let initVal = element.getAttribute(attr);
        let sasingInstanse = setInterval(function(){
            let t = (Date.now() - start) / timespan;
            let result = easeOut(t, timerVal);
            let y = initVal + result * targetVal;
            
            element.setAttribute(attr,"" + (initVal.X + result * targetVal[0]) + "," + (initVal.Y + result * targetVal[1]) + "," + (initVal.Z + result * targetVal[2]));
            if (t >= timerVal) { 
                clearInterval(sasingInstanse);
                isBusy = false;
            }
        },delay);
    }
});
