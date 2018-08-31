const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/janet';
    
  const getItems = function(callback) {
     $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  const createItem = function(title, url, desc, rating, onSuccess, onError ) {
    console.log(desc);
    const newItem = JSON.stringify(
      {
        title: title,
        url: url,
        desc: desc,
        rating: rating,
        
      });
   
    return $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: onSuccess,
      error: onError
      
    });
  };


  const deleteItem = function(id, callback){
    $.ajax({
      url:`${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    });
  };
  


  const updateItem = function(id, updatedData, callback){
    $.ajax({
      url:`${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };



  return {
    getItems,
    createItem,
    deleteItem,
    updateItem,
  
  }



}());