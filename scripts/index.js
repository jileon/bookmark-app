'use-strict';


$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();



  api.getItems(function(items) {
    items.forEach(function(item){      
      dataStore.addItem(item);
    });
    bookmarkList.render();
  });


});