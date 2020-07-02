
window.onload = function(){ 
    schepen_invoegen();
    rijen_invoegen();
    kolommen_invoegen();
    plaats();
    check_voor_locale_waarden();    
    addclearlocalbutton();
    /*_________________________________________functies_____________________________________________________*/
    function schepen_invoegen(){
        let $schepen = [
            {naam:"vliegdekschip",lengte:5,kleur:"groen",afbeelding:"boot_groen.png", actief:true},			
            {naam:"slagschip",lengte:4,kleur:"rood",afbeelding:"boot_rood.png", actief:true},				
            {naam:"onderzeeer",lengte:3,kleur:"geel",afbeelding:"boot_geel.png", actief:true},				
            {naam:"torpedo",lengte:3,kleur:"oranje",afbeelding:"boot_oranje.png", actief:true},
            {naam:"patrouille",lengte:2,kleur:"blauw",afbeelding:"boot_blauw.png", actief:true}
            ]
        
            let optie_kies = document.createElement('option');
            optie_kies.innerText = `---kies een schip---`;
            optie_kies.classList.add('class_schepen');
            optie_kies.setAttribute("naam","kiesoptie")
            document.getElementById('schepen').append(optie_kies);
            for(x of $schepen){
                let optie_schip = document.createElement('option');
                optie_schip.innerText = `${x.lengte}* ${x.naam}`;
                optie_schip.classList.add('class_schepen');
                optie_schip.setAttribute("naam",x.naam);
                optie_schip.setAttribute("lengte",x.lengte);
                optie_schip.setAttribute("kleur",x.kleur);
                optie_schip.setAttribute("afbeelding",x.afbeelding);
                optie_schip.setAttribute('actief',x.actief);
                document.getElementById('schepen').append(optie_schip);
            }
    }
    function rijen_invoegen(){
        let optie_blank = document.createElement("option");
        optie_blank.innerText = "";
        document.getElementById('rij').append(optie_blank);
        for(x of document.getElementsByClassName("y")){
            let optie_rij = document.createElement('option');
            optie_rij.innerText = x.innerText;
            document.getElementById('rij').append(optie_rij);
        }
    }
    function kolommen_invoegen(){
        for(x of document.querySelectorAll(".raster> div:first-child div")){
            let optie_kolom = document.createElement('option');
            optie_kolom.innerText = x.innerText;
            document.getElementById('kolom').append(optie_kolom);
        }
    }
    function plaats(){
        
        document.getElementById('plaatsschip').type = "button";
        document.getElementById('plaatsschip').addEventListener("click",function(){
            let huidige_schips_foto = document.createElement('img');
            huidige_schips_foto.src = `img/${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.afbeelding.value}`;
            let huidige_schips_lengte = Number(`${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.lengte.value}`);
            switch (0) {
                case document.getElementById('schepen').selectedIndex:
                    toon_fout('kies een schip');
                    break;
                case document.getElementById('rij').selectedIndex:
                    toon_fout('kies een rij');
                    break;
                case document.getElementById('kolom').selectedIndex:
                    toon_fout('kies een kolom');
                    break;
                default:
                    toon_fout('');
                    let gekozen_optie = document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)];
                    let gekozen_schip_naam = gekozen_optie.attributes.naam.value;
                    //console.log(gekozen_schip_naam);
                    
                    
                    if(document.getElementById('horizontaal').checked === true){
                        //controle horizontaal
                        controle_horizontaal();  
                    }
                    if(document.getElementById('verticaal').checked === true){
                        //append verticaal
                        controle_verticaal();            
                    }
                    break;
            }
            /*plaats() functies */
            function controle_horizontaal(){
                if((document.getElementById('kolom').selectedIndex+ huidige_schips_lengte)>11){
                    toon_fout('boot is over de grens');
                }
                else{
                    let controlegetal = "";
                    for(x=0; x<huidige_schips_lengte; x++){
                        let cel = document.getElementById(`${document.getElementById('rij').selectedIndex-1}${(document.getElementById('kolom').selectedIndex-1)+x}`);
                        if(cel.children.length===1){
                            controlegetal +="-"
                        }
                        else if(cel.children.length===0){
                            controlegetal +="+"  
                        }        
                    }
                    //console.log(controlegetal);
                    if(controlegetal.includes('-')){
                        ongevalideerd();
                    }
                    else {
                        gevalideerd_horizontaal()
                    }
                }
                
            }
            function controle_verticaal(){
                if((document.getElementById('rij').selectedIndex+ huidige_schips_lengte)>11){
                    toon_fout('boot is over de grens');
                }
                else{
                    let controlegetal = "";
                    for(x=0; x<huidige_schips_lengte; x++){
                        let cel = document.getElementById(`${(document.getElementById('rij').selectedIndex-1)+x}${document.getElementById('kolom').selectedIndex-1}`);
                        if(cel.children.length===1){
                            controlegetal +="-";
                        }
                        else if(cel.children.length===0){
                            controlegetal +="+";  
                        }        
                    }
                    //console.log(controlegetal);
                    if(controlegetal.includes('-')){
                        ongevalideerd();
                    }
                    else {
                        gevalideerd_verticaal();
                    }
                }
                
            }
            function ongevalideerd(){
                toon_fout('cel is bezet');
            }
            function gevalideerd_horizontaal(){
                for(x=0; x<huidige_schips_lengte;x++){
                    let cel_horizontaal = document.getElementById(`${document.getElementById('rij').selectedIndex-1}${(document.getElementById('kolom').selectedIndex-1)+x}`);
                    let huidige_schips_foto = document.createElement('img');
                    huidige_schips_foto.src = `img/${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.afbeelding.value}`;
                    cel_horizontaal.append(huidige_schips_foto);
                }  
                console.log(document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)]);
                localStorage.setItem(`opgeslagen_schip_${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.naam.value}`,
                                    JSON.stringify(
                                        [`img/${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.afbeelding.value}`,huidige_schips_lengte,"horizontaal",`${document.getElementById('rij').selectedIndex-1}`,`${document.getElementById('kolom').selectedIndex-1}`,`${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.naam.value}`]
                                        )
                )
                document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].remove();
            } 
            function gevalideerd_verticaal(){
                for(x=0; x<huidige_schips_lengte; x++){
                    let cel = document.getElementById(`${(document.getElementById('rij').selectedIndex-1)+x}${document.getElementById('kolom').selectedIndex-1}`);
                    let huidige_schips_foto = document.createElement('img');
                    huidige_schips_foto.src = `img/${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.afbeelding.value}`;
                    cel.append(huidige_schips_foto);
                }
                localStorage.setItem(`opgeslagen_schip_${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.naam.value}`,
                                    JSON.stringify(
                                        [`img/${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.afbeelding.value}`,huidige_schips_lengte,"verticaal",`${document.getElementById('rij').selectedIndex-1}`,`${document.getElementById('kolom').selectedIndex-1}`,`${document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].attributes.naam.value}`]
                                        )
                )
                document.getElementsByClassName('class_schepen')[(document.getElementById('schepen').selectedIndex)].remove();
            }
        })
            function toon_fout(text){
            document.getElementById('msg').innerText=text;
            }
        
    }
    function check_voor_locale_waarden(){
        for(l=0; l<localStorage.length; l++){ 
            console.log();  
            if(localStorage.key(l).includes("opgeslagen_schip")){
                let foto_local_l = 
                JSON.parse(
                    localStorage.getItem(localStorage.key(l))
                )[0]
                let lengte_local_l =  
                JSON.parse(
                    localStorage.getItem(localStorage.key(l))
                )[1] 
                let richting_local_l =  
                JSON.parse(
                    localStorage.getItem(localStorage.key(l))
                )[2] 
                let rij_local_l =   
                JSON.parse(
                    localStorage.getItem(localStorage.key(l))
                )[3]
                let kolom_local_l =   
                JSON.parse(
                    localStorage.getItem(localStorage.key(l))
                )[4] 
                let naam_schip_local_l = 
                JSON.parse(
                localStorage.getItem(localStorage.key(l))
                )[5]       
                if (richting_local_l==="horizontaal"){
                for(x=0; x<lengte_local_l;x++){
                    let cel_horizontaal = document.getElementById(Number(rij_local_l+kolom_local_l)+x);
                    let huidige_schips_foto = document.createElement('img');
                    huidige_schips_foto.src = `${foto_local_l}`;
                    cel_horizontaal.append(huidige_schips_foto);
                } 
            }    
            else if (richting_local_l==="verticaal"){
                for(x=0; x<lengte_local_l;x++){
                    let cel_veticaal = document.getElementById((Number(rij_local_l)+x)+kolom_local_l);
                    let huidige_schips_foto = document.createElement('img');
                    huidige_schips_foto.src = `${foto_local_l}`;
                    cel_veticaal.append(huidige_schips_foto);
                } 
            } 
            for(o of document.querySelectorAll('#schepen>option')){
                if(naam_schip_local_l===o.attributes.naam.value){
                    o.remove()
                }
            }
        }     
                
                
            
            
        }
    }
    function addclearlocalbutton(){
        document.getElementById('nieuwspel').onclick = function(){
            localStorage.clear();
            history.go(0);
        }
        
    }

}