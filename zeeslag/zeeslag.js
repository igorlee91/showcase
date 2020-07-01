window.onload=function()
{

let arrslots=[];
//keuzelijst rij
for (x=1; x<=10; x++){let c_option_rij = this.document.createElement('option');c_option_rij.innerText=x;
this.document.getElementById('rij').append(c_option_rij);}    
//keuzelijst kolom
let arrletters = ['A','B','C','D','E','F','G','H','I','J'];
for(x of arrletters){let c_option_kolom = document.createElement('option');c_option_kolom.innerText = x
this.document.getElementById('kolom').append(c_option_kolom);} 
if (localStorage.length>0)
    
    {
        let arrfromlocal=[];
        for (x=0;x<localStorage.length;x++)
        {
            arrfromlocal.push(JSON.parse(localStorage.getItem(localStorage.key(x))));
        }
        for(x of arrfromlocal)
        {
            if(x[0]==='horizontaal')
            {
                for(l=0;l<x[1];l++)
                {
                    this.document.getElementById(   x[3]+(x[4]+l)   ).append(   f(x[2]))
                    for (y of this.document.getElementById('schepen').children)
                    {
                        if (y.innerText === x[5])
                        {
                            y.innerText='';
                        }
                    }
                }
            }else if(x[0]==='verticaal')
            {
                for(l=0;l<x[1];l++)
                {
                    this.document.getElementById(    (Number(x[3])+l)  +x[4]        ).append(    f(x[2])   );     
                    for (y of this.document.getElementById('schepen').children)
                    {
                        if (y.innerText === x[5])
                        {
                            y.innerText='';
                        }
                    }
                }
            }
            for(localslot of JSON.parse(x[6]))
            {
                arrslots.push(localslot)
            }
        }
       
    }
            console.log(arrslots);
            //validatie 
            document.getElementById('plaatsschip').type = "button"
            document.getElementById('plaatsschip').onclick = 
    function()
    {

            if(document.getElementById('schepen').selectedIndex === 0)
            { 
            document.getElementById('msg').innerText = "[kies een schip]" 
            }else{document.getElementById('msg').innerText = "" };

            //plaats schip 
            let gekozenrij = `${document.getElementById('rij').selectedIndex}`;
            let gekozenkolom = document.getElementById('kolom').selectedIndex; 
            let incoming = document.getElementById('schepen').children[document.getElementById('schepen').selectedIndex];
            let length = Number(incoming.innerText.substring(0,1));
            let arrlocal=[];
            let arrincoming=[];
            
            //horizontaal
            if(document.getElementById('horizontaal').checked === true)
            {                           
                                        
                                        for(x=0;x<length;x++)
                                        {
                                            arrincoming.push(gekozenrij+(Number(gekozenkolom)+x))
                                        }
                                        console.log('incoming:'+ arrincoming);
                                        console.log('slots'+arrslots);

                                        
                                        
                                        if(valideer_of_bezet(arrincoming,arrslots))
                                        {
                                            document.getElementById('msg').innerText = "[is in gebruik,kies aub andere locatie]";
                                        }else if(valideer_grens(arrincoming))
                                        {
                                            document.getElementById('msg').innerText = "[grens overschreden]";
                                        }
                                        else
                                        {
                                            arrlocal.push('horizontaal',Number(length),incoming.dataset.afbeelding,gekozenrij,gekozenkolom,incoming.innerText,JSON.stringify(arrincoming));
                                            for(x=0; x<length; x++){arrslots.push(gekozenrij+ (Number(gekozenkolom)+x))
                                            
                                            document.getElementById(gekozenrij+ (Number(gekozenkolom)+x) ).append(f(incoming.dataset.afbeelding));
                                            }
                                            localStorage.setItem(   incoming.innerText,JSON.stringify(arrlocal)     ); 
                                            if(document.getElementById('schepen').selectedIndex>0)
                                            {
                                                incoming.innerText='';
                                            }
                                        }
                                        
            }
            //verticaal
            else
            {
                                        for(x=0;x<length;x++)
                                        {
                                            arrincoming.push(   (Number(gekozenrij)+x)  +gekozenkolom.toString()   )
                                        }
                                        console.log('incoming:'+ arrincoming);
                                        console.log('slots'+arrslots);
                                        if(valideer_of_bezet(arrincoming,arrslots))
                                        {
                                            document.getElementById('msg').innerText = "[is in gebruik,kies aub andere locatie]";
                                        }else if(valideer_grens(arrincoming))
                                        {
                                            document.getElementById('msg').innerText = "[grens overschreden]";
                                        }
                                        else
                                        {
                                            arrlocal.push('verticaal',Number(length),incoming.dataset.afbeelding,gekozenrij,`${gekozenkolom}`,incoming.innerText,JSON.stringify(arrincoming));
                                            for(x=0; x<length; x++) {arrslots.push( (Number(gekozenrij)+x)  +gekozenkolom.toString()    )
                                            document.getElementById(`${Number(gekozenrij)+x}`+gekozenkolom ).append(f(incoming.dataset.afbeelding));
                                            localStorage.setItem(    incoming.innerText,JSON.stringify(arrlocal)    );
                                            }
                                            if(document.getElementById('schepen').selectedIndex>0)
                                            {
                                                incoming.innerText='';
                                            }
                                        }
                                        
                                        
            }
               
            
    }      
    document.getElementById('nieuwspel').onclick = 
    function()
    {
        for(x of document.querySelectorAll('.raster img'))
        {
            x.remove();
        }
        localStorage.clear();
        history.go(0)
    }   



    function f(i_afb)
    {
        let afb = document.createElement('img');afb.src = "img/"+i_afb;
        return afb;
    }

    function valideer_of_bezet(ai,as)
    {
        let message ="";
        for(i of ai)
        {
            for(s of as)
            {
                if(i===s)
                {
                    return true
                    
                }
            }
        }
        
    }

    function valideer_grens(ai)
    {
        for(x of ai)
        {
            if (x.length>2){return true}
        }
    }

}