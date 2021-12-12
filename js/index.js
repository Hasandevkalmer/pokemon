const toolbarTitle = document.querySelector('.toolbar .title');
const showInputBtn = document.querySelector('#showSearchInput');
const closeInput = document.querySelector('#closeInput');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

const intro = document.querySelector('#opening');
const pokemonContainer = document.querySelector('#pokemonList');

const baseUrl = "https://pokeapi.co/api/v2/";
const totalPokemon = 50;
let daftarPokemon = [];

showInputBtn.addEventListener('click', () => {
	if (window.innerWidth <= 700) toolbarTitle.style.display = "none";
	showInputBtn.classList.add('hide');
	closeInput.classList.remove('hide-on-med-and-down');
	searchInput.classList.remove('hide-on-med-and-down');
	searchBtn.classList.remove('hide-on-med-and-down');
	searchInput.focus();
});
closeInput.addEventListener('click', () => {
	searchInput.value = "";
	if (window.innerWidth <= 600) toolbarTitle.style.display = "block";
	showInputBtn.classList.remove('hide');
	closeInput.classList.add('hide-on-med-and-down');
	searchInput.classList.add('hide-on-med-and-down');
	searchBtn.classList.add('hide-on-med-and-down');

	intro.classList.remove('hide');
	pokemonContainer.classList.add('hide');
});

searchInput.addEventListener('change', () => {
	searchBtn.click();
	searchInput.blur();
});
searchInput.addEventListener('focus', () => {
	intro.classList.add('hide');
	pokemonContainer.classList.add('hide');
});
searchInput.addEventListener('blur', () => {
	if (searchInput.value == '') {
		intro.classList.remove('hide');
	} else {
		pokemonContainer.classList.remove('hide');
	}
});

searchBtn.addEventListener('click', () => {
	searchData(searchInput.value.toLowerCase().trim());
});

function searchData(input) {
	console.clear();
	pokemonContainer.innerHTML = "";
	for (let i = 0;i < daftarPokemon.length;i++) {
		if (daftarPokemon[i].name.includes(input)) {
			console.log(daftarPokemon[i]);
			let element = `
				<div class="card col s12 m4 l3">
					<div class="card-image">
						<img class="responsive-img materialboxed" data-caption="${daftarPokemon[i].name}" src="${daftarPokemon[i].sprites.front_default}" alt="${daftarPokemon[i].name}">
					</div>
					<div class="card-action blue darken-2 center-align waves-effect waves-dark activator" style="width:100%;">
                		<a href="#"><i class="material-icons white-text">expand_less</i></a>
            		</div>
            		<div class="card-reveal blue darken-2">
            			<i class="card-title material-icons white-text right waves-effect waves-dark" style="font-size:1.8rem;margin-top:1rem;">close</i>
            			<h5 class="white-text p0 m0 left">${daftarPokemon[i].name}</h5>
                		<div class="divider" style="clear:both;"></div>
                		<table class="highlight grey-text text-lighten-3">
                			<tbody>
                				<tr>
                					<td>Experience</td>
                					<td>${daftarPokemon[i].base_experience}</td>
                				</tr>
                				<tr>
                					<td>Species</td>
                					<td>${daftarPokemon[i].species.name}</td>
                				</tr>
                				<tr>
                					<td>Height</td>
                					<td>${daftarPokemon[i].height}</td>
                				</tr>
                				<tr>
                					<td>Weight</td>
                					<td>${daftarPokemon[i].weight}</td>
                				</tr>
                			</tbody>
                		</table>
            		</div>
				</div>
			`
			pokemonContainer.innerHTML += element;
			const materialBoxElements = document.querySelectorAll('.materialboxed');
			const materialBoxInstances = M.Materialbox.init(materialBoxElements);
		}
	}
}

function addPokemon(pokemon) {
	fetch(pokemon.url)
	.then(respon => {
		return respon.json();
	}).then(respon => {
		daftarPokemon.push(respon);
	});
}

fetch(baseUrl + "pokemon?limit=" + totalPokemon)
.then(respon => {
	return respon.json();
}).then(respon => {
	respon.results.forEach((item)=> {
		addPokemon(item);
	});
});