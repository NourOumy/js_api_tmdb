// intégrer des plugin

// champs de recherche => search => movie ATTENTION ADULT = FALSE
// query = ce qu'on écritt dans l input
let input = document.querySelector('input')
let button = document.querySelector('.btn')
let buttonNext = document.querySelector('.btnNext')
let collections = document.querySelector('.collections')
let collectionNext = document.querySelector('.collectionNext')
let span = document.querySelector('span')
let toIntegrate = document.querySelector('section')


/* <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper collections ">
          <!-- Slides -->
        </div>
      
        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      

        
      </div> */

function integrationMovie (destination, donnees){
  destination.innerHTML += `
  <div class="swiper">
    <div class="swiper-wrapper collections ">
      <div class="swiper-slide">
        <h1>${donnees.original_title}</h1>
        <img src="https://image.tmdb.org/t/p/w500/${donnees.poster_path}" alt="">
      </div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
  `
}


function myFetch (nextpage){
  buttonNext.style.display = "none"
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=6631e5f1dc96088e0d26b86da29b5b6a&query=${input.value}&page=${nextpage}`) 

    .then(response => response.json()) 

    .then(data => { 
      for(let i=0; i<data.results.length; i++ ){
        if(data.results[i].poster_path){
          integrationMovie (toIntegrate, data.results[i])
          // destination.innerHTML += `
          //     <div class="swiper-slide">
          //       <h1>${data.results[i].original_title}</h1>
          //       <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="">
          //     </div>`
        }else{
          destination.innerHTML += `
              <div class="swiper-slide">
                <h1>${data.results[i].original_title}</h1>
                <img src="images/Qw6p8JtdLDHUG_hYpDv1TnAauESOnFNrb7f7vaFiWNe7uQBP1-1Tqh-EbzdJ9t5c_iIyHSshQg=s176-c-k-c0x00ffffff-no-rj.webp" alt="" style= "width:500px">
              </div>`
      }

        if(data.total_pages > 1){
        buttonNext.style.display = "inline-block"
  }

  }

  
     
  span.innerHTML = ` contenant : ${input.value}`
  
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error); 
  })

}



myFetch()



button.addEventListener('click', function(){
  toIntegrate.innerHTML =""
      myFetch(1)
  input.value ="" 

})

input.addEventListener("keyup", function(event){    
  if(event.key === "Enter"){
  toIntegrate.innerHTML =""
      myFetch(1)
  input.value ="" 
  }
})

const swiper = new Swiper('.swiper', {

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

})

buttonNext.addEventListener('click', function() {
  myFetch(2, collectionNext)

  })