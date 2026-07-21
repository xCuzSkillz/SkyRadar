const EditAirline = document.querySelectorAll(".edit__overlay__button")
const EditOverlay = document.querySelectorAll(".edit__overlays")

EditAirline.forEach((e) => {
    e.addEventListener("click", (e) => {
      EditOverlay.forEach((ov, idx) => {
        if(ov.id === e.target.id){
            ov.classList.remove("hidden")
            ov.classList.add("block")
        }
      })
 })
})

