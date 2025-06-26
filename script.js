let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".totalR");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let submit = document.querySelector(".create");

let mood = "create";
let tmp;
let dataPro = [];


function GetTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "0";
    total.style.background = "#a00d02";
  }
}

price.oninput = GetTotal;
taxes.oninput = GetTotal;
ads.oninput = GetTotal;
discount.oninput = GetTotal;

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value !== "" && price.value !== "" && category.value !== "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push({ ...newPro });
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }

    clearData();
    showData();
  }
};
function handleSearch() {
  let titleInput = document.querySelector(".searchByTitle");
  let categoryInput = document.querySelector(".searchByCategory");

  if (titleInput.value !== "") {
    GetSearchMood("searchByTitle");
    SearchData(titleInput.value);
  } else if (categoryInput.value !== "") {
    GetSearchMood("searchByCategory");
    SearchData(categoryInput.value);
  }
}


function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" class="btn update">Update</button></td>
        <td><button onclick="deleteData(${i})" class="btn delete">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteAll = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()" class="btn delete">Delete All (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

function deleteData(i) {
  dataPro.splice(i, 1);
  showData();
}

function deleteAll() {
  dataPro = [];
  showData();
}

function updateData(i) {
  let pro = dataPro[i];
  title.value = pro.title;
  price.value = pro.price;
  taxes.value = pro.taxes;
  ads.value = pro.ads;
  discount.value = pro.discount;
  GetTotal();
  count.style.display = "none";
  category.value = pro.category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";

function GetSearchMood(className) {
  if (className === "searchByTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
}

function SearchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (
      (searchMode === "title" &&
        dataPro[i].title.includes(value.toLowerCase())) ||
      (searchMode === "category" &&
        dataPro[i].category.includes(value.toLowerCase()))
    ) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" class="btn update">Update</button></td>
          <td><button onclick="deleteData(${i})" class="btn delete">Delete</button></td>
        </tr>
      `;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
