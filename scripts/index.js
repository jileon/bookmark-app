'use-strict';


$(document).ready(function() {
  // shoppingList.bindEventListeners();
  // shoppingList.render();
  
  api.getItems(function(items) {
    items.forEach(function(item){      
      dataStore.addItem(item);
    });
    //bookmarkList.render();
  });



});
  
  