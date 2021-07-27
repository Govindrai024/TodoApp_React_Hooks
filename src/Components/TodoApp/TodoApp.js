import React,{ useState,useEffect } from 'react'
import './style.css'

   //Get local Data
   const getLocalData = () => {
    const lists = localStorage.getItem("MyToDoList");

    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }

};


const TodoApp = () => {
    const [inputData,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [edit,setEdit] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false);
    
    // adding items
    const AddItems = () =>{
        if(!inputData){
            alert("Please! Enter your data here.")
        } else if(inputData && toggleBtn){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === edit){
                        return {...curElem, name:inputData }; 
                    }
                    return curElem;
                })
            )
            setInputData("");
            setEdit(null);
            setToggleBtn(false)
        }
        else{
            //for random id 
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }

            setItems([...items, myNewInputData])
            setInputData("")
        }
    }

    // Delete Items 
    const DeleteItems = (index) => {
        const UpdatedItems = items.filter ((curElem) =>{
            return curElem.id !== index;   
        })
        setItems(UpdatedItems)
    }

    //edit Items
    const editItems = (index) => {
        const editItemsCheck = items.find((curElem) => {
            return curElem.id === index; 
        })
        setInputData(editItemsCheck.name);
        setEdit(index);
        setToggleBtn(true)
    }
    
    //Remove All
    const RemoveAll = () =>{
        setItems([])
    }
    
    // For local Storage using useEffect hook
    useEffect(() => {
        localStorage.setItem("MyToDoList", JSON.stringify(items)); 
    }, [items]);

 
    
    return (
        <>
            <div className="body-Container">
                <div className="child-container">
                    <figure>
                        <img src="../images/todo.svg" alt="notebook" />
                        <figcaption >Add your list here ✌</figcaption>
                    </figure>
                    <div className="addItemsContainer">
                        <input
                            type="text"
                            placeholder="✍  Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value) }
                            
                        />
                        {
                            toggleBtn ? <i className="far fa-edit  add-btn"   onClick={AddItems}></i>
                            : <i className="fa fa-plus add-btn"   onClick={AddItems}></i>
                        }
                    
                    </div>
                    {/* Show Items */}
                    <div className="showItems">

                        {items.map((curElem) =>{
                                return (
                                <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                <i className="far fa-edit add-btn"
                                onClick={() => editItems(curElem.id)}
                                ></i>
                                <i className="far fa-trash-alt add-btn" 
                                onClick={() => DeleteItems(curElem.id)} 
                                ></i>
                                </div>
                            </div>
                            );
                            })}
                    </div>

                    {/* Remove All Items */}
                    <div className="showItems">
                        <button className="btn effect04" 
                        data-sm-link-text="Remove All"
                        onClick={RemoveAll}
                        >
                           <span>Check List</span> 
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TodoApp