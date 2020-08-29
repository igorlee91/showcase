window.onload=function(){
    document.querySelector("#over-nav").onclick = getOver
    document.querySelector("#port-nav").onclick = getPortfolio
    nav_hover();
    function getOver(){
        nav_hover();
        document.querySelector("#over-nav").className="transform active_nav"
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
        nav_hover();
        document.querySelector("#port-nav").className="transform active_nav"
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
            console.log(window.getComputedStyle(document.getElementsByClassName("main_over")[0], null).getPropertyValue("margin-right"))
        }, 200);
        
    }
    function nav_hover(){
        for(x of document.getElementsByClassName('navitem')){
            x.addEventListener('mouseover',function(){
                this.className = "navitem nav_active";
            })
            x.addEventListener('mouseout',function(){
                if(this.id !== "portfolio-id"){
                    this.className = "navitem nav_inactive";
                }
            })
        }
    }
}