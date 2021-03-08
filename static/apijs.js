function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const btn_red = document.getElementById("red")
const btn_yellow = document.getElementById("yellow")
const btn_green = document.getElementById("green")

const cover = document.getElementById("cover")
function buildWord(){
    cover.style["display"] = "block"
    const en = document.getElementById("en")
    const pl = document.getElementById("pl")
    en.innerHTML = ""
    pl.innerHTML = ""
    btn_red.style["background"] = "rgb(217,22,22, 0.1)"
    btn_yellow.style["background"] = "rgb(248, 248, 8, 0.1)"
    btn_green.style["background"] = "rgb(7, 218, 35, 0.1)"
    fetch(`get-word`)
    .then((resp)=>resp.json())
    .then(function(data){
        console.log("Data: ", data)
        window.word_id=data["id"]
        en.innerHTML = data["word_en"]["word_en"]
        pl.innerHTML = data["word_en"]["word_pl"]
        if(data["status"]=="NIEZNAM"){
            btn_red.style["background"] = "rgb(217,22,22,1)"
        }
        if(data["status"]=="KOJARZE"){
            btn_yellow.style["background"] = "rgb(248, 248, 8, 1)"
        }
        if(data["status"]=="ZNAM"){
            btn_green.style["background"] = "rgb(7, 218, 35, 1)"
        }
        
    })
}
buildWord()
let is_display = true
const button_next = document.getElementById("next")
button_next.addEventListener("click", function(){
    if(is_display){
        cover.style["display"] ="none"
        is_display=false
        button_next.innerHTML = "Następneaa"
    }else{
        cover.style["display"] ="block"
        is_display = true
        button_next.innerHTML = "Pokaż"
        buildWord()
    }
})
btn_red.addEventListener("click", function(){
    url = `update-status/${window.word_id}`

    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"NIEZNAM","id": window.word_id})
    }).then(function(response){
        btn_red.style["background"] = "rgb(217,22,22,1)"
        btn_yellow.style["background"] = "rgb(248, 248, 8, 0.1)"
        btn_green.style["background"] = "rgb(7, 218, 35, 0.1)"
    })
})

btn_yellow.addEventListener("click", function(){
    url = `update-status/${window.word_id}`
    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"KOJARZE","id": window.word_id})
    }).then(function(response){
        btn_red.style["background"] = "rgb(217,22,22,0.1)"
        btn_yellow.style["background"] = "rgb(248, 248, 8, 1)"
        btn_green.style["background"] = "rgb(7, 218, 35, 0.1)"
    })
})

btn_green.addEventListener("click", function(){
    url = `update-status/${window.word_id}`
    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"ZNAM","id": window.word_id})
    }).then(function(response){
        btn_red.style["background"] = "rgb(217,22,22,0.1)"
        btn_yellow.style["background"] = "rgb(248, 248, 8, 0.1)"
        btn_green.style["background"] = "rgb(7, 218, 35, 1)"
    })
})