document.querySelector('select[name=uf]').addEventListener('change', getCities)

function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json())
        .then(states => {
            for(let state of states)
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then(response => response.json())
        .then(cities => {
            for(let city of cities)
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            
            citySelect.disabled = false
        })
}