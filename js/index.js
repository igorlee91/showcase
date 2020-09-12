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
            this.main=document.querySelector("main")
            this.mainport=document.getElementById("main-port")
            this.mainover=document.getElementById("main-over")
            //
            this.arrowCheck()
            //
            this.linkHover(this.navport)
            this.linkHover(this.navover)
            //
            this.rightarrow=document.getElementById("arrow-right")
            this.rightarrowimage=document.getElementById("poly-right")
            this.leftarrow=document.getElementById("arrow-left")
            this.leftarrowimage=document.getElementById("poly-left")
            this.swipeRight(this.rightarrow)
            this.swipeRight(this.navover)
            this.swipeLeft(this.leftarrow)
            this.swipeLeft(this.navport)
            //
            //this.debug()
        }
        debug(){
            window.addEventListener("click",()=>{
                console.log(this.mainport);
                                console.log(this.mainover);
                                console.log(this.rightarrow);
            })
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
            el.addEventListener("click", () =>{
                if (this.navover.className="transform navitem nav_inactive") {
                    this.navover.className="transform navitem nav_active"
                    this.navport.className="transform navitem nav_inactive"
                }
                this.mainover.classList.add("displayed")
                this.mainport.classList.add("margin-leftminus")
                setTimeout(() => {
                    this.mainover.classList.add("margin-rightplus")
                }, 50);
                if (window.matchMedia("(min-width:1200px)").matches) {
                    this.rightarrow.style.display="none"
                    this.leftarrow.style.display="grid"
                    this.mainport.append(this.leftarrow)
                    this.mainover.style.gridTemplateColumns="94%"
                }
            })
        }
        swipeLeft(el){
            el.addEventListener("click", ()=>{
                
                if (this.navport.className="transform navitem nav_inactive") {
                    this.navport.className="transform navitem nav_active"
                    this.navover.className="transform navitem nav_inactive"
                }
                this.mainover.classList.remove("margin-rightplus")
                this.mainport.classList.remove("margin-leftminus")
                
                const i=setInterval(() => {
                    if (parseInt(window.getComputedStyle(this.mainover, null).getPropertyValue("margin-right"))==0) {
                        this.mainover.classList.remove("displayed")
                        if (window.matchMedia("(min-width:1200px)").matches) {
                            this.rightarrow.style.display="grid"
                            this.leftarrow.style.display="none"
                            this.mainport.append(this.rightarrow)
                            this.mainover.style.gridTemplateColumns="6 94%"
                            /*this.rightarrow.style.display="none"
                            this.mainport.append(this.leftarrow)
                            this.mainover.style.gridTemplateColumns="94%"*/
                        }
                        clearInterval(i)
                    }
                }, 500);
                
            })
        }
        arrowCheck(){
            
        }
    }
    const n = new Navigationbar(new NavigationModel,new NavigationView)
   
}

