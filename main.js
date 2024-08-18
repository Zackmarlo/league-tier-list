// champions 
const toplane = [
    "Aatrox", "Akali", "Camille", "ChoGath", "Darius", 
    "DrMundo", "Fiora", "Garen", "Gnar", "Gwen", "Illaoi", "Irelia", "Jax", "Jayce", "KSante", 
    "Kayle", "Kennen", "Malphite", "Mordekaiser", "Nasus", "Olaf", "Ornn", "Poppy", "Quinn", "Renekton", 
    "Riven", "Sett", "Shen", "Singed", "Sion", "Sylas", "TahmKench", "Teemo", "Tryndamere", "Urgot", 
    "Vladimir", "Volibear", "Warwick", "monkeyking", "Yasuo", "Yone", "Yorick", "Viego"];

const jungle = [
    "Amumu", "BelVeth", "Diana", "DrMundo", "Ekko", 
    "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", 
    "Hecarim", "Ivern", "JarvanIV", "Jax", "Karthus", 
    "Kayn", "KhaZix", "Kindred", "LeeSin", "Lillia", 
    "Maokai", "MasterYi", "Nidalee", "Nocturne", "Nunu", 
    "Olaf", "Poppy", "Rammus", "RekSai", "Rengar", 
    "Sejuani", "Shaco", "Shyvana", "Skarner", "Taliyah", 
    "Trundle", "Udyr", "Vi", "Viego", "Volibear", 
    "Warwick", "monkeyking", "XinZhao", "Zac"
];
    
const midlane = [
    "Ahri", "Akali", "AurelionSol", "Anivia", "Annie", 
    "Azir", "Aurora","Cassiopeia", "Corki", "Diana", "Ekko", 
    "Fizz", "Galio", "Gangplank", "Heimerdinger", "Irelia", 
    "Kassadin", "Katarina", "LeBlanc", "Lissandra", "Lux", 
    "Malzahar", "Neeko", "Orianna", "Pantheon", "Qiyana", 
    "Ryze", "Seraphine", "Swain", "Syndra", "Sylas", 
    "Talon", "TwistedFate", "Veigar", "VelKoz", "Vex", 
    "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", 
    "Zed", "Ziggs", "Zoe"
];

const botlane = [
    "Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", 
    "Jhin", "Jinx", "KaiSa", "Kalista", "KogMaw", 
    "Lucian", "MissFortune", "Nilah", "Samira", "Senna", 
    "Sivir", "Tristana", "Twitch", "Varus", "Vayne", 
    "Xayah", "Zeri"
];

const support = [
    "Alistar", "Bard", "Blitzcrank", "Braum", "Janna", 
    "Karma", "Leona", "Lulu", "Lux", "Milio", "Morgana", "Nami", 
    "Nautilus", "Pyke", "Rakan", "Renata", "Seraphine", "Sona", 
    "Soraka", "Swain", "TahmKench", "Taric", "Thresh", "Yuumi", "Zilean", "Zyra"
];
const remake = {"toplane" : toplane , "jungle" : jungle , "midlane" : midlane , 
         "botlane" : botlane , "support": support}


// fill the champions container with the selected lane
let champions_container = document.querySelector(".champions")
const lanes = document.querySelectorAll(".lane")
let boxs = document.querySelectorAll(".box")
let selected_lane = {index : 0 , lanename:toplane}
let dragged = null
let next_element = null
let touched = 0
let moved = false
let champ_clone = null
// fill the champions first beacuse i'm lasy to do it
fillChampions(toplane)


lanes.forEach((lane , i)=>{
    lane.addEventListener("click",()=>{
        // change selcted button
        lanes[selected_lane.index].classList.remove("selected")
        lane.classList.add("selected")
        selected_lane = {index : i , lanename: remake[lane.id]}
        
        // make sure thet the boxes are empty
        boxs.forEach(box=>{
            box.innerHTML =""
        })
        
        // fill the container
        fillChampions(selected_lane.lanename)
    })
})

function fillChampions(lane) {
    champions_container.innerHTML = ""
    for (let i = 0; i < lane.length; i++) {
        const champ = document.createElement("img");
        champ.setAttribute("src",
            `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${lane[i].toLowerCase()}.png?V3`)

        champ.id = lane[i]
        champ.classList.add("champ")
        champions_container.appendChild(champ)  
    }

    // ensures that every refill the champs renew

    let champs = document.querySelectorAll(".champ")
    champs.forEach(champ=>{
        champ.addEventListener("dragstart" , e=>{
            dragged = e.target
            next_element = champions_container.children[selected_lane.lanename.indexOf(dragged.id)]
            champ.classList.add("moving")
        })
        // for mobile
        champ.addEventListener("touchstart" , e=>{
            e.preventDefault()
            if (e.touches.length > 1){
                return;
            }
            // create a dragged target and locate the element next to it
            dragged = e.target
            next_element = champions_container.children[selected_lane.lanename.indexOf(dragged.id)]
            champ.classList.add("moving") 

            // clone the dragged targeted for style on drag move
            champ_clone = dragged.cloneNode(true)
        })

        champ.addEventListener('touchmove', e => {
            e.preventDefault();

            // make sure that the img moved to prevent click bugs
            moved = true
            // make the image move when dragged 
            const touch = e.touches[0];
            dragged.style.position = 'absolute';
            dragged.style.left = `${touch.pageX}px`;
            dragged.style.top = `${touch.pageY}px`;

            // get the coordinates of the finger
            let touchX = touch.clientX;
            let touchY = touch.clientY;
            boxs.forEach(box => {
                // check if the coordinates matches the box under it
                let rect = box.getBoundingClientRect();
                if (touchX >= rect.left && touchX <= rect.right && 
                    touchY >= rect.top && touchY <= rect.bottom) {
                    box.appendChild(champ_clone); 
                }
            });
            
        });
        champ.addEventListener('touchend', e => {
            if(e.touches.length + 1 > 1)return;
            champ_clone.remove()
            dragged.classList.remove('moving');
            let touch = e.changedTouches[0];
            let touchX = touch.clientX;
            let touchY = touch.clientY;
            let boxFound = false;
            boxs.forEach(box => {
                let rect = box.getBoundingClientRect();
                if (touchX >= rect.left && touchX <= rect.right && 
                    touchY >= rect.top && touchY <= rect.bottom) {
                    box.appendChild(dragged); 
                    boxFound = true;
                }
            });
            // if droped out side the box return to its origenal place
            if (!boxFound && moved) {
                champions_container.insertBefore(dragged, next_element);
            }
            dragged.style.position = '';
            dragged.style.left = '';
            dragged.style.top = '';
            moved = false
        });
    })
}

// drag handling
boxs = document.querySelectorAll(".box")

boxs.forEach(box=>{
    box.addEventListener("dragover", e=>{
        e.preventDefault()

        // make an indication that the img is dragged over 
        let targeted = e.target.closest(".box")
         

        targeted.appendChild(dragged)
    })
    box.addEventListener("drop" , e=>{
        e.preventDefault()
        dragged.classList.remove("moving")

        // track the targeted box to prevent droping on img
        let targeted = e.target.closest(".box") 
        targeted.appendChild(dragged)
    })
})

// handling if champ dropped outside the box
document.addEventListener("dragend", e=>{
    if(!["box" , "champ"].includes(e.target.className)){
        champions_container.insertBefore(dragged , next_element)
        dragged.classList.remove("moving")
    }
})
