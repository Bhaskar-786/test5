import React , {useEffect , useState} from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
 
 

export default function Home() {


// aagar aapko .map ka use krna hai to array pr he kr sakte hai, object pr .map ka use nahi ho sakta
  const [search, setsearch] = useState('')
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0] , response[1]);
    
    setfoodItem(response[0]);
    setfoodCat(response[1]);



  }

  useEffect(()=>{
   loadData()
  },[])
//  ^ yaha pr dependencies likhte hain












  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>
      <div style={{ marginBottom: "150px" }}>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ height: '70vh' }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: '10' }}>
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <div className="d-flex input-group justify-content-center">
                  <input
                    type="search"
                    className="form-control rounded me-2"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e)=>{
                      setsearch(e.target.value)
                    }}
                  />
                  {/* <button
                    type="button"
                    className="btn btn-outline-primary text-white bg-success"
                  >
                    search
                  </button> */}
                </div>
              </div>
            </nav>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/800x600/?burger"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }} 
              alt="..."
              
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800x600/?pastry"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800x600/?barbecue"
              className="d-block w-100"
              style={{ objectFit: 'cover', height: '100%' }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {
          (foodCat !== []) 
          ? foodCat.map((data) =>{
            return( <div className="row mb-3">
               <div key={data._id} className="fs-3 m-3"> 
               {data.CategoryName}
                </div>
                <hr/>
                  {foodItem !== [] ? foodItem.filter((item)=> (item.CategoryName === data.CategoryName )&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems =>{
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card  foodItem = {filterItems}
                         options = {filterItems.options[0]}
                          
                        ></Card>
                        </div>
                    )
                  })
                  :<div>no such data found</div> 
                  }

                </div>
          ) 
          })
          :  ""
        }
        
          
      </div>
      <div>
        <Footer />{" "}
      </div>
    </div>
  );
}
