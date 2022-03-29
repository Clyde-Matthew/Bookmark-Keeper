const modal =document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEL = document.getElementById('website-name');
const websiteUrlEL = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-container');

let bookmarks = [
    { name: 'Google', url: 'https://www.google.com' },
];

// Show Modal, Focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEL.focus();
}

// close Modal
function closeModal(){
    modal.classList.remove('show-modal');
}

// outside click close
function outsideClick(e){
    if(e.target === modal){
        closeModal();
    }else false;
}

// validate form
function validateForm(nameValue, urlValue){
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields');
    }else if(!urlValue.match(regex)){
        alert('Please provide a valid web address');
    }else{
        return true;
    } 
}

// build bookmarks
function buildBookmarks(){
    // remove all bookmarks from container
    bookmarkContainer.textContent = '';

    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        const Item = document.createElement('div');
        Item.classList.add('item');
        // close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-solid',  'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // favicon  
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`); 
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // append to bookmarks container
        linkInfo.append(favicon, link);
        Item.append(closeIcon, linkInfo);
        bookmarkContainer.appendChild(Item);

    });
}


// fetch bookmarks from local storage
function fetchBookmarks(){
   if(localStorage.getItem('bookmarks')){
       bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

   }else{
       const id = `https://google.com`;
       bookmarks= [
              {
                    name: 'Google',
                    url: 'https://www.google.com'
                },
       ];
       storeBookmarkInLocalStorage(bookmarks);
   }
   buildBookmarks();
}

// delete bookmark
    function deleteBookmark(url){
        if (confirm('Are you sure you want to delete this bookmark?')){
            bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
               console.log(bookmarks); 
        }
        storeBookmarkInLocalStorage(bookmarks);
        fetchBookmarks();
    }

    
// Store Bookmark
function storeBookmark(e){
    e.preventDefault();
    // Get form values
    let nameValue = websiteNameEL.value;
    let urlValue = websiteUrlEL.value;
    
    if(!urlValue.includes('https://') && !urlValue.includes('http://')){
        urlValue = `https://${urlValue}`;
    }
    // Validate Form
    if(!validateForm(nameValue, urlValue)){
        return false;
    }
    // Create bookmark object
    const bookmark = {
        name: nameValue,
        url: urlValue
}
    // Add bookmark to bookmarks array
    bookmarks.push(bookmark);
     // Store bookmarks in local storage
    storeBookmarkInLocalStorage(bookmarks);
    fetchBookmarks();
    // Clear form
    bookmarkForm.reset();
    // Close modal
    closeModal();
    websiteNameEL.focus();


    
}

   
// Store Bookmark in Local Storage
function storeBookmarkInLocalStorage(bookmarks){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}



// on load fetch bookmarks  
fetchBookmarks();

// Modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// event listener for form submit
bookmarkForm.addEventListener('submit', storeBookmark);


