import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
// import { Room, Star, StarBorder } from "@material-ui/icons";
import { Room, Star} from "@material-ui/icons";
import { actions } from "./redux/Reducers/userReducer";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import 'mapbox-gl/dist/mapbox-gl.css';
import Login from "./components/Login";

function App() {
    const loginData = useSelector((state) => state.currentUser) || [];
    
  const dispatch=useDispatch();
  // const myStorage = window.localStorage;
  // const [currentUsername, setCurrentUsername] = useState(JSON.parse(myStorage.getItem("user")));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude:  25.612677,
    longitude: 85.158875,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: loginData[0]?.username,
      title,
      desc,
      rating: star,
      userId:loginData[0]._id,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        // const currUser=localStorage.getItem("user");
        // const currUserId=JSON.parse(currUser);
        // console.log(currUserId._id)
        const allPins = await axios.get(`/pins/${loginData[0]?._id}`);
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [loginData]);

  const handleLogout = () => {
    // setCurrentUsername(null);
    dispatch(actions.logoutUser());
    // myStorage.removeItem("user");
  };

  const handleDelPin=async(id)=>{
    try {
      // console.log(id);
      const delPin=await axios.delete(`/pins/${id}`);
      if(delPin){
        alert("pin deleted successfully !...")
      }
    } catch (error) {
      return error;

    }
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* {console.log(process.env.REACT_APP_MAPBOX)} */}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="200"
        // mapStyle="mapbox://styles/softman/clniln1ca00bm01o06u066scx"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={loginData[0]?.username && handleAddClick}
      >
     
        {/* {console.log(pins)} */}
        {pins.map((p,index) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                  loginData[0]?.username === p.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={index}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                  <button type="button" className="submitButton" onClick={()=>handleDelPin(p._id)}>
                   Delete Pin
                  </button>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {/* { console.log(loginData)} */}
        {
         
        loginData[0]?.username ? (<>
        <span className="user-ogout">{loginData[0].username}</span>
         <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        
        </>
         
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            // setCurrentUsername={loginData[0]?.username}
            
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
