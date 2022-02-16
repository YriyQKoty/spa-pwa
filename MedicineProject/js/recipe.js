$('document').ready(function() {
   var rowText;
   var content = $('#recipes');
   const recipes = getRecipes()

   for (let row of recipes) {
      rowText = `<tr>
        <td>${row.name}</td>
        <td class = "has-text-right">
            <a class ="button is-link p-1" href="pages/recipe.html?name=${row.name}">
                <i class ="material-icons">edit</i>
            </a>
            <button type="button" class ="button is-danger rem-row p-1" rowid="${row.name}">
                <i class="material-icons">delete</i>
            </button>
        </td>
        </tr>
        `;
        content.append(rowText);
   }

   $('.rem-row').click(function() {
    let name = $(this).attr('rowid');
    console.log(name)
    saveRecipes(recipes.filter((r) => r.name != name));
    location.reload();

    })
})



$('document').ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let name = ""

    if(searchParams.has('name')){
        name = searchParams.get('name')
        const recipes = getRecipes()
        let recipe = recipes.find((r) => r.name == name);
        $('#name').val(recipe.name)
        $('#quantity').val(recipe.quantity)
        $('#desc').val(recipe.desc)
    }


$('#save').click(function() {
    const recipes = getRecipes()
    if(name === "") {
        recipes.push({
            name: $('#name').val(),
            quantity: $('#quantity').val(),
            desc: $('#desc').val()
        })
    }
    else {
        let recipe = recipes.find((r) => r.name === name);
        recipe.name = $('#name').val()
        recipe.quantity = $('#quantity').val()
        recipe.desc = $('#desc').val()
    }

    saveRecipes(recipes)
    $(location).attr('href', '../index.html')
});

});