const baseUrl = `http://localhost:9001/api`;

function renderList(items, container, itemTemplate) {
    const listItems = items.map(itemTemplate).join("");
    container.innerHTML = listItems;
}

function setTextContent(element, text) {
    element.textContent = text;
}

async function getElement(id, elementType, secondaryElementTypes, params, doms, listDoms) {
    let element;
    try {
        element = await fetchElement(id, elementType);
        for (const secondaryElementType of secondaryElementTypes) {
            element[secondaryElementType] = await fetchSecondaryElement(element.id, elementType, secondaryElementType);
        }
    } catch (e) {
        console.error(`Error reading ${elementType} ${id} data.`, e.message);
    }
    render(element, params, doms, listDoms);
}

async function fetchElement(id, elementType) {
    const url = `${baseUrl}/${elementType}/${id}`;
    return await fetch(url).then(res => res.json());
}

async function fetchSecondaryElement(id, elementType1, elementType2) {
    const url = `${baseUrl}/${elementType1}/${id}/${elementType2}`;
    return await fetch(url).then(res => res.json());
}

function render(obj, params, doms, listDoms) {
    document.title = `Swapi - ${obj?.name || obj.title}`;
    params.forEach((param, index) => {
        setTextContent(doms[index], obj[param]);
    });

    listDoms.forEach((listDom, index) => {
        const listItems = obj[params[index]].map(item => `<li><a href="/${params[index]}.html?id=${item.id}">${item.name || item.title}</a></li>`);
        listDom.innerHTML = listItems.join("");
    });
}
