// main document ready function to check if dom is loaded fully or not


let title
let year
let id
let plot
let k=[]
let k1= []
var time= 1000
let imgPoster;
$(document).ready(() => {
   // preven default
    $(`button`).click(function (e) { 
        e.preventDefault();
        
    });   
   // ajax call
    function dfdAJAX(n){
        // defarred to use elements after ajax loads itself
        var dfd= $.Deferred()
        var omega= 
        $.ajax({
               type: 'GET',
               dataType: 'jsonp',
               async: true,
               url: `https://www.omdbapi.com/?${$(n).parents("form").serialize()}&apikey=2534d699`,
               timeout: time});
        omega.then(function(m){
            console.log(m)
            k.splice(0,0,m)
            return k
            },
            function(e){
            if(e.statusText == 'timeout')
            {
                k.splice(0,0,{"Response":"timeout"})
             return k}
            })  

        dfd.resolve(k)
        return dfd.promise()
    }
    // a function declaration which will deal with posting rele4vent html dom elements
    let infoShow = (n)=>{
        // undoing every change 
        $(`.modalP`).removeClass("brkP");
        
        $(`.modalM`).css("background-image","url()")
        $(`.modalhelp`).css("height", "100%");
        $(`.modalH`).find(`p`).html(`Hello!`)
        $(`#needText`).html(`<i class="fas fa-spinner fa-pulse fa-5x"></i><br><br>Proceeding`);
        dfdAJAX(n).then(function(t){
            // using timeout to maintain dataload and usage of it....sync properly 
            setTimeout(function(){
                console.log(t)
                console.log(t[0])
                k1.splice(0,0,t[0].Response)
                console.log(k1)
                if(k1[0] == "False")
                {   $(`.modalhelp`).css("height", "100%");
                    $(`#needText`).html(`<i class="fas fa-exclamation-circle fa-5x"></i><br><br>Please give Correct input`);
                }else if(k1[0] == "timeout"){
                    $(`.modalhelp`).css("height", "100%");
                    $(`#needText`).html(`<i class="fas fa-exclamation-circle fa-5x"></i><br><br>Request Timeout`);
                 

                } 
                
                else {
                    $(`.modalhelp`).css("height", "460vh");
                    $(`.modalP`).addClass("brkP");
                  
                    $(`.modalH`).find(`p`).html(`${t[0].Title} `);
                    if(t[0].Poster== "N/A"){
                        imgPoster = "https://darkie8.github.io/jquerry_ajax/Static/Kanishka_enhanced.jpg" 
                    }
                    else{
                        imgPoster = t[0].Poster
                    }
                    $(`.modalM`).css({"background-image": `url(${imgPoster})`,"background-size":"auto"});
                    console.log(imgPoster)
                    $(`#needText`).html(`<div class="card-group mono">
                    <div class="card-columns ">
                    <div class="card">
                      <img class="card-img-top posterimg" src= "${imgPoster}" style="border: 20px solid white;" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${t[0].Title}</h5>
                        </div>
                      <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                      </div>
                    </div>
                    </div>`);
                    
                    for(let x=0;x< Object.keys(t[0]).length-1;x++)
                    {
                        $(`.card-columns`).append(` <div class="card text-center">
                        <div class="card-body">
                          <h5 class="card-header bg-info">${Object.keys(t[0])[x]}</h5>
                          <p class="card-text p-2 ${Object.keys(t[0])[x]}">${Object.values(t[0])[x]}</p>
                          <p class="card-footer"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>`);
                      if(Object.keys(t[0])[x]=="Poster" && t[0].Poster != "N/A" ){
                          $(`.Poster`).html(`<a href="">Follow this link</a>`);
                          $(`.Poster`).find("a").attr("href", `${t[0].Poster}`);
                      }
                      if(Object.keys(t[0])[x]=="Website" && t[0].Website != "N/A"){
                        $(`.Website`).html(`<a href="">Follow this link</a>`);
                        $(`.Website`).find("a").attr("href", `${t[0].Website}`);
                    }
                      if(Array.isArray(Object.values(t[0])[x])==true)
                      {    $(`.Ratings`).html("");
                          for(let y of Object.values(t[0])[x]){
                            $(`.Ratings`).append(`<small>${y.Source}:&nbsp${y.Value}</small><br>`);
                          }
                      }
                    }
                }
                 },time)
    
           })   

    }
    // for title and year part
    $(`#search1`).find(`button`).click(function (){infoShow(this)})
     
    // for id part 
    $(`#search2`).find(`button`).click(function(){
        infoShow(this)

    })
}) // program ends