'use-strict';

const bookmarkList = (function(){

  function generateCondensedElements (item){
    let itemTitle = `<span class="item-title">${item.title}</span>`;
    return `<div class= "bookmark-item-condensed">
        <li class="js-item-element" data-item-id="${item.id}">
          ${itemTitle}
            <div class= "bookmark-item-rating">
            <h4>${item.rating}</h4>
            </div>
          <div class="bookmark-item-controls">
            <button class="js-item-delete">
              <span class="button-label">Delete</span>
            </button?
            <a href=${item.url} target="_blank"><button class="bookmark-delete js-visitSite">
              <span class="button-label">Visit Site</span>
            </button></a>
          </div>
        </li>
        </div>`;
  }

  //===========================================================================
  function generateExpandedElements (item){
    let itemTitle = `<span class="item-title">${item.title}</span>`;
    return `<div class= "bookmark-item">
        <li class="js-item-element" data-item-id="${item.id}">
          ${itemTitle}
            <div class= "bookmark-item-description">
            <h4>DESCRIPTION</h4>
            <p>${item.desc}</p>
            </div>
            <h4>${item.rating} Stars</h4>
          <div class="bookmark-item-controls">

            <button class="js-item-delete">
              <span class="button-label">Delete</span>
            </button>

            <a href=${item.url} target="_blank"><button class="bookmark-delete js-visitSite">
              <span class="button-label">Visit Site</span>
            </button></a>
          </div>
        </li>
        </div>`;
  }
  
    
  //===========================================================================
  function generateBookmarksItemsString(bookmarks) {
    
    const items = bookmarks.map((item) => generateExpandedElements(item));
    return items.join('');
  }
    
    
  //============================================================================
  function generateCondensedItemsString(bookmarks) {
    
    const items = bookmarks.map((item) => generateCondensedElements(item));
    return items.join('');
  }
    
    
  //============================================================================


  function render() {
    console.log('`render` ran');
  
    let items = dataStore.bookmarks;


    // render the shopping list in the DOM
    const bookmarkListString = generateBookmarksItemsString(items);
    const bookmarkCondensedString = generateCondensedItemsString(items);
    // insert that HTML into the DOM
    $('.bookmark-lists').html(bookmarkListString);
    //$('.bookmark-lists').html(bookmarkCondensedString);
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
  function handleRadio(){
    $(".radio-buttons").on('click', function(event){
      console.log("radio ran");
      const currentButton = $("input:checked").val()
      //console.log(currentButton);
    });
  }


  //============================================================================
  //console.log($('#js-bookmark-list-form').find("#rating-4").val());
  
  function handleAddSubmit(){
   
    $('#js-bookmark-list-form').submit(function(event){
      event.preventDefault();
      console.log('submit ran');
      let itemTitle =  $('.js-bookmark-title-entry').val();
      $('.js-bookmark-title-entry').val(" ");
      let itemURL = $('.js-bookmark-url-entry').val();
      $('.js-bookmark-url-entry').val(" ");
      let itemDesc = $(".descriptionInput").val();
      $(".descriptionInput").val(" ");
      let itemRating = $(".radio-buttons").find("input:checked").val();
      console.log(itemTitle);
      console.log(itemURL);
      console.log(itemRating);
      api.createItem(itemTitle, itemURL, itemDesc, itemRating, function(response){
        dataStore.addItem(response);
        console.log(response);

        render();
      });

    });
  }


  //============================================================================    
  function handleExpanded(){
    $('.bookmark-lists').click(function(){
      $('.bookmark-item-controls').slideToggle("slow");
      console.log('expanded ran');
    });

  }

    
    
    
  function bindEventListeners() {
    deleteBookmark();
    handleAddSubmit();
    handleRadio(); 
    handleExpanded();
   
  }
    
    
  return {
    bindEventListeners,
    render: render
  };
    
}());