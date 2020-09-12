window.onload=function(){
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
            this.navport=document.getElementById("port-nav")
            this.navover=document.getElementById("over-nav")
            this.nav=document.querySelector("nav").children
            this.mainport=document.getElementById("main-port")
            this.mainover=document.getElementById("main-over")
            //
            this.linkHover(this.navport)
            this.linkHover(this.navover)
            //
            this.rightarrow=document.getElementById("arrow-right")
            this.leftarrow=document.getElementById("arrow-left")
            this.swipeRight(this.rightarrow)
            this.swipeRight(this.navover)
            this.swipeLeft(this.leftarrow)
            this.swipeLeft(this.navport)
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
        swipeRight(el){
            el.addEventListener("click", event =>{
                if (this.navover.className="transform navitem nav_inactive") {
                    this.navover.className="transform navitem nav_active"
                    this.navport.className="transform navitem nav_inactive"
                }
                document.getElementsByClassName("main_over")[0].classList.add("displayed")
                this.mainport.classList.add("margin-leftminus")
                setTimeout(() => {
                    this.mainover.classList.add("margin-rightplus")
                }, 50);
            })
        }
        swipeLeft(el){
            el.addEventListener("click", event =>{
                console.log(this.mainport);
                console.log(this.mainover);
                if (this.navport.className="transform navitem nav_inactive") {
                    this.navport.className="transform navitem nav_active"
                    this.navover.className="transform navitem nav_inactive"
                }
                this.mainport.classList.remove("margin-leftminus")
                this.mainover.classList.remove("margin-rightplus")
                const i=setInterval(() => {
                    console.log("xxx");
                    if (parseInt(window.getComputedStyle(this.mainover, null).getPropertyValue("margin-right"))==0) {
                        this.mainover.classList.remove("displayed")
                        clearInterval(i)
                    }
                }, 500);
            })
        }
    }
    const n = new Navigationbar(new NavigationModel,new NavigationView)
}

