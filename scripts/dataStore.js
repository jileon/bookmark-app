const dataStore = (function(){

  const addItem = function(item) {
    this.bookmarks.push(item);
  };
     
  const removeItem = function(id){
    const index = this.bookmarks.findIndex(bookmark=>{
      return bookmark.id === id;
    });
    this.bookmarks.splice(index,1);

  };
//   const bookmarks = Object.assign{expanded:false}
 

  return {
    bookmarks: [],
    empty: false,
    error: null,
    filterRating: 5,
    addItem,
    removeItem,
  };



}());