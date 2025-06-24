export const baseUrl = `http://localhost:9001/api`;

export function renderList(items, container, itemTemplate) {
    const listItems = items.map(itemTemplate).join("");
    container.innerHTML = listItems;
}

export function setTextContent(element, text) {
    element.textContent = text;
}

export async function getElement(id, elementType, secondaryElementTypes, params, doms, listDoms) {
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

export async function fetchElement(id, elementType) {
    const url = `${baseUrl}/${elementType}/${id}`;
    return await fetch(url).then(res => res.json());
}

export async function fetchSecondaryElement(id, elementType1, elementType2) {
    const url = `${baseUrl}/${elementType1}/${id}/${elementType2}`;
    return await fetch(url).then(res => res.json());
}

export function render(obj, params, doms, listDoms) {
    document.title = `Swapi - ${obj?.name || obj.title}`;

    // Iterate over params and doms, setting text content only if the property exists
    for (let index = 0; index < params.length; index++) {
        const param = params[index];
        if (obj[param] !== undefined && doms[index] !== undefined) {
            setTextContent(doms[index], obj[param]);
        }
    }

    // Iterate over listDoms, populating lists only if the property exists
    for (let index = 0; index < listDoms.length; index++) {
        const listDom = listDoms[index];
        const param = params[index + doms.length]; // Adjust index to match listDoms
        if (obj[param] !== undefined && Array.isArray(obj[param])) {
            const listItems = obj[param].map(item => `<li><a href="/${param.slice(0,-1)}.html?id=${item.id}">${item.name || item.title}</a></li>`);
            listDom.innerHTML = listItems.join("");
        } else {
            listDom.innerHTML = ""; // Optionally clear the list if no items are available
        }
    }
}

