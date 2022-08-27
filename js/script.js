const pNome = document.getElementById('produto');
const qValor = document.getElementById('quantidade');
const vValor = document.getElementById('valor');
const bttSalvar = document.getElementById('salvarItens');
const bttCancelar = document.getElementById('cancelar');
const tbody = document.querySelector('tbody');

let itens
let id

function sOver(obj) {
    obj.style.backgroundColor = "green";
}

function sOut(obj) {
    obj.style.backgroundColor = "#1c5de7";
}

function cOver(obj) {
    obj.style.backgroundColor = "#D94A38";
}

function cOut(obj) {
    obj.style.backgroundColor = "#1c5de7";
}

function dOver(obj) {
    obj.style.color = "#D94A38";
}

function dOut(obj) {
    obj.style.color = "black";
}

function eOver(obj) {
    obj.style.color = "#1c5de7";
}

function eOut(obj) {
    obj.style.color = "black";
}

function editingItem(edit = false, index) {
    if (edit) {
        pNome.value = itens[index].produto;
        qValor.value = itens[index].quantidade;
        vValor.value = itens[index].valor;
        id = index
    }
    else {
        pNome.value = '';
        qValor.value = '';
        vValor.value = '';
    }
    bttSalvar.innerText = 'atualizar';
}

function editItem(index) {
    editingItem(true, index);
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensDB()
    loadItem()
}

function insertItem(item, index) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${index}</td>
    <td>${item.produto.toUpperCase()}</td>
    <td>${item.quantidade}</td>
    <td>R$${item.valor}</td>
    <td>R$${item.valor * item.quantidade}</td>

    <td><button class="bttjs" onmouseover="eOver(this)" onmouseout="eOut(this)"
    onclick="editItem(${index})"><i class='bx bx-edit' ></i></button></td>

    <td><button class="bttjs" onmouseover="dOver(this)" onmouseout="dOut(this)"
    onclick="deleteItem(${index})"><i class='bx bx-trash'></button></td>
    `;
    tbody.appendChild(tr);
}

bttSalvar.onclick = () => {
    if (pNome.value == '' || qValor.value == '' || vValor.value == '') {
        return
    }

    if(id !== undefined) {
        itens[id].produto = pNome.value;
        itens[id].quantidade = qValor.value;
        itens[id].valor = vValor.value;
    }
    else {
        itens.push({
            'produto': pNome.value,
            'quantidade': qValor.value,
            'valor': vValor.value
        });
    }

    setItensDB()
    loadItem()

    id = undefined;
    bttSalvar.innerText = 'salvar';
}

bttCancelar.onclick = () => {
    pNome.value = '';
    qValor.value = '';
    vValor.value = '';    
}

function loadItem() {
    itens = getItensDB();

    pNome.value = '';
    qValor.value = '';
    vValor.value = '';
    tbody.innerHTML = '';

    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

const getItensDB = () => JSON.parse(localStorage.getItem('SistemaProduto')) ?? [];
const setItensDB = () => localStorage.setItem('SistemaProduto', JSON.stringify(itens));

loadItem()