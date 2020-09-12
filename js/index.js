window.onload=function(){
    document.querySelector("#over-nav").onclick = getOver
    document.querySelector("#arrow-getover").onclick = getOver
    document.querySelector("#port-nav").onclick = getPortfolio
    document.querySelector("#arrow-getport").onclick = getPortfolio
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
class Navigationbar{
    constructor(navModel,navView){
        this.navModel = navModel
        this.navView = navView
        //
    }
}
class NavigationModel{
    
}
class NavigationView{
    constructor(){
        this.portoflio_=document.getElementById("port-nav")
        this.about_=document.getElementById("over-nav")
        this.nav=document.querySelector("nav").children
        this.linkHover(this.portoflio_)
        this.linkHover(this.about_)
    }
    linkHover(link){
        link.addEventListener("mouseover",event=>{
            if (event.target.className=="transform navitem nav_inactive") {
                event.target.classList.add("nav_active")
                for (const x of this.nav) {
                    if (x!==event.target) {
                        x.classList="transform navitem nav_inactive"
                    }
                }
            }
        })
        link.addEventListener("mouseout",event=>{
            if (event.target.className=="transform navitem nav_inactive nav_active") {
                event.target.classList.remove("nav_active")
                for (const x of this.nav) {
                    if (x!==event.target) {
                        x.classList="transform navitem nav_active"
                    }
                }
            }   
        })
    }

}
const n = new Navigationbar(new NavigationModel,new NavigationView)
console.log(n);