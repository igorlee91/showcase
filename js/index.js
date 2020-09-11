window.onload=function(){
    document.querySelector("#over-nav").onclick = getOver
    document.querySelector("#port-nav").onclick = getPortfolio
    function getOver(){
        document.querySelector("#over-nav").className="transform navitem nav_active"
        document.querySelector("#port-nav").className="transform navitem nav_inactive"
            setTimeout(() => {
                document.getElementsByClassName("main_over")[0].className = "main_over transform displayed"
            }, 0);
            
            setTimeout(() => {
                document.getElementsByClassName("main_port")[0].classList.add("center_toleft")
            }, 50);
            setTimeout(() => {
                document.getElementsByClassName("main_over")[0].className = "main_over transform right_tocenter"
            }, 50);
    }
    function getPortfolio(){
        document.querySelector("#port-nav").className="transform navitem nav_active"
        document.querySelector("#over-nav").className="transform navitem nav_inactive"
        setTimeout(() => {
            document.getElementsByClassName("main_over")[0].className = "main_over transform"
        }, 50);
        setTimeout(() => {
            document.getElementsByClassName("main_port")[0].className = "main_port transform"
        }, 50); 
        const interval = setInterval(() => {
            if (window.getComputedStyle(document.getElementsByClassName("main_over")[0], null).getPropertyValue("margin-right")==="0px") {
                document.getElementsByClassName("main_over")[0].className = "main_over transform undisplayed"
                clearInterval(interval)
            }
            //console.log(window.getComputedStyle(document.getElementsByClassName("main_over")[0], null).getPropertyValue("margin-right"))
        }, 200);
    }   
    
}