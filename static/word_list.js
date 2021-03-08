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


function red(e){
    console.log(e)
    url = `update-status/${e}`
    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"NIEZNAM","id": e})
    }).then(function(response){
        let icona =".icon_"+ parseInt(e)
        let my_div = document.querySelectorAll(icona)[0]
        icons = my_div.parentElement
        my_divs = icons.querySelectorAll(".word_list_icon")
        my_divs[0].classList.remove("word_list_red_active")
        my_divs[1].classList.remove("word_list_yellow_active")
        my_divs[2].classList.remove("word_list_green_active")
        my_divs[0].classList.add("word_list_red_active")
    })
}
function yellow(e){
    url = `update-status/${e}`
    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"KOJARZE","id": e})
    }).then(function(response){
        let icona =".icon_"+ parseInt(e)
        let my_div = document.querySelectorAll(icona)[0]
        icons = my_div.parentElement
        my_divs = icons.querySelectorAll(".word_list_icon")
        my_divs[0].classList.remove("word_list_red_active")
        my_divs[1].classList.remove("word_list_yellow_active")
        my_divs[2].classList.remove("word_list_green_active")
        my_divs[1].classList.add("word_list_yellow_active")
    })
}
function green(e){
    url = `update-status/${e}`
    fetch(url,{
        method:"UPDATE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
        body:JSON.stringify({"status":"ZNAM","id": e})
    }).then(function(response){
        let icona =".icon_"+ parseInt(e)
        let my_div = document.querySelectorAll(icona)[0]
        icons = my_div.parentElement
        my_divs = icons.querySelectorAll(".word_list_icon")
        my_divs[0].classList.remove("word_list_red_active")
        my_divs[1].classList.remove("word_list_yellow_active")
        my_divs[2].classList.remove("word_list_green_active")
        my_divs[2].classList.add("word_list_green_active")
    })
}
const word_list_container = document.getElementById("word_list_container")
const word_get = document.getElementById("word_list_get")
word_get.addEventListener("keyup", (e)=>{
    let searchValue = e.target.value
    if(!searchValue){
        searchValue="0"
    }
    console.log(searchValue)
    url = `find_word/${searchValue}`
    fetch(url,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        }
    }).then((resp)=>resp.json())
    .then(function(data){
        word_list_container.innerHTML = ""
        for(item in data){
            const word = data[item]
            const status = word.status
            console.log(status)
            console.log("ID " + word.id)
            let word_box = document.createElement("div")
            word_box.classList.add("col-md-4")
            word_box.classList.add("col-sm-12")
            let class_r = ""
            let class_y = ""
            let class_g = ""
            if(status=="NIEZNAM"){
                class_r = "word_list_red_active"
            }else if(status=="KOJARZE"){
                class_y = "word_list_yellow_active"
            }else if(status=="ZNAM"){
                class_g = "word_list_green_active"
            }
            template = 
            `
                    <div id="word_list_word">
                        <div class="word_list_header">
                        <b>${word.word_en.word_en}</b> (${word.word_en.word_pl})
                        </div>
                        <div class="word_list_status">
                                <div class="word_list_icon ${class_r} 
                                word_list_red icon_${word.id}"  data-id=${word.id}  data-status="NIEZNAM" onclick='red(${word.id})'>
                                    <i class="fas fa-times"></i>
                                </div>
                                <div class="word_list_icon ${class_y} 
                                word_list_yellow icon_${word.id}" data-id=${word.id} data-status="KOJARZE" onclick='yellow(${word.id})'>
                                    <i class="fas fa-question" ></i>
                                </div>
                                <div class="word_list_icon ${class_g} 
                                word_list_green icon_${word.id}" data-id=${word.id} data-status="ZNAM" onclick='green(${word.id})'>
                                    <i class="fas fa-check"></i>
                                </div>
                        </div>
                    </div>
                    `
            word_box.innerHTML =template
            word_list_container.appendChild(word_box);

        }
    })
})