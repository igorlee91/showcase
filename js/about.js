window.onload=function(){
    nav_hover();
    function nav_hover(){
        for(x of document.getElementsByClassName('navitem')){
            x.addEventListener('mouseover',function(){
                this.className = "navitem nav_active";
            })
            x.addEventListener('mouseout',function(){
                if(this.id !== "about-id"){
                    this.className = "navitem nav_inactive";
                }
            })
        }
    }
}