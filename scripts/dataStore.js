const dataStore = (function(){

    const addItem = function(item) {
        this.bookmarks.push(item);
      };


return {
    bookmarks: [],
    error: null,
    addItem,
}



}());