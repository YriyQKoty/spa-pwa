let editType=''
let recipeName =''

document.addEventListener("DOMContentLoaded", function(event) {
    var rowText;
    var content = document.getElementById('list');
    const recipes = getRecipes()
 
    for (let row of recipes) {
       rowText = document.createElement('ion-item');
       rowText.innerHTML = `<ion-label>${row.name}</ion-label>
       <ion-button class="edit" color="primary" size="medium" rowid="${row.name}">
       <ion-icon name="create"></ion-icon>   
        </ion-button>
        <ion-button class="delete" color="danger" size="medium" rowid="${row.name}">
         <ion-icon name="trash"></ion-icon>   
        </ion-button> `;
        content.appendChild(rowText);
    }

    document.querySelector('#main').style.display=""
    document.querySelector('#edit').style.display="none"

    document.querySelectorAll('.edit').forEach(input => input.addEventListener('click', ({target}) => {
        editType = "edit"
        recipeName = target.getAttribute('rowid')
        let recipe = recipes.find((r) => r.name == recipeName)

        document.getElementById('name').value = recipe.name
        document.getElementById('quantity').value = recipe.quantity
        document.getElementById('desc').value = recipe.desc
        document.querySelector('#main').style.display = "none"
        document.querySelector('#edit').style.display = ""
    }));


    document.querySelectorAll('.delete').forEach(input => input.addEventListener('click', ({target}) => {
    
        recipeName = target.getAttribute('rowid')
        saveRecipes(recipes.filter((r) => r.name != recipeName))

        location.reload()
    }));

    document.querySelector('#save').addEventListener('click', () => {
        if(editType == "add") {
            recipes.push({
                name: document.getElementById('name').value,
                quantity: document.getElementById('quantity').value,
                desc: document.getElementById('desc').value
            });
        }
        else {
            let recipe = recipes.find((r) => r.name == recipeName)
            recipe.name = document.getElementById("name").value
            recipe.quantity = document.getElementById('quantity').value
            recipe.desc =  document.getElementById('desc').value
        }

        saveRecipes(recipes)
        location.reload();

    });

    document.querySelector('#add').addEventListener('click', () => {

        document.querySelector('#main').style.display="none"
        document.querySelector('#edit').style.display=""
        document.getElementById('name').value=""
        document.getElementById('quantity').value=""
        document.getElementById('desc').value=""
        editType="add"

    });

});














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