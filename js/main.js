//Function 1
function createElemWithText(HTMLElement = "p", textContent = "", className) {
  let element = document.createElement(HTMLElement);
  element.innerText = textContent;
  if (typeof className != "undefined") {
    element.classList.add(className);
  }
  return element;
}

//Function 2
function createSelectOptions(data) {
  if (typeof data == "undefined") {
    return undefined;
  } else {
    let options = [];
    data.forEach((user) => {
      let option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      options.push(option);
    });

    return options;
  }
}

//Function 3
function toggleCommentSection(postId) {
  if (typeof postId == "undefined") {
    return undefined;
  }
  let selectedSection = document.querySelector(
    `section[data-post-id='${postId}']`
  );
  if (selectedSection != null) {
    selectedSection.classList.toggle("hide");
    return selectedSection;
  } else {
    return null;
  }
}

//Function 4
function toggleCommentButton(postId) {
  if (typeof postId == "undefined") {
    return undefined;
  }
  let selectedButton = document.querySelector(
    `button[data-post-id='${postId}']`
  );
  if (selectedButton != null) {
    selectedButton.textContent === "Show Comments"
      ? (selectedButton.textContent = "Hide Comments")
      : (selectedButton.textContent = "Show Comments");
  }
  return selectedButton;
}

//Function 5
function deleteChildElements(parentElement) {
  if (typeof parentElement == "undefined") {
    return undefined;
  }

  var child = parentElement.lastElementChild;
  if (child != null) {
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
  }
  return parentElement;
}

//Function 6
function addButtonListeners() {
  buttons = document.querySelectorAll("main button");

  if (buttons.length > 0) {
    buttons.forEach((button) => {
      var postId = button.dataset.postId;

      button.addEventListener(
        "click",
        function (e) {
          toggleComments(e, postId);
        },
        false
      );
    });

    return buttons;
  }
}

//Function 7
function removeButtonListeners() {
  buttons = document.querySelectorAll("main button");

  buttons.forEach((button) => {
    button.removeEventListener("click", function (e) {});
  });
  return buttons;
}
//Function 8
function createComments(comments) {
  if (typeof comments == "undefined") {
    return undefined;
  } else {
    let fragment = document.createDocumentFragment();
    comments.forEach((comment) => {
      let article = document.createElement("article");

      let h3 = document.createElement("h3");
      h3.innerText = comment.name;
      let data = document.createElement("p");
      data.innerHTML = comment.body;
      let email = document.createElement("p");
      email.innerText = "From: " + comment.email;

      article.append(h3);
      article.append(data);
      article.append(email);
      fragment.append(article);
    });

    return fragment;
  }
}
//Function 9
function populateSelectMenu(data) {
  if (typeof data == "undefined") {
    return undefined;
  } else {
    let selectMenu = document.getElementById("selectMenu");
    let optionItems = createSelectOptions(data);
    optionItems.forEach((item) => {
      selectMenu.append(item);
    });
    return selectMenu;
  }
}

//Function 10
async function getUsers() {
  try {
    URL = "https://jsonplaceholder.typicode.com/users";
    const res = await fetch(URL);
    if (!res.ok) {
      throw Error(res.statusCode);
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
//Function 11
async function getUserPosts(id) {
  if (typeof id == "undefined") {
    return undefined;
  }
  try {
    URL = "https://jsonplaceholder.typicode.com/posts?userId=" + id;
    const res = await fetch(URL);
    if (!res.ok) {
      throw Error(res.statusCode);
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Function 12
async function getUser(id) {
  if (typeof id == "undefined") {
    return undefined;
  }
  try {
    URL = "https://jsonplaceholder.typicode.com/users/" + id;
    const res = await fetch(URL);
    if (!res.ok) {
      throw Error(res.statusCode);
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Function 13
async function getPostComments(id) {
  if (typeof id == "undefined") {
    return undefined;
  }
  try {
    URL = "https://jsonplaceholder.typicode.com/posts/" + id + "/comments";

    const res = await fetch(URL);
    if (!res.ok) {
      throw Error(res.statusCode);
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Function 14
async function displayComments(postId) {
  if (typeof postId == "undefined") {
    return undefined;
  }

  let section = document.createElement("section");
  section.dataset.postId = postId;
  section.classList.add("comments");
  section.classList.add("hide");
  let comments = await getPostComments(postId);
  let fragment = createComments(comments);
  section.appendChild(fragment);
  return section;
}

//Function 15
async function createPosts(posts) {
  if (typeof posts == "undefined") {
    return undefined;
  }
  let fragment = document.createDocumentFragment();
  for (let index = 0; index < posts.length; index++) {
    let post = posts[index];
    let article = document.createElement("article");
    let h2 = document.createElement("h2");
    h2.innerText = post.title;
    let p1 = document.createElement("p");
    p1.innerText = post.body;
    let p2 = document.createElement("p");
    p2.innerText = `Post ID: ${post.id}`;
    let button = document.createElement("button");
    button.innerText = "Show Comments";
    button.dataset.postId = post.id;
    let author = await getUser(post.userId);
    let p3 = document.createElement("p");
    p3.innerHTML = `Author: ${author.name} with
      ${author.company.name}`;
    let p4 = document.createElement("p");
    p4.innerHTML = author.company.name;

    let section = await displayComments(post.id);
    article.append(h2);
    article.append(p1);
    article.append(p2);
    article.append(p3);
    article.append(p4);
    article.append(button);
    article.append(section);

    fragment.append(article);
  }

  return fragment;
}

//Function 16
async function displayPosts(posts) {
  let main = document.getElementsByTagName("main");
  let element;
  if (typeof posts != "undefined") {
    element = await createPosts(posts);
  } else {
    let p = document.createElement("p");
    p.innerText = "Select an Employee to display their posts.";
    p.classList.add("default-text");
    element = p;
  }
  main[0].appendChild(element);
  return element;
}

//Function 17
function toggleComments(event, postId) {
  if (typeof postId == "undefined" || typeof event == "undefined") {
    return undefined;
  }

  console.log("inside toggle comments");
  event.target.listener = true;
  let section = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
}
//Function 18
async function refreshPosts(data) {
  if (typeof data == "undefined") {
    return undefined;
  }
  let removeButtons = removeButtonListeners();
  let main_element = document.getElementsByTagName("main");
  let main = deleteChildElements(main_element[0]);
  let fragment = await displayPosts(data);
  let addButtons = addButtonListeners();

  return [removeButtons, main, fragment, addButtons];
}
//Function 19
async function selectMenuChangeEventHandler(e) {
  let userId = e?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = refreshPosts(posts);
  return [userId, posts, refreshPostsArray];
}
//Function 20
async function initPage() {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
}
//Function 21
function initApp() {
  initPage();
  let menu = document.getElementById("selectMenu");
  menu.addEventListener("change", selectMenuChangeEventHandler, false);
}
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  initApp();
});
