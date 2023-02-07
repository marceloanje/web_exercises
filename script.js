let array = []

function adicionar(){

    let numero = document.getElementById("txtnum").value
    let tab = document.getElementById('selist')

    if(numero < 1 || numero > 100){
        window.alert('[ERRO] Valor inválido ou já encontrado na lista')
    }
    else if(numero == 0){
        window.alert('[ERRO] Valor inválido ou já encontrado na lista')
    }
    else if(array.indexOf(numero) != -1){
        window.alert('[ERRO] Valor inválido ou já encontrado na lista')
    }
    else{
        array.push(numero)

        let item = document.createElement('option')
        item.text = `Valor ${numero} adicionado.`
        tab.appendChild(item)
    }
    document.getElementById('txtnum').value = ''
    document.getElementById("txtnum").focus()
    resp.innerHTML = ''
}

function sumArray(array){
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += Number(array[i]);
    }
    return sum;
}

function finalizar(){

    if(array.length == 0){
        window.alert('[ERRO] Adicione elementos antes de finalizar')
    }
    else{
        var max = array.reduce(function(a, b){
            return Math.max(a, b)
        }, -Infinity);

        resp.innerHTML = `Ao todo, temos ${array.length} números cadastrados`
        resp.innerHTML += `<p>`
        resp.innerHTML += `O maior valor informado foi ${max}`
        resp.innerHTML += `<p>`
        resp.innerHTML += `O menor valor informado foi ${Math.min(...array)}`
        resp.innerHTML += `<p>`
        resp.innerHTML += `Somando todos os valores, temos ${sumArray(array)}`
        resp.innerHTML += `<p>`
        resp.innerHTML += `A média dos valores digitados é ${sumArray(array)/array.length}`
    }
}