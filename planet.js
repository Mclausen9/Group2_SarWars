import { baseUrl, renderList, setTextContent, getElement, fetchElement, fetchSecondaryElement, render } from './common.js';

let nameH1;
let populationSpan;
let climateSpan;
let terrainSpan;
let charactersUl;
let filmsUl;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    populationSpan = document.querySelector('span#population');
    climateSpan = document.querySelector('span#climate');
    terrainSpan = document.querySelector('span#terrain');
    charactersUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');

    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');

    const doms = [nameH1, populationSpan, climateSpan, terrainSpan];
    const listDoms = [charactersUl, filmsUl];
    const params = ['name', 'population', 'climate', 'terrain', 'characters', 'films'];
    const elementType = 'planets';
    const secondaryElementTypes = ['characters', 'films'];

    getElement(id, elementType, secondaryElementTypes, params, doms, listDoms);
});
