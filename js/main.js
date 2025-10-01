// Sequential selection functionality for ingredients
const ingredients = document.querySelectorAll('.ingredient');
const stepIndicator = document.getElementById('stepIndicator');
const selectedIngredientsDiv = document.getElementById('selectedIngredients');
const result = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

const music = new Audio('music/johnsonrag.mp3');
music.loop = true;
music.volume = 0.5; // Set a comfortable volume level

let currentStep = 1; // 1 = base, 2 = mixer, 3 = garnish
let musicPlaying = false;
let selectedIngredients = [];
const selections = {
    base: null,
    mixer: null,
    garnish: null
};

const cocktails = {
    "Vodka + Tonic Water + Soda Water": "You made a The Clarity! ✨",
    "Vodka + Tonic Water + Lemon": "You made a Vodka Tonic with Lemon! 🍋",
    "Vodka + Tonic Water + Lime": "You made a Vodka Tonic! 🧊",
    "Vodka + Tonic Water + Mint": "You made a Verdant Sparkler! 🍸",
    "Vodka + Tonic Water + Cherry": "You made a Crimson Fizz! 🍒",
    "Vodka + Tonic Water + Olive": "You made a The Martini Wannabe! 🍸",
    "Vodka + Cola + Soda Water": "You made a Cola Cloud! 🍸",
    "Vodka + Cola + Lemon": "You made a Sparkling Lemon Spirit! 🍸",
    "Vodka + Cola + Lime": "You made a Vodka Libre! 🍹",
    "Vodka + Cola + Mint": "You made a Minty Cola Rush! 🍃",
    "Vodka + Cola + Cherry": "You made a Cherry Cola Crush! 🍒",
    "Vodka + Cola + Olive": "You made a The Olive's Lament! 🤔",
    "Vodka + Ginger Ale + Soda Water": "You made a Crystal Ginger Spritz! 🥂",
    "Vodka + Ginger Ale + Lemon": "You made a Zesty Ginger Fizz! 🍋",
    "Vodka + Ginger Ale + Lime": "You made a Moscow Mule! 🍹",
    "Vodka + Ginger Ale + Mint": "You made a Emerald Fizz! 🌿",
    "Vodka + Ginger Ale + Cherry": "You made a Crimson Sparkler! 🍸",
    "Vodka + Ginger Ale + Olive": "You made a The Dirty Mule! 🫒",
    "Vodka + Vermouth + Soda Water": "You made a Vermouth Spritzer! 🥂",
    "Vodka + Vermouth + Lemon": "You made a Vodka Martini (Lemon Twist)! 🍸",
    "Vodka + Vermouth + Lime": "You made a The Verdant Sip! 🍸",
    "Vodka + Vermouth + Mint": "You made a The Emerald Whisper! 🍸",
    "Vodka + Vermouth + Cherry": "You made a The Ruby Reverie! 🍸",
    "Vodka + Vermouth + Olive": "You made a Vodka Martini! 🍸",
    "Vodka + Orange Juice + Soda Water": "You made a Sun-Kissed Fizz! 🍹",
    "Vodka + Orange Juice + Lemon": "You made a Sunrise Zest! 🍊",
    "Vodka + Orange Juice + Lime": "You made a Sunrise Zinger! ☀️",
    "Vodka + Orange Juice + Mint": "You made a Emerald Dawn! 🍹🍃",
    "Vodka + Orange Juice + Cherry": "You made a Cherry Sunrise! 🌅",
    "Vodka + Orange Juice + Olive": "You made a The Salty Sunrise! 🫒",
    "Vodka + Cranberry Juice + Soda Water": "You made a Sparkling Cape Codder! 🍒",
    "Vodka + Cranberry Juice + Lemon": "You made a Cape Codder! 🍹",
    "Vodka + Cranberry Juice + Lime": "You made a Cape Codder! 🍹",
    "Vodka + Cranberry Juice + Mint": "You made a Ruby Refresher! 🍹",
    "Vodka + Cranberry Juice + Cherry": "You made a Crimson Cherry Kiss! 🍒",
    "Vodka + Cranberry Juice + Olive": "You made a The Crimson Brine! 🥴",
    "Gin + Tonic Water + Soda Water": "You made a Gin Sonic! ✨",
    "Gin + Tonic Water + Lemon": "You made a Gin & Tonic (with Lemon)! 🍋",
    "Gin + Tonic Water + Lime": "You made a Gin & Tonic! 🍋",
    "Gin + Tonic Water + Mint": "You made a Botanical Breeze! 🌿",
    "Gin + Tonic Water + Cherry": "You made a Ruby Tonic! 🍸",
    "Gin + Tonic Water + Olive": "You made a The Dirty Tonic! 🍸",
    "Gin + Cola + Soda Water": "You made a The Gin-Cola Conundrum! 🍹",
    "Gin + Cola + Lemon": "You made a The G&C Squeeze! 🍸",
    "Gin + Cola + Lime": "You made a Gin & Cola Libre! 🍹",
    "Gin + Cola + Mint": "You made a Verdant Gin Fizz! 🍹",
    "Gin + Cola + Cherry": "You made a Ruby Gin Sparkler! 🍸",
    "Gin + Cola + Olive": "You made a The Olive's Last Stand! 🍸",
    "Gin + Ginger Ale + Soda Water": "You made a Gin Ginger Sparkler! 🫧",
    "Gin + Ginger Ale + Lemon": "You made a Gin Ginger Snap! 🍸",
    "Gin + Ginger Ale + Lime": "You made a Gin Buck! 🍸",
    "Gin + Ginger Ale + Mint": "You made a Emerald Fizz! 🍸",
    "Gin + Ginger Ale + Cherry": "You made a Ruby Fizz! 🍒",
    "Gin + Ginger Ale + Olive": "You made a The Salty Fizz Fiasco! 🤨",
    "Gin + Vermouth + Soda Water": "You made a The Botanical Spritz! 🥂",
    "Gin + Vermouth + Lemon": "You made a The Zesty Botanist! 🌿",
    "Gin + Vermouth + Lime": "You made a The Verdant Bloom! 🍸",
    "Gin + Vermouth + Mint": "You made a Verdant Martini! 🍸",
    "Gin + Vermouth + Cherry": "You made a Martinez! 🍸",
    "Gin + Vermouth + Olive": "You made a Dry Martini! 🍸",
    "Gin + Orange Juice + Soda Water": "You made a Orange Blossom Fizz! 🍊",
    "Gin + Orange Juice + Lemon": "You made a Golden Gin Glow! ☀️",
    "Gin + Orange Juice + Lime": "You made a Citrus Gin Bloom! 🍸",
    "Gin + Orange Juice + Mint": "You made a Sun-Kissed Gin Garden! ☀️",
    "Gin + Orange Juice + Cherry": "You made a Cherry Blossom Gin! 🌸",
    "Gin + Orange Juice + Olive": "You made a The Garnish of Confusion! 🤨",
    "Gin + Cranberry Juice + Soda Water": "You made a Crimson Sparkler! ✨",
    "Gin + Cranberry Juice + Lemon": "You made a Crimson Zest! 🍸",
    "Gin + Cranberry Juice + Lime": "You made a Crimson Gin Refresher! 🍸",
    "Gin + Cranberry Juice + Mint": "You made a Crimson Bloom! 🌸",
    "Gin + Cranberry Juice + Cherry": "You made a Crimson Gin Delight! 🍸",
    "Gin + Cranberry Juice + Olive": "You made a Gin's Cranberry Conundrum! 🍸",
    "Rum + Tonic Water + Soda Water": "You made a Tropical Tonic Spritz! 🍹",
    "Rum + Tonic Water + Lemon": "You made a Island Breeze Tonic! 🏝️",
    "Rum + Tonic Water + Lime": "You made a Island G&T (Rum & Tonic)! 🏝️",
    "Rum + Tonic Water + Mint": "You made a The Tropic Tonic Tingle! 🌿",
    "Rum + Tonic Water + Cherry": "You made a Crimson Current! 🍹",
    "Rum + Tonic Water + Olive": "You made a The Briny Blunder! 🤢",
    "Rum + Cola + Soda Water": "You made a Tropical Sparkler! 🍹",
    "Rum + Cola + Lemon": "You made a Cuba Libre! 🇨🇺",
    "Rum + Cola + Lime": "You made a Cuba Libre! 🇨🇺",
    "Rum + Cola + Mint": "You made a Havana Mint Cooler! 🍸",
    "Rum + Cola + Cherry": "You made a Havana Cherry! 🍒",
    "Rum + Cola + Olive": "You made a Oliva Libre! 🫒",
    "Rum + Ginger Ale + Soda Water": "You made a Ginger Rum Sparkler! 🍹",
    "Rum + Ginger Ale + Lemon": "You made a Golden Ginger Zest! 🍹",
    "Rum + Ginger Ale + Lime": "You made a Ginger Lime Rum Breeze! 🍹",
    "Rum + Ginger Ale + Mint": "You made a The Minted Mariner! ⚓️",
    "Rum + Ginger Ale + Cherry": "You made a The Cherry Rumbler! 🍒",
    "Rum + Ginger Ale + Olive": "You made a Pirate's Paradox! 🫒",
    "Rum + Vermouth + Soda Water": "You made a Island Aperitivo! 🍹",
    "Rum + Vermouth + Lemon": "You made a The Vermouth Voyager! 🍹",
    "Rum + Vermouth + Lime": "You made a The Compass Rose! 🍸",
    "Rum + Vermouth + Mint": "You made a The Botanical Breeze! 🍃",
    "Rum + Vermouth + Cherry": "You made a Scarlet Sailor! 🍒",
    "Rum + Vermouth + Olive": "You made a The Brine & Barrel! 🍸",
    "Rum + Orange Juice + Soda Water": "You made a Sun-Kissed Rum Spritzer! 🍹",
    "Rum + Orange Juice + Lemon": "You made a Island Glow! 🍹",
    "Rum + Orange Juice + Lime": "You made a Golden Horizon! 🍹",
    "Rum + Orange Juice + Mint": "You made a Minted Sunrise! 🍹",
    "Rum + Orange Juice + Cherry": "You made a Crimson Sunset! 🌅",
    "Rum + Orange Juice + Olive": "You made a The Salty Seadog's Surprise! 🍸",
    "Rum + Cranberry Juice + Soda Water": "You made a Crimson Rum Spritzer! 🥂",
    "Rum + Cranberry Juice + Lemon": "You made a Crimson Refresher! 🍹",
    "Rum + Cranberry Juice + Lime": "You made a The Cranberry Clipper! 🍹",
    "Rum + Cranberry Juice + Mint": "You made a Ruby Rum Refresher! 🍹",
    "Rum + Cranberry Juice + Cherry": "You made a Crimson Cherry Kiss! 🍹",
    "Rum + Cranberry Juice + Olive": "You made a The Garnish Gone Rogue! 🍸",
    "Tequila + Tonic Water + Soda Water": "You made a Agave Sparkler! 🥂",
    "Tequila + Tonic Water + Lemon": "You made a Jalisco Lemon Fizz! 🥂",
    "Tequila + Tonic Water + Lime": "You made a Tequila & Tonic! 🍋",
    "Tequila + Tonic Water + Mint": "You made a Emerald Tonic! 🍸",
    "Tequila + Tonic Water + Cherry": "You made a Crimson Cactus Cooler! 🍹",
    "Tequila + Tonic Water + Olive": "You made a The Olive Branch Compromise! 🍸",
    "Tequila + Cola + Soda Water": "You made a Agave Fizz! 🍹",
    "Tequila + Cola + Lemon": "You made a Tequila Libre! 🍹",
    "Tequila + Cola + Lime": "You made a Batanga! 🍹",
    "Tequila + Cola + Mint": "You made a Emerald Sombrero! 🍹",
    "Tequila + Cola + Cherry": "You made a Crimson Cola Kiss! 🍒",
    "Tequila + Cola + Olive": "You made a The Brine Time Bomb! 💣",
    "Tequila + Ginger Ale + Soda Water": "You made a Agave Ginger Fizz! 🍹",
    "Tequila + Ginger Ale + Lemon": "You made a Jalisco Fizz! 🍸",
    "Tequila + Ginger Ale + Lime": "You made a Agave Ginger Fizz! 🍹",
    "Tequila + Ginger Ale + Mint": "You made a Agave Mint Sparkler! 🌿",
    "Tequila + Ginger Ale + Cherry": "You made a Crimson Agave Fizz! 🍸",
    "Tequila + Ginger Ale + Olive": "You made a The Salty Sombrero! 🍸",
    "Tequila + Vermouth + Soda Water": "You made a Desert Bloom Spritz! 🍹",
    "Tequila + Vermouth + Lemon": "You made a The Desert Bloom! 🌸",
    "Tequila + Vermouth + Lime": "You made a The Desert Botanist! 🍸",
    "Tequila + Vermouth + Mint": "You made a El Jardinero! 🌿",
    "Tequila + Vermouth + Cherry": "You made a The Scarlet Serenade! 🍒",
    "Tequila + Vermouth + Olive": "You made a The Dirty Desperado! 🍸",
    "Tequila + Orange Juice + Soda Water": "You made a Orange Agave Fizz! 🍹",
    "Tequila + Orange Juice + Lemon": "You made a Tequila Sunburst! ☀️",
    "Tequila + Orange Juice + Lime": "You made a Agave Sunset! 🌅",
    "Tequila + Orange Juice + Mint": "You made a Sunrise Mint Splash! 🍹",
    "Tequila + Orange Juice + Cherry": "You made a Cherry Sunset! 🌅",
    "Tequila + Orange Juice + Olive": "You made a Agave's Apology! 🍸",
    "Tequila + Cranberry Juice + Soda Water": "You made a Crimson Sparkler! 🍒",
    "Tequila + Cranberry Juice + Lemon": "You made a Aztec Sunset! 🌅",
    "Tequila + Cranberry Juice + Lime": "You made a Cranberry Tequila! 🍹",
    "Tequila + Cranberry Juice + Mint": "You made a Crimson Mint Agave Splash! 🍸",
    "Tequila + Cranberry Juice + Cherry": "You made a Crimson Kiss! 🍒",
    "Tequila + Cranberry Juice + Olive": "You made a The Agave Olive Twist! 🥴",
    "Whiskey + Tonic Water + Soda Water": "You made a The Whiskey Spritz! 🥃",
    "Whiskey + Tonic Water + Lemon": "You made a Amber Zest! 🍸",
    "Whiskey + Tonic Water + Lime": "You made a The Zesty Whisk! 🍹",
    "Whiskey + Tonic Water + Mint": "You made a Verdant Highball! 🌿",
    "Whiskey + Tonic Water + Cherry": "You made a Cherrywood Sparkler! 🍸",
    "Whiskey + Tonic Water + Olive": "You made a The Briny Buzzkill! 🍸",
    "Whiskey + Cola + Soda Water": "You made a Whiskey Whisper Fizz! 🫧",
    "Whiskey + Cola + Lemon": "You made a Whiskey & Cola with a Zest! 🥃",
    "Whiskey + Cola + Lime": "You made a Whiskey Cola Refresher! 🥃",
    "Whiskey + Cola + Mint": "You made a Emerald Cola Smash! 🍹",
    "Whiskey + Cola + Cherry": "You made a Cherry Cola Whiskey! 🍒",
    "Whiskey + Cola + Olive": "You made a The Regret! 🤢",
    "Whiskey + Ginger Ale + Soda Water": "You made a Presbyterian! 🥃",
    "Whiskey + Ginger Ale + Lemon": "You made a Whiskey Ginger Highball! 🥃",
    "Whiskey + Ginger Ale + Lime": "You made a Whiskey Ginger! 🥃",
    "Whiskey + Ginger Ale + Mint": "You made a Minted Whiskey Ginger! 🌿",
    "Whiskey + Ginger Ale + Cherry": "You made a Cherry Whiskey Fizz! 🍒",
    "Whiskey + Ginger Ale + Olive": "You made a The Olive Branch Compromise! 🍸",
    "Whiskey + Vermouth + Soda Water": "You made a The Golden Hour Spritz! 🥂",
    "Whiskey + Vermouth + Lemon": "You made a The Amber Zest! 🍸",
    "Whiskey + Vermouth + Lime": "You made a The Botanical Brightener! 🍸",
    "Whiskey + Vermouth + Mint": "You made a Emerald Elixir! 🍸",
    "Whiskey + Vermouth + Cherry": "You made a Manhattan! 🥃",
    "Whiskey + Vermouth + Olive": "You made a Dirty Manhattan! 🍸",
    "Whiskey + Orange Juice + Soda Water": "You made a Golden Hour Fizz! 🍊✨",
    "Whiskey + Orange Juice + Lemon": "You made a Golden Hour Grog! 🍹",
    "Whiskey + Orange Juice + Lime": "You made a Sunset Whiskey Twist! 🥃",
    "Whiskey + Orange Juice + Mint": "You made a Orange Whiskey Smash! 🥃",
    "Whiskey + Orange Juice + Cherry": "You made a Orchard Ember! 🥃",
    "Whiskey + Orange Juice + Olive": "You made a Whiskey Tango Foxtrot! 🍸",
    "Whiskey + Cranberry Juice + Soda Water": "You made a Crimson Fizz! 🍸",
    "Whiskey + Cranberry Juice + Lemon": "You made a Ruby Ember Sour! 🥃",
    "Whiskey + Cranberry Juice + Lime": "You made a Ruby Rogue! 🍸",
    "Whiskey + Cranberry Juice + Mint": "You made a Crimson Mint Smash! 🍹",
    "Whiskey + Cranberry Juice + Cherry": "You made a Ruby Rebel! 🍸",
    "Whiskey + Cranberry Juice + Olive": "You made a The Regret! 🍸"
};

ingredients.forEach(ingredient => {
    ingredient.addEventListener('click', handleIngredientClick);
});

// reset button
resetButton.addEventListener('click', resetSelection);

// music toggle button
const musicToggle = document.getElementById('musicToggle');
musicToggle.addEventListener('click', toggleMusic);

// attempt to start music automatically (will require user interaction due to browser policies)
attemptAutoplay();

// Get shaker element
const cocktailShaker = document.getElementById('cocktailShaker');
cocktailShaker.addEventListener('click', shakeCocktail);

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    
    if (music.paused) {
        music.play().then(() => {
            musicPlaying = true;
            musicToggle.textContent = '🔊';
            musicToggle.title = 'Music On - Click to turn off';
        }).catch(error => {
            console.log('Music play failed:', error);
            musicToggle.textContent = '🔇';
            musicToggle.title = 'Click to play music';
        });
    } else {
        music.pause();
        musicPlaying = false;
        musicToggle.textContent = '🎵';
        musicToggle.title = 'Music Off - Click to turn on';
    }
}

function attemptAutoplay() {
    // Try to play music automatically
    // This will likely fail due to browser autoplay policies, but we'll try
    music.play().then(() => {
        musicPlaying = true;
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.textContent = '🔊';
        musicToggle.title = 'Music On - Click to turn off';
    }).catch(error => {
        // Autoplay failed (expected), show music control for user to click
        console.log('Autoplay prevented. User interaction required.');
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.textContent = '🎵';
        musicToggle.title = 'Click to play music';
        
        // Add a subtle pulse animation to draw attention to the music button
        musicToggle.style.animation = 'pulse 2s infinite';
    });
}

function handleIngredientClick(e) {
    const ingredient = e.target;
    const ingredientId = ingredient.id;
    
    // Start music on first user interaction if not already playing
    if (!musicPlaying && music.paused) {
        music.play().then(() => {
            musicPlaying = true;
            const musicToggle = document.getElementById('musicToggle');
            musicToggle.textContent = '🔊';
            musicToggle.title = 'Music On - Click to turn off';
            musicToggle.style.animation = 'none'; // Remove pulse animation
        }).catch(error => {
            console.log('Music play failed on user interaction:', error);
        });
    }
    
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
        // Bases
        case 'vodka': return 'Vodka';
        case 'gin': return 'Gin';
        case 'rum': return 'Rum';
        case 'tequila': return 'Tequila';
        case 'whiskey': return 'Whiskey';
        // Mixers
        case 'tonic': return 'Tonic Water';
        case 'cola': return 'Cola';
        case 'gingerAle': return 'Ginger Ale';
        case 'vermouth': return 'Vermouth';
        case 'orangeJuice': return 'Orange Juice';
        case 'cranberryJuice': return 'Cranberry Juice';
        // Garnishes
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