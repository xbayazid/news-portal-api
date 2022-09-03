const loadHeader = async (index)=>{
  const url = `https://openapi.programming-hero.com/api/news/categories`

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category[index].category_name);
  const itemData = data.data.news_category[index].category_name;
  const category_id = data.data.news_category[index].category_id;
  console.log(category_id);

  const headerItems = document.getElementById('header-items');
  const li = document.createElement('li');
  li.classList.add('nav-item');
  li.innerHTML = `
      
      <a onclick ="loadBlogs('${category_id}','${itemData}')" id = "btn-${itemData}" class="nav-link active px-3 fs-5 mx-3 rounded-2" style = "cursor: pointer; background-color: #FFEBCD">${itemData}</a>
  `;
  //li.id.add('${itemData}');
  headerItems.appendChild(li);
} 
// for loading header
for(let i = 0; i<8; i++){
  loadHeader(i)
}

const loadBlogs =async (id, itemData) =>{
  const url = ` https://openapi.programming-hero.com/api/news/category/${id}`

  console.log(id)
  const res = await fetch(url);
  const data = await res.json();
  // start loader
  toggleSpiner(true);
  displayBlog(data.data, itemData);
  
}
loadBlogs('01', 'Breaking News');

const displayBlog = (datas , itemData) =>{
  const blogContainer = document.getElementById('blog-container');
  blogContainer.textContent = '';
  
  const counterSection = document.getElementById('counter-section');
  counterSection.textContent = '';
  const countDiv = document.createElement('div');
  countDiv.innerHTML = `
    <div class="container p-3 mb-5 my-2" style="background-color: #FFFACD; border-radius: 10px;">
      <h3>${datas.length} Items found for catagories ${itemData}</h3>
    </div>
  
  `;
  counterSection.appendChild(countDiv);
  if(datas.length === 0){
    const blogDiv = document.createElement('div');
    blogDiv.innerHTML = `
    <div class="container mt-5 p-5" style="background-color: pink; border-radius: 20px;">
      <h1 class="text-center">No Data Found. Please Click anothe Option</h1>
    </div>
    
    `;
    blogContainer.appendChild(blogDiv);
  }

  datas.forEach(index =>{
    const blogDiv = document.createElement('div');
  blogDiv.innerHTML = `
    
      
      <div class="card mb-3 border-0 shadow p-3 mb-5 bg-body rounded" style = "border-radius: 20px;">
          <div class="row g-0">
              <div class="col-md-3">
                  <img src="${index.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
              </div>
              <div class="col-md-9">
                  <div class="card-body">
                  <h5 class="card-title fs-4">${index.title}</h5>
                  <p class="card-text text-ellipsis">${index.details}</p>
                  <div class="row align-items-center mt-5">
                <div class="col-8 col-md-5">
                  <div class="d-flex justify-content-center align-items-center">
                    <div class="img">
                      <img src="${index.author.img}" alt="" height="60px" width="60px" class="rounded-circle">
                    </div>
                    <div class="authore ms-2">
                      <h5>${index.author.name}</h5>
                      <p>${index.author.published_date}</p>
                    </div>
                  </div>
                </div>
                <div class="col-4 col-md-3">
                  <h4 class="text-center"><i class="fa-solid fa-eye"></i>${index.total_view}</h4>
                </div>
                <div class="col-md-4">
                  <button onclick = "loadBlogDetails('${index.category_id}', '${index._id}')" class="btn btn-outline-dark"  data-bs-toggle="modal"  data-bs-target="#blogDetailsModal">Learn More <i class="fa-solid fa-right-long"></i></button>
                </div>
              </div>
                  </div>
              </div>
          </div>
      </div>
  `;
  blogContainer.appendChild(blogDiv);
  })

  // stop loader
  toggleSpiner(false);
  
}
// load blog details
const loadBlogDetails = async (category_id, id) =>{
const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
const res = await fetch(url);
const data = await res.json();
displayBlogDetails(data.data , id);
}

// display Blog Details

const displayBlogDetails = (blogs, id) =>{
const index = blogs.indexOf(blogs.find(blog => blog._id === id));
console.log(index)


const modalTitle = document.getElementById('blogDetailsModalLabel');
  modalTitle.innerText = blogs[index].title ? blogs[index].title : 'Title Not Found';
  const phoneDetails = document.getElementById('blog-details');
  phoneDetails.innerHTML = `
      <img src="${blogs[index].author.img}" height="100px" width="100px">
      <p>Authore Name: ${blogs[index].author.name ? blogs[index].author.name : 'Author Name Not Found'} </p>
      <p>Publish Date: ${blogs[index].author.published_date ? blogs[index].author.published_date : 'Publish Date Not Found'} </p>
      <p>View: ${blogs[index].total_view ? blogs[index].total_view : 'Total View Not Found'}</p>
      <p>Rating: ${blogs[index].rating.number ? blogs[index].rating.number : 'Rating Not Found'} </p>
      
  `;
}



// for loader
const toggleSpiner = isLoadeing => {
const loaderSection = document.getElementById('loader');
if(isLoadeing){
    loaderSection.classList.remove('d-none');
}
else{
    loaderSection.classList.add('d-none');
}
}