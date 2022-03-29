const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEL = document.getElementById("website-name");
const websiteUrlEL = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = [
  {
    name: "Google",
    url: "https://www.google.com",
  },
];

// Show Modal, Focus on input
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEL.focus();
}

// close Modal
function closeModal() {
  modal.classList.remove("show-modal");
}

// outside click close
function outsideClick(e) {
  if (e.target === modal) {
    closeModal();
  } else false;
}

// validate form
function validateForm(nameValue, urlValue) {
  const expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields");
  } else if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
  } else {
    return true;
  }
}

/// Build Bookmarks
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarkContainer.textContent = "";
  console.log(bookmarks);
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement("div");
    item.classList.add("item");
    // Close Icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

// fetch bookmarks from local storage
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    const id = `https://google.com`;
    bookmarks = [
      {
        name: "Google",
        url: "https://www.google.com",
      },
    ];
    storeBookmarkInLocalStorage(bookmarks);
  }
  buildBookmarks();
}

// delete bookmark
function deleteBookmark(url) {
  // delete bookmark from bookmarks array
  if (confirm("Are you sure you want to delete this bookmark?")) {
    bookmarks.splice(url, 1);
    // store bookmarks in local storage
  }

  storeBookmarkInLocalStorage(bookmarks);
  fetchBookmarks();
}

// Store Bookmark
function storeBookmark(e) {
  e.preventDefault();
  // Get form values
  let nameValue = websiteNameEL.value;
  let urlValue = websiteUrlEL.value;

  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  // Validate Form
  if (!validateForm(nameValue, urlValue)) {
    return false;
  }
  // Create bookmark object
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
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
function storeBookmarkInLocalStorage(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// on load fetch bookmarks
fetchBookmarks();

// Modal event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

// event listener for form submit
bookmarkForm.addEventListener("submit", storeBookmark);
