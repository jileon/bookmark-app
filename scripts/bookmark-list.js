'use-strict';

const bookmarkList = (function(){

  function generateCondensedElements (item){
    let itemTitle = `<span class="item-title">${item.title}</span>`;
    let itemStars = `<span class="item-title">${item.title}</span>`;
    return `<div class= "bookmark-item-condensed">
        <li class="js-item-element" data-item-id="${item.id}">
          ${itemTitle}
            <div class= "bookmark-item-rating">
            <h4 class= "testing">${item.rating}</h4>
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
        <li class="js-item-element  list-item-element" data-item-id="${item.id}">
          ${itemTitle}
            
            <div class="ratings">
            <h4>${item.rating} Stars</h4>
            </div>
            <div class= "bookmark-item-description">
            <h4>DESCRIPTION</h4>
            <div class="list-description">
            <p>${item.desc}</p>
            </div>
          <div class="bookmark-item-controls">

            <button class="js-item-delete">
              <span class="button-label">Delete</span>
            </button>

            <a href=${item.url} target="_blank"><button class="bookmark-delete js-visitSite">
              <span class="button-label">Visit Site</span>
            </button></a>
            </div>
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
  // function generateCondensedItemsString(bookmarks) {
    
  //   const items = bookmarks.map((item) => generateCondensedElements(item));
  //   return items.join('');
  // }
    
    
  //============================================================================


  function render() {
    console.log('`render` ran');
    let items = dataStore.bookmarks;
    let bookmarkListString = generateBookmarksItemsString(items)
  
//==========================================================
    items = items.filter(function(items){
      if( items.rating === dataStore.filterRating){
        return items;
        ;
      } 
    });
  
    if (items.filterRating===1){
    items = dataStore.bookmarks;
    }

    bookmarkListString = generateBookmarksItemsString(items);
    // render the bookmark list in the DOM
    //const bookmarkCondensedString = generateCondensedItemsString(items);

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
      let itemURL = $('.js-bookmark-url-entry').val();
      let itemDesc = $(".js-bookmark-description-entry").val();
      console.log(itemDesc);
      let itemRating = $(".radio-buttons").find("input:checked").val();
      api.createItem(itemTitle, itemURL, itemDesc, itemRating, function(response){
        dataStore.addItem(response);
        //console.log(response);
        render();
      });
      // $('.js-bookmark-title-entry').val(" ");
      //   $('.js-bookmark-url-entry').val(" ");
      //   $(".js-bookmark-description-entry").val(" ");


    });
  }


  //============================================================================    
  function handleExpanded(){
    $('.bookmark-lists').click(function(){
      $('.bookmark-item-description').slideToggle("slow");
      console.log('expanded ran');
    });

  }

  //============================================================================    
  function handleRatingsFilter(){
    $('.js-select-ratings').on('click', function(event){
      console.log("ratings ran");
      if($(event.target).hasClass("rating1")){
        console.log(1);
        dataStore.filterRating = 1;
        render();
      }
      if($(event.target).hasClass("rating2")){
        console.log(2);
        dataStore.filterRating = 2;
        render();
      }
      if($(event.target).hasClass("rating3")){
        console.log(3);
        dataStore.filterRating = 3;
        render();
      }
      if($(event.target).hasClass("rating4")){
        console.log(4);
        dataStore.filterRating = 4;
        render();
      }
      if($(event.target).hasClass("rating5")){
        console.log(5);
        dataStore.filterRating = 5;
        render();
       
      }
    });
  }

    
    
    
  function bindEventListeners() {
    deleteBookmark();
    handleAddSubmit();
    handleRadio(); 
    handleExpanded();
    handleRatingsFilter();

   
  }
    
    
  return {
    bindEventListeners,
    render: render
  };
    
}());