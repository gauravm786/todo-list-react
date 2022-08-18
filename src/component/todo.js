import React, { useEffect, useState } from 'react'
import todo from '../images/images.png'
import '../App.css'

//to get the data from localstorge
const getLocalItems = ()=>{
  let list = localStorage.getItem("list")
  console.log(list)

  if(list){
    return JSON.parse(localStorage.getItem("list")) //returns data in array instead of object
  }
  else{
   return []
  }

}

const Todo = () => {

  const[inputData,setInputData]=useState("")

  // const[items,setItems]=useState([])
  const[items,setItems]=useState(getLocalItems())
  //every new todo will be added in this array

  const[toggleSubmit,setToggleSubmit]=useState(true)

  const[isEditItem,setIsEditItem]=useState(null)

  const addItem  = ()=>{
    // setItems([...items,inputData])
    //...items will store old value and inputData will store new value

    // setInputData("")

    // if(!inputData){
    // }
    // else{
    // //  setItems([...items,inputData])
    // //  setInputData("") //will remove data from input field after clicking on add button
    
    // const allInputData = { id: new Date().getTime().toString(), name:inputData }
    // setItems([...items, allInputData]);
    // setInputData('')

    //to get data after editing
    if(!inputData){
      alert("Please fill the data")
    }
    else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id===isEditItem){
            return {...elem,name:inputData}
          }
          return elem
        })
      )
      setToggleSubmit(true)
      setInputData('')
      setIsEditItem(null)
    }
    else{    
    const allInputData = { id: new Date().getTime().toString(), name:inputData }
    setItems([...items, allInputData]);
    setInputData('')
    }
  }

  // delete item 
  // const deleteItem=(id)=>{ //in id we get the index of showItems
  //   const updatedItem=items.filter((elem,index)=>{
  //     return index !== id //return data whose id is not matched
  //     //
  //   })
  //   setItems(updatedItem)
  // }
  const deleteItem=(index)=>{ //in id we get the index of showItems
    const updatedItem=items.filter((elem)=>{
      return index !== elem.id //return data whose id is not matched
      //
    })
    setItems(updatedItem)
  }

  const removeAll = () =>{
    setItems([])
  }


//edit the item
//When user click on edit button 

// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit. 
// 4: To pass the current element Id to new state variable for reference 

const editItem=(id)=>{
  let newEditItem = items.find((elem)=>{
    return elem.id ===id
  })
  console.log(newEditItem) // step1

  setToggleSubmit(false)   // step2

  setInputData(newEditItem.name)  //step3(the value which we want to update will come to our input box)

  setIsEditItem(id)               //step4(we will be able to change data name which we want to update)
}


  //add to local storage
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(items))
  },[items]) //whenever the value of items is changed then data must be stored in local storage. 

  return (
      <>
    <div className="main-div">
    <div className="child-div">
        <figure>
            <img src={todo} style={{marginLeft:"2rem"}} alt="todologo" />
            <figcaption>Add your list here ✌️</figcaption>
        </figure>

        <div className="addItems">
            <input type="text" placeholder='✍️ Add Items ...'
            value={inputData} 
            onChange={(e)=>setInputData(e.target.value)}/>
            {/* <i className="fa fa-plus" onClick={addItem}></i> */}
            {/* toggle  */}
            {
              toggleSubmit?
              <i className="fa fa-plus" onClick={addItem}></i> :
              <i className="far fa-edit " onClick={addItem}></i>

            }
        </div>

        {/* <div className="showItems">
          <div className="eachItem">
            <h3>Apple</h3>
            <i className="far fa-trash-alt"></i>
          </div>
        </div> */}

          {/* to add data one by one on browser by clicking on add button  */}
          <div className="showItems">
            {
            items.map((elem)=>{
            return(
            <div className="eachItem" key={elem.id}>
            <h3>{elem.name}</h3>
            <div className="todo-btn">
            <i className="far fa-edit " onClick={()=>editItem(elem.id)}></i>
            <i className="far fa-trash-alt" onClick={()=>deleteItem(elem.id)}></i>
            </div>
          </div>
            )
            })
            }
        </div>

        {/* clear all button  */}
        <div className="showItems">
        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
          {/* data-sm-link-text acts as a hover */}
        </div>
    </div>
</div>
</>
  )
}

export default Todo