async function main(e) {
  if (e.key === "Enter") {
    let query = document.getElementById("search").value;
    let data = await getData(query)
    append(data)
    
  }
}



let data;
let sortdata = [];
async function getData(query) {
  try {
    let res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=40c1a28c&s=${query}`);

    data = await res.json();

    console.log(data);
    console.log(data.Search);
    return data;
  } catch (err) {
    console.log(err);
  }
}
function append(data) {
  let cont = document.getElementById("movie")
  cont.innerHTML = null;
  sortdata.splice(0, sortdata.length)
  document.getElementById("err").innerHTML = null;
  if (data.Response === "False") {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = "https://i.gifer.com/7VE.gif";
    let er = document.createElement('p');
    er.innerText = data.Error;
    div.append(img, er)
    document.getElementById("err").append(div);
  } else {
    data.Search.forEach(function(el){
    // let div = document.createElement('div');
    // let img = document.createElement('img');
    // img.src = el.Poster;
    // let title = document.createElement('p');
    // title.innerHTML = `<h1>${el.Title}</h1>`;
    // let releas = document.createElement('p');
    // releas.innerHTML = `<h4>Released</h4> : ${el.Released}`;
    // let year = document.createElement('p');
    // year.innerText = el.Year;
    // let genre = document.createElement('p');
    // genre.innerHTML = `<h4>Genre</h4> : ${el.Genre}`;
    // let lang = document.createElement('p');
    // lang.innerHTML = `<h4>Language</h4> : ${el.Language}`;
    // let plot = document.createElement('p');
    // plot.innerHTML = `<h4>Plot</h4> : ${el.Plot}`;
    // let cast = document.createElement('p');
    // cast.innerHTML = `<h4>Cast</h4> : ${el.Actors}`;
    // div.append(year);
    // cont.append(div);
    async function z (){ 
      let x = await getData1(el.imdbID)
      sortdata.push(x);
     append1(x)
    }
     z()
    })
    
  }
} 

let data1;
async function getData1(imdbID) {
  try {
    let res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=40c1a28c&`);

    data1 = await res.json();
    console.log(data1);
    // console.log(data.Search);
    return data1
  } catch (err) {
    console.log(err);
  }
  
}

function append1(data){
  let cont = document.getElementById("movie")
  // cont.innerHTML = null;
  let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = data.Poster;
    let title = document.createElement('p');
    title.innerHTML = `<h1>${data.Title}</h1>`;
    let releas = document.createElement('p');
    releas.innerHTML = `<h4>Released  :</h4>  ${data.Released}`;
    let year = document.createElement('p');
    year.innerHTML = `<h4>Year :</h4>  ${data.Year}`;
    let genre = document.createElement('p');
    genre.innerHTML = `<h4>Genre :</h4>  ${data.Genre}`;
    let lang = document.createElement('p');
    lang.innerHTML = `<h4>Language :</h4>  ${data.Language}`;
    let plot = document.createElement('p');
    plot.innerHTML = `<h4>imdbRating :</h4>  ${data.imdbRating}`;
    if(data.imdbRating>8.5){
      plot.innerHTML = `<h4>imdbRating :</h4>  ${data.imdbRating} <button>Recommended</button>`
    }
    let cast = document.createElement('p');
    cast.innerHTML = `<h4>Cast  :</h4>  ${data.Actors}`;
    div.append(img, title, releas, year ,genre, lang, plot, cast);
    cont.append(div);
}


document.getElementById("sort-lh").addEventListener("click", sortLH);

function sortLH() {
    console.log(sortdata)
    let ratingLH = sortdata.sort(function (a, b) {
        if (a.Year > b.Year) return 1
        if (a.Year < b.Year) return -1
        return 0
    })
    appendsort(ratingLH);
}

document.getElementById("sort-hl").addEventListener("click", sortHL);

function sortHL() {
    let ratingHL = sortdata.sort(function (a, b) {
        if (a.Year > b.Year) return -1
        if (a.Year < b.Year) return 1
        return 0
    })
    appendsort(ratingHL);
}


function appendsort(data){
  let cont = document.getElementById("movie")
  cont.innerHTML = null;

  data.forEach(function(el){
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = el.Poster;
    let title = document.createElement('p');
    title.innerHTML = `<h1>${el.Title}</h1>`;
    let releas = document.createElement('p');
    releas.innerHTML = `<h4>Released :</h4>  ${el.Released}`;
    let year = document.createElement('p');
    year.innerHTML = `<h4>Year :</h4>  ${el.Year}`;
    let genre = document.createElement('p');
    genre.innerHTML = `<h4>Genre :</h4> ${el.Genre}`;
    let lang = document.createElement('p');
    lang.innerHTML = `<h4>Language :</h4> : ${el.Language}`;
    let plot = document.createElement('p');
    plot.innerHTML = `<h4>imdbRating :</h4> ${el.imdbRating}`;
    if(el.imdbRating>8.5){
      plot.innerHTML = `<h4>imdbRating :</h4> ${el.imdbRating} <button>Recommended</button>`
    }
    let cast = document.createElement('p');
    cast.innerHTML = `<h4>Cast  :</h4> ${el.Actors}`;
    div.append(img, title, releas, year ,genre, lang, plot, cast);
    cont.append(div);
  })
}


// let id;

// function debounce(func, delay) {
//   if (id) {
//     clearTimeout(id);
//   }
//   id = setTimeout(function () {
//     func();
//   }, delay);
// }

function filteryear(e){
  let y = document.getElementById("year").value
  if(e.key === "Enter"){
    let data5 = sortdata;
    let x = data5.filter(function(elm){
      return y < elm.Year
    })
    appendsort(x);
  }
}

// let arr = [1,2,3,4,5,6]

// let x = arr.filter(function(i){
//   return 3 < i
// })

// console.log(x);