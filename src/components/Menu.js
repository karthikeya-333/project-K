import { useContext, useEffect, useState } from "react";
import kContext from "../contexts/Context";
import { useNavigate } from "react-router-dom";


function Menu() {

    let [session, setSession] = useState(1);
    let [item, setItem] = useState("");
    const context = useContext(kContext);
    let { menu1, getMenu, setMenu1, addMenu } = context;
    let navigate = useNavigate();

    useEffect(() => {
        
        getMenu(1);
    }, [])
    


    async function handleChange1(e) {
        setSession(Number(e.target.value));
        getMenu(Number(e.target.value));
    }

    function handleChange2(e) {
        setItem(e.target.value);
    }

    function handleAdd() {
        menu1.push(item);
        setMenu1(menu1);
        setItem("");
    }

    function handleClick() {
        addMenu(session);
        navigate("/admin");

    }

    function handleDelete(e) {
        let index = e.target.id;
        let newMenu = menu1.filter((item, i) => {
            return i != index;
        });
        setMenu1(newMenu)

    }


    return (
        <>
            <div className='payment'>
                <div className="container">
                    <div className="payment-title">
                        <h2 style={{ marginBottom: 0 }}>Add Menu</h2>
                    </div>
                    <div style={{ marginBottom: 50 }}>
                        <label for="cars">Session:</label>
                        <select onChange={handleChange1} name="cars" id="cars">
                            <option value="1">Breakfast</option>
                            <option value="2">Lunch</option>
                            <option value="3">Dinner</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: 30 }}>
                        <label >Add Item:</label>
                        <input type="text" value={item} onChange={handleChange2} />
                        <button onClick={handleAdd}>Add</button>
                    </div>
                    <div className="form-group text-center" style={{ display: "inline" }}>
                        {(menu1 && menu1.length != 0) ? menu1.map((item, index) => {
                            return (<li key={index}>{item}<i id={index} onClick={handleDelete} style={{ cursor: "pointer",marginLeft:10}} className="fa-solid fa-circle-minus"></i></li>)
                        }) : <h3>NOT AVALIABLE</h3>}
                    </div>
                    <div className="form-group" style={{ display: "inline" }}>
                        <button style={{ width: 250,marginTop:15 }} onClick={handleClick}>Add Menu</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Menu;

