import React, { useState, useContext, useRef, useEffect, createContext } from "react";
import { navbar } from "../const";
const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [canvasItems, setcanvasItems] = useState ([])
    const [selectedObj, setSelectedObj] = useState(null)
    const [move, setMove] = useState(false)
    const canvRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
      reloadCanvas()
    }, [canvasItems])

    //Start canvas with a default values 
    const startCanvas = () => {
      const canvas = canvRef.current
      canvas.width = 1600;
      canvas.height = 1600;
      canvas.style.width = `800px`;
      canvas.style.height = `800px`;
      const context = canvas.getContext("2d")
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
    };
    
    //All varianty of objects to place.
    //Later create varianty array and create loop here and in select menu
    const objectVariety = ({type, x, y, size}) => {
      switch (type){
        case "circle":{
          contextRef.current.arc(x, y, size*2, 0, 2 * Math.PI);
          contextRef.current.fill();
          break
        }
        case "box":{
          contextRef.current.fillRect(x, y, size*4, size*4);
          break
        }
      }
    }

    //Create/place object on canvas with default propertys
    const placeDrawing = ({type}) => {
        if(!type) return
        const x = (window.innerWidth - navbar) / 2
        const y = (window.innerHeight - navbar) / 2
        contextRef.current.beginPath();
        contextRef.current.stroke();
        const itemProperty = {name:`Object${canvasItems.length}`,type, id:Math.random().toString(36).substr(2, 9), x:x,y:y, size:50}
        setcanvasItems([...canvasItems,itemProperty])
        objectVariety(itemProperty)
        setSelectedObj(itemProperty)
        contextRef.current.closePath();
    };
  
    const reloadCanvas = () => {
        startCanvas()
        canvasItems.forEach((item) => {
            contextRef.current.beginPath();
            objectVariety({...item})
            contextRef.current.closePath();
        })
    }

    const selectItem = (id) => {
        const obj = canvasItems.find(x => x.id === id);
        setSelectedObj(obj)
    }

    const editItem = (object) => {
        const editedItem = object;
        let newArr = [...canvasItems];
        const foundIndex = newArr.findIndex(x => x.id == selectedObj.id);
        if(foundIndex !== -1) newArr[foundIndex] = editedItem
        setcanvasItems(newArr)
    }
    
    const removeItem = (id) =>{
        if(selectedObj.id === id) setSelectedObj(null)
        setcanvasItems(canvasItems.filter(item => item.id !== id));
    }

    const startMove = () => setMove(true)
    const stopMove = () => setMove(false)
    
    //Bug to solve: After removing object, propertys x and y still exist and becouse of that app think we haven't removed a element
    const moveObject = ({ nativeEvent }) => {
      if(!move || !selectedObj) return
      const { offsetX, offsetY } = nativeEvent;
      const foundIndex = canvasItems.findIndex(x => x.id == selectedObj.id);
      const newObj = {...canvasItems[foundIndex], x:offsetX, y:offsetY}
      editItem(newObj)
      setSelectedObj(newObj)
    }

    return (
      <CanvasContext.Provider
        value={{
          canvRef,
          contextRef,
          startCanvas,
          placeDrawing,
          canvasItems, 
          setcanvasItems,
          selectedObj,
          selectItem,
          editItem,
          removeItem,
          setcanvasItems,
          startMove,
          stopMove,
          moveObject
        }}
      >
        {children}
      </CanvasContext.Provider>
    );
  };
  
  export const useCanvas = () => useContext(CanvasContext);