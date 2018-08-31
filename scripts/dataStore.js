const dataStore = (function(){

  const bookmarks = [];
  let empty = false;
  let filterRating = 1;
  let error = null;

  const addItem = function(item) {
    item.expanded = false;
    bookmarks.push(item);
  };
     
  const removeItem = function(id){
    const index = bookmarks.findIndex(bookmark=>{
      return bookmark.id === id;
    });
    bookmarks.splice(index,1);

  };

  const findById = function(id) {
    return bookmarks.find(item => item.id === id);
   
  };


  const findAndUpdate = function(id, newData) {
    console.log (id);
    console.log(this);
    const item = findById(id);
    Object.assign(item, newData);
  };

  const toggleExpanded = function (id){
    const bookmark = findById(id);
    bookmark.expanded = !bookmark.expanded;
  };

  //   const bookmarks = Object.assign{expanded:false}
 

  return {
    bookmarks,
    error,
    filterRating,
    addItem,
    removeItem,
    findAndUpdate,
    toggleExpanded,
  };



}());