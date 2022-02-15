function getInitialRecipes() {

    return [
    {
        name: "Paracetamol",
        desc: "lorem",
        quantity: 2
    },
    {
        name: "Panadol",
        desc: "lorem r323g342",
        quantity: 1
    },
];
}

function saveRecipes(recipes) {
    localStorage.setItem("recipes_dat", JSON.stringify(recipes))
}

function getSavedRecipes() {
    let recipes = localStorage.getItem("recipes_dat")

    if (recipes != null) {
        console.log(recipes)
        recipes = JSON.parse(recipes)
    }

    return recipes;
}

function getRecipes() {
    let recipes = getSavedRecipes()
    if (recipes == null) {
        recipes = getInitialRecipes()
        saveRecipes(recipes)
    }

    console.log(recipes)
    return recipes

}