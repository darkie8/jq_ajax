let dataText;
let idText;
let modOutChk;
let modalPosition;
let modalHeight;
let windowHeight;
let marginUltSm = 6;
let marginUltMid= 10;
let marginUltMre= 19;
let marginUltCent;
let marginUlt;
let dataId; // various variable declaration 
$(document).ready(function(){
    // clicking .show class button 
      let libra =(n)=>{ setTimeout(function(){
        // storing different data attr inside variables to initiate certain modals
        dataId= $(n).attr("data-id-modal"); 
        dataText= $(n).attr("data-size-text");
        console.log(dataText);
        modalPosition= $(n).attr("data-position-modal");

        // height of modals
        modalHeight= $(`.${dataText}`).children("div.modalP").height();
        console.log(modalHeight);
        windowHeight= $(window).height()
        console.log(windowHeight)

        // center position of the modal
        marginUltCent= ((1-modalHeight/windowHeight)/2)*100;

        // conditioning
        marginUlt= (modalPosition=="centeraxis")?marginUltCent:((modalPosition=="normal-more")?
        marginUltMre:((modalPosition=="normal")?
        marginUltMid:marginUltSm));
        console.log(marginUlt);
        modOutChk= true;
        $(`.${dataText}.${modalPosition}#${dataId}`).removeClass("sicko").addClass("freako");
        $(`body`).addClass("Overflw");
        $(`.modalP`).animate({margin: `${marginUlt}vh auto auto auto`,opacity: "1"},"fast"); 
        

        
    },1)}
    $(`.show`).click(function () {libra (this)});

    $('.crossout, .Z').click(function () { 
        modOutChk= false;
        
    });
    $(`.modalP`).click(function () { 
        if(modOutChk=== false){
            $(`.${dataText}`).removeClass("freako").addClass("sicko");
        $(`body`).removeClass("Overflw")
        $(`.modalP`).css({"margin":"0vh auto auto auto","opacity": "0"})
        }
        else{
            return;
        }
        
    });

    $('.modalhelp').click(function () { 
        $(`.${dataText}`).removeClass("freako").addClass("sicko");
        $(`body`).removeClass("Overflw")
        $(`.modalP`).css({"margin":"0vh auto auto auto","opacity": "0"})

    
    });
    

})