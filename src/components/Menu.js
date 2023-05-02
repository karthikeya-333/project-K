import { useContext, useEffect, useState } from "react";
import kContext from "../contexts/Context";
import { useNavigate } from "react-router-dom";


function Menu() {

    let [session, setSession] = useState(1);
    let [item, setItem] = useState("");
    const context = useContext(kContext);
    let { menu, getMenu ,setMenu,addMenu} = context;
    let navigate= useNavigate();

    useEffect(() => {
        getMenu(1);
    }, [])


    async function handleChange1(e) {
        setSession(Number(e.target.value));
        // console.log(Number(e.target.value));
         getMenu(Number(e.target.value));
    }

    function handleChange2(e) {
        setItem(e.target.value);
    }

    function handleAdd() {
        menu.push(item);
        setItem("");
    }

    function handleClick() {
       addMenu(session);
       navigate("/admin");

    }

    function handleDelete(e) {
      let index=e.target.id;
      let newMenu = menu.filter((item,i)=>{
        return i!=index;
      });
      setMenu(newMenu)

    }


    return (
        <>
            <div className="text-center">
                <h1>Add Menu</h1>
                <div >
                    <label for="cars"><h3>Choose the session:</h3></label>
                    <select onChange={handleChange1} name="cars" id="cars">
                        <option value="1">Breakfast</option>
                        <option value="2">Lunch</option>
                        <option value="3">Dinner</option>
                    </select>
                </div>
                <div>
                    <label ><h3>Add Item:</h3></label>
                    <input type="text" value={item} onChange={handleChange2} />
                    <button onClick={handleAdd}>Add</button>
                </div>
                <div>
                    {menu.length!= 0 ? menu.map((item,index) => {
                        return (<li key={index}>{item}<i id={index} onClick={handleDelete} style={{cursor : "pointer"}} className="fa-solid fa-circle-minus"></i></li>)
                    }) : <h3>NOT AVALIABLE</h3>}
                </div>
                <button onClick={handleClick}>Add Menu</button>
            </div>
        </>
    )
}

export default Menu;