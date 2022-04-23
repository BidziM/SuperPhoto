import React, { useEffect } from 'react'
import { useCanvas } from "../context/CanvasContext";
import styled from "styled-components";
import { Button, TextField, Typography } from '@mui/material';
import Modal from './ModalProjectList';
import { useState } from 'react';
import axios from 'axios';
const Canvas = () => {
    const [canvasName, setName] = useState("New Canvas")
    const [open, setOpen] = useState(false);
    const [isAccept, setAccept] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        canvRef,
        startCanvas,
        canvasItems,
        startMove,
        stopMove,
        moveObject
      } = useCanvas();
    useEffect(() => {
        startCanvas()
    }, [])
    const saveToCloud = () => {
        axios.post("/canvas", {canvasName, elements:canvasItems})
        .then(({data, status}) => {
            statusAccepted(true)
        })
        .catch(() => {
            statusAccepted(false)
        })
      }

    const statusAccepted = (status) => {
        if(status) {
            setAccept(true)
            setTimeout(() => {
                setAccept(false);
            }, 4000);
        }else{
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 8000);
        }
    };
    return(
        <Wrapper>
            <TextField label="Project name" variant="outlined" onChange={(e) => setName(e.target.value)}/>
            {open && <Modal handleClose={handleClose}/>}
            <CanvasComponent
                ref={canvRef}
                onMouseDown={startMove}
                onMouseUp={stopMove}
                onMouseLeave={stopMove}
                onMouseMove={moveObject}
            />
            <ButtonContainer>
                <Button onClick={saveToCloud} size={'medium'}> Send to cloud</Button>
                <Button onClick={handleOpen} variant="contained">Project list</Button>
            </ButtonContainer>
            {isAccept ? <Typography sx={{color:"green"}}>Canvas has been saved</Typography> 
                : 
                isError 
                ? <Typography sx={{color:"red"}}>We can not save your canvas try later</Typography> : null
            }
        </Wrapper>
    )
}

export default Canvas

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`
const ButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CanvasComponent = styled.canvas`
    border: 2px;
    border-color: green;
    border-style: solid;
    display: block;
  flex-grow: 1;
`;