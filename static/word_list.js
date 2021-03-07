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

