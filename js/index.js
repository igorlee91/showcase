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
                this.mainport.classList.add("margin-leftminus")
                this.rightarrowimage.style.opacity="0.1"
                this.leftarrowimage.style.opacity="1"
                setTimeout(() => {
                    this.mainover.classList.add("margin-rightplus")
                }, 50);
            })
        }
        swipeLeft(el){
            el.addEventListener("click", ()=>{
                if (this.navport.className="transform navitem nav_inactive") {
                    this.navport.className="transform navitem nav_active"
                    this.navover.className="transform navitem nav_inactive"
                }
                this.rightarrowimage.style.opacity="1"
                this.leftarrowimage.style.opacity="0.1"
                this.mainover.classList.remove("margin-rightplus")
                this.mainport.classList.remove("margin-leftminus")  
            })
        }
    }
    const n = new Navigationbar(new NavigationModel,new NavigationView)
   
}

