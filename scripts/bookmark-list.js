'use-strict';

const bookmarkList = (function(){

  function generateExpandedElements (item){
    let itemTitle = `<span class="item-title">${item.title}</span>`;
    return `
        <li class="js-item-element" data-item-id="${item.id}">
          ${itemTitle}
          <div class="bookmark-item-controls">

            <button class="js-item-delete">
              <span class="button-label">Delete</span>
            </button>

            <button class="bookmark-delete js-visitSite">
              <span class="button-label">Visit Site</span>
            </button>
          </div>
        </li>`;
  }
    
    
  //===========================================================================
  function generateBookmarksItemsString(bookmarks) {
    
    const items = bookmarks.map((item) => generateExpandedElements(item));
    return items.join('');
  }
    
    
  //============================================================================
  function render() {
    console.log('`render` ran');
  
    let items = dataStore.bookmarks;


    // render the shopping list in the DOM
    const bookmarkListString = generateBookmarksItemsString(items);
      
    // insert that HTML into the DOM
    $('.bookmark-lists').html(bookmarkListString);
  }
    
  //============================================================================
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  //============================================================================

  function deleteBookmark (){
    $('.bookmark-lists').on('click', '.js-item-delete', function(event){
      const id = getItemIdFromElement(event.currentTarget);
      console.log('delete ran');

      api.deleteItem(id, function(){
        dataStore.removeItem(id);
        render();
      });
    });
  }

  //============================================================================


  console.log($('#js-bookmark-list-form').find("#rating-4").val());
  
  function handleAddSubmit(){
   
    $('#js-bookmark-list-form').submit(function(event){
      event.preventDefault();
      console.log('submit ran');
      let itemTitle =  $('.js-bookmark-title-entry').val();
      let itemURL = $('.js-bookmark-url-entry').val();
      console.log(itemTitle);
      console.log(itemURL);
      api.createItem(itemTitle, itemURL, 'testing', 5, function(response){
        dataStore.addItem(response);
        console.log(response);
        render();
      });

    });
  }
    
    
    
    
    
    
    
    
    
    
  function bindEventListeners() {
    deleteBookmark();
    handleAddSubmit();
  }
    
    
  return {
    bindEventListeners,
    render: render
  };
    
}());