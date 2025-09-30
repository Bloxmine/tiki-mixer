// Sequential selection functionality for ingredients
const ingredients = document.querySelectorAll('.ingredient');
const stepIndicator = document.getElementById('stepIndicator');
const selectedIngredientsDiv = document.getElementById('selectedIngredients');
const result = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

let currentStep = 1; // 1 = base, 2 = mixer, 3 = garnish
let selectedIngredients = [];
const selections = {
    base: null,
    mixer: null,
    garnish: null
};

const cocktails = {
    "Vodka + Orange Juice + Cherry": "You made a Screwdriver! 🍹",
    "Gin + Tonic Water + Lime": "You made a Gin and Tonic! 🍸",
    "Rum + Cola + Lime": "You made a Cuba Libre! 🥃",
    "Tequila + Orange Juice + Lime": "You made a Tequila Sunrise! 🌅",
    "Whiskey + Cola + Lemon": "You made a Whiskey Cola! 🥃",
    "Vodka + Cranberry Juice + Lime": "You made a Cape Codder! 🍸",
    "Gin + Soda Water + Mint": "You made a Gin Fizz! 🍸",
    "Rum + Orange Juice + Cherry": "You made a Mai Tai! 🍹",
    "Tequila + Soda Water + Lime": "You made a Paloma! 🍹",
    "Whiskey + Tonic Water + Lemon": "You made a Whiskey Tonic! 🥃",
    "Vodka + Cola + Lemon": "You made a Vodka Cola! 🍹",
    "Gin + Cranberry Juice + Lime": "You made a Cranberry Gin! 🍸",
    "Rum + Tonic Water + Lime": "You made a Rum Tonic! 🍹",
    "Tequila + Cranberry Juice + Lime": "You made a Tequila Cranberry! 🍹",
    "Whiskey + Orange Juice + Cherry": "You made a Whiskey Sour! 🥃",
    "Vodka + Vermouth + Olive": "You made a Dirty Martini! 🍸",
    "Gin + Vermouth + Olive": "You made a Classic Martini! 🍸",
    "Rum + Ginger Ale + Lime": "You made a Dark 'n' Stormy! 🍹",
    "Tequila + Ginger Ale + Lime": "You made a Mexican Mule! 🍹",
    "Whiskey + Ginger Ale + Lemon": "You made a Whiskey Ginger! 🥃",
    "Vodka + Gin + Rum + Tequila + Whiskey + Tonic Water + Cola + Orange Juice + Cranberry Juice + Soda Water + Lemon + Lime + Mint + Cherry + Olive": "Ewwwww... what the hell? 🍹"
};

ingredients.forEach(ingredient => {
    ingredient.addEventListener('click', handleIngredientClick);
});

// reset button
resetButton.addEventListener('click', resetSelection);

// Get shaker element
const cocktailShaker = document.getElementById('cocktailShaker');
cocktailShaker.addEventListener('click', shakeCocktail);

function handleIngredientClick(e) {
    const ingredient = e.target;
    const ingredientId = ingredient.id;
    
    // check if ingredient is disabled
    if (ingredient.classList.contains('disabled')) {
        return;
    }

    // determine which section this ingredient belongs to
    let section = '';
    if (document.querySelector('#bases').contains(ingredient)) {
        section = 'base';
    } else if (document.querySelector('#mixers').contains(ingredient)) {
        section = 'mixer';
    } else if (document.querySelector('#garnishes').contains(ingredient)) {
        section = 'garnish';
    }

    if (ingredient.classList.contains('selected')) {
        ingredient.classList.remove('selected');
        selections[section] = null;

        moveBackToStep(section);
        updateDisplay();
        return;
    }

    // only allow selection if it's the current step!!
    if ((currentStep === 1 && section !== 'base') ||
        (currentStep === 2 && section !== 'mixer') ||
        (currentStep === 3 && section !== 'garnish')) {
        return;
    }

    // clear previous selection in this section
    if (selections[section]) {
        document.getElementById(selections[section]).classList.remove('selected');
    }

    // select the clicked ingredient
    ingredient.classList.add('selected');
    selections[section] = ingredientId;

    // move to next step
    moveToNextStep();
    updateDisplay();
}

function moveToNextStep() {
    if (currentStep === 1 && selections.base) {
        currentStep = 2;
        enableSection('mixers');
        stepIndicator.textContent = "Step 2: Select a Mixer";
    } else if (currentStep === 2 && selections.mixer) {
        currentStep = 3;
        enableSection('garnishes');
        stepIndicator.textContent = "Step 3: Select a Garnish";
    } else if (currentStep === 3 && selections.garnish) {
        stepIndicator.textContent = "🎉 Click the shaker to mix your cocktail!";
        showShaker();
    }
}
// lots of if else statements!!
function moveBackToStep(section) {
    // Hide shaker and stop shaking when going back
    cocktailShaker.style.display = 'none';
    cocktailShaker.classList.remove('shaking');
    const sunshineEffect = cocktailShaker.querySelector('.sunshine-effect');
    if (sunshineEffect) {
        sunshineEffect.remove();
    }
    
    if (section === 'base') {
        // if base is deselected, clear everything and go back to step 1
        selections.mixer = null;
        selections.garnish = null;
        currentStep = 1;
        
        // clear selections in later sections
        document.querySelectorAll('#mixers .ingredient.selected, #garnishes .ingredient.selected').forEach(ingredient => {
            ingredient.classList.remove('selected');
        });
        
        // disable later sections
        disableSection('mixers');
        disableSection('garnishes');
        stepIndicator.textContent = "Step 1: Select a Base Spirit";
        result.textContent = "Make your selections to create a cocktail!";
        
    } else if (section === 'mixer') {
        // if mixer is deselected, clear garnish and go back to step 2
        selections.garnish = null;
        currentStep = 2;
        
        // xlear garnish selection
        document.querySelectorAll('#garnishes .ingredient.selected').forEach(ingredient => {
            ingredient.classList.remove('selected');
        });
        
        // disable garnishes section
        disableSection('garnishes');
        stepIndicator.textContent = "Step 2: Select a Mixer";
        result.textContent = "Make your selections to create a cocktail!";
        
    } else if (section === 'garnish') {
        // if garnish is deselected, go back to step 3
        currentStep = 3;
        stepIndicator.textContent = "Step 3: Select a Garnish";
        result.textContent = "Make your selections to create a cocktail!";
    }
}

function enableSection(sectionId) {
    const sectionIngredients = document.querySelectorAll(`#${sectionId} .ingredient`);
    sectionIngredients.forEach(ingredient => {
        ingredient.classList.remove('disabled');
    });
}

function disableSection(sectionId) {
    const sectionIngredients = document.querySelectorAll(`#${sectionId} .ingredient`);
    sectionIngredients.forEach(ingredient => {
        ingredient.classList.add('disabled');
    });
}

function updateDisplay() {
    const selectedList = [];
    if (selections.base) selectedList.push(getIngredientName(selections.base));
    if (selections.mixer) selectedList.push(getIngredientName(selections.mixer));
    if (selections.garnish) selectedList.push(getIngredientName(selections.garnish));

    if (selectedList.length > 0) {
        selectedIngredientsDiv.innerHTML = `
            <p class="selection-item"><strong>Your Selections:</strong></p>
            <p class="selection-item">${selectedList.join(' + ')}</p>
        `;
    } else {
        selectedIngredientsDiv.innerHTML = '<p>Your selections will appear here</p>';
    }
}
// helper to get ingredient name from id 
function getIngredientName(id) {
    switch(id) {
        case 'vodka': return 'Vodka';
        case 'gin': return 'Gin';
        case 'rum': return 'Rum';
        case 'tequila': return 'Tequila';
        case 'whiskey': return 'Whiskey';
        case 'tonic': return 'Tonic Water';
        case 'cola': return 'Cola';
        case 'gingerAle': return 'Ginger Ale';
        case 'vermouth': return 'Vermouth';
        case 'orangeJuice': return 'Orange Juice';
        case 'cranberryJuice': return 'Cranberry Juice';
        case 'soda': return 'Soda Water';
        case 'lemon': return 'Lemon';
        case 'lime': return 'Lime';
        case 'mint': return 'Mint';
        case 'cherry': return 'Cherry';
        case 'olive': return 'Olive';
        default: return '';
    }
}
// check if the selected combination makes a known cocktail
function checkCocktail() {
    if (selections.base && selections.mixer && selections.garnish) {
        const key = [
            getIngredientName(selections.base),
            getIngredientName(selections.mixer),
            getIngredientName(selections.garnish)
        ].join(' + ');

        if (cocktails[key]) {
            result.textContent = cocktails[key];
        } else {
            result.textContent = "This combination doesn't make a known cocktail, but it might still be delicious! 🍹";
        }
    }
}

function resetSelection() {
    // clear
    selections.base = null;
    selections.mixer = null;
    selections.garnish = null;
    currentStep = 1;

    // remove selected class from all ingredients
    ingredients.forEach(ingredient => {
        ingredient.classList.remove('selected');
    });

    // disable mixers and garnishes
    document.querySelectorAll('#mixers .ingredient, #garnishes .ingredient').forEach(ingredient => {
        ingredient.classList.add('disabled');
    });

    // hide shaker and remove sunshine effect
    cocktailShaker.style.display = 'none';
    cocktailShaker.classList.remove('shaking');
    const sunshineEffect = cocktailShaker.querySelector('.sunshine-effect');
    if (sunshineEffect) {
        sunshineEffect.remove();
    }

    // reset displays
    stepIndicator.textContent = "Step 1: Select a Base Spirit";
    selectedIngredientsDiv.innerHTML = '<p>Your selections will appear here</p>';
    result.textContent = "Make your selections to create a cocktail!";
}

// show the cocktail shaker when all ingredients are selected
function showShaker() {
    cocktailShaker.style.display = 'block';
    
    // animate all selected ingredients towards the shaker
    setTimeout(() => {
        if (selections.base) {
            const baseElement = document.getElementById(selections.base);
            animateIngredientToShaker(baseElement);
        }
        
        setTimeout(() => {
            if (selections.mixer) {
                const mixerElement = document.getElementById(selections.mixer);
                animateIngredientToShaker(mixerElement);
            }
        }, 200);
        
        setTimeout(() => {
            if (selections.garnish) {
                const garnishElement = document.getElementById(selections.garnish);
                animateIngredientToShaker(garnishElement);
            }
        }, 400);
    }, 300);
}

// animate ingredient towards shaker
function animateIngredientToShaker(ingredientElement) {
    const ingredientRect = ingredientElement.getBoundingClientRect();
    const shakerRect = cocktailShaker.getBoundingClientRect();
    
    // create a clone of the ingredient for animation
    const clone = ingredientElement.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = ingredientRect.left + 'px';
    clone.style.top = ingredientRect.top + 'px';
    clone.style.zIndex = '1000';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'all 0.8s ease-in-out';
    
    document.body.appendChild(clone);
    
    // animate to shaker position
    setTimeout(() => {
        clone.style.left = (shakerRect.left + shakerRect.width / 2 - ingredientRect.width / 2) + 'px';
        clone.style.top = (shakerRect.top + shakerRect.height / 2 - ingredientRect.height / 2) + 'px';
        clone.style.transform = 'scale(0.5)';
        clone.style.opacity = '0';
    }, 50);
    
    // remove clone after animation
    setTimeout(() => {
        document.body.removeChild(clone);
    }, 900);
}

// handle shaker click to mix cocktail
function shakeCocktail() {
    cocktailShaker.classList.add('shaking');
    
    // remove shaking animation after a short delay and show result
    setTimeout(() => {
        cocktailShaker.classList.remove('shaking');
        checkCocktail();
        showSunshineEffect();
    }, 1500);
}

// show sunshine effect when cocktail is made
function showSunshineEffect() {
if (selections.base && selections.mixer && selections.garnish) {
    // remove any existing sunshine effect
    const existingSunshine = cocktailShaker.querySelector('.sunshine-effect');
    if (existingSunshine) {
        existingSunshine.remove();
    }
    
    // create and add sunshine effect
    const sunshineEffect = document.createElement('div');
    sunshineEffect.classList.add('sunshine-effect');
    cocktailShaker.appendChild(sunshineEffect);
    
    // trigger the animation with a slight delay
    setTimeout(() => {
        sunshineEffect.classList.add('show');
    }, 200);
    }
}

// initialise
resetSelection();