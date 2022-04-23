import React, { useEffect, useState } from 'react'
import { useCanvas } from "../context/CanvasContext";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const ModalProejct = ({handleClose}) => {
    const [canvasArray, setCanvasArray] = useState([])
    const {
        setcanvasItems
      } = useCanvas();
    useEffect(() => {
        GetCanvasList()
    },[])
    const GetCanvasList = () => {
        axios.get("/canvas")
        .then(({data}) => {
            setCanvasArray(data.data)
        })
        .catch(() => {
    
        })
      }
    const loadOldCanvas = (id) => {
        const newCanvas = canvasArray.find(item => item.id === id)
        setcanvasItems(newCanvas.canvasElements)
    }
    return(
    <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <List>
                {canvasArray.length > 0 ?
                    canvasArray.map((item) => <ListItem key={item.id}><ListItemButton onClick={() => loadOldCanvas(item.id)}>{item.canvasName}</ListItemButton></ListItem>)
                    :
                    <Typography variant="h5">You don't have any projects</Typography>
                }
            </List>
        </Box>
    </Modal>
    )
}

export default ModalProejct


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 400,
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };
