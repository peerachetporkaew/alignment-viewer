$(function (){
    
})

var selSrc = [];
var selTrg = [];

var alignment = [];

function RenderEditor(source,target){
    sourceL = source.split(" ");
    targetL = target.split(" ");
    srcDiv = "";
    trgDiv = "";
    for(var i=0; i < sourceL.length; i++){
        srcDiv += "<button onclick='srcClick(this);' id='src" + i + "' class='btn btn-primary' style='margin-left : 5px;'>" + sourceL[i] + "</button>";
    }
    
    for(var i=0; i < targetL.length; i++){
        trgDiv += "<button onclick='trgClick(this);'  id='trg" + i + "' class='btn btn-primary' style='margin-left : 5px;'>" + targetL[i] + "</button>";
    }
    
    $("#divSrc").html(srcDiv);
    $("#divTrg").html(trgDiv);
}

function srcClick(e){
    selSrc.push($(e).attr("id").replace("src",""));
    $(e).removeClass("btn-primary");
    $(e).addClass("btn-success");
}

function trgClick(e){
    selTrg.push($(e).attr("id").replace("trg",""));
    $(e).removeClass("btn-primary");
    $(e).addClass("btn-success");
}

function Confirm(){
    var x = selSrc.join(" ");
    var y = selTrg.join(" ");
    alignment.push(x + " - " + y);
    alert(alignment);
    Mark();
}

function Mark(){
    
    while (selSrc.length != 0){
        var item = selSrc.pop();
        $("#src" + item).removeClass("btn-success");
        $("#src" + item).addClass("btn-warning");
    }
    
    while (selTrg.length != 0){
        var item = selTrg.pop();
        $("#trg" + item).removeClass("btn-success");
        $("#trg" + item).addClass("btn-warning");
    }
    
}

function Cancel(){
    
    while (selSrc.length != 0){
        var item = selSrc.pop();
        $("#src" + item).removeClass("btn-success");
        $("#src" + item).addClass("btn-primary");
    }
    
    while (selTrg.length != 0){
        var item = selTrg.pop();
        $("#trg" + item).removeClass("btn-success");
        $("#trg" + item).addClass("btn-primary");
    }
    
}