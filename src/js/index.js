import sliderTop from './parts/slidertop';
import modals from './parts/modal';
import mask from './parts/mask';
import forms from './parts/forms';
import calc from './parts/calc';
import filterBlock from './parts/filter';
import hoverPicture from './parts/hoverimg';
import sliderBottom from './parts/sliderbottom';
import acrdn from './parts/accordion';
import burgerMenu from './parts/burgermenu';
import openMoreStyles from './parts/morestyles';

window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    sliderTop();
    modals();
    mask();
    forms();
    calc();
    filterBlock();
    hoverPicture();
    sliderBottom();
    acrdn();
    burgerMenu();
    openMoreStyles();

});