import db from '../database/db.js'
import { v4 as uuidv4 } from 'uuid';

export const saveCanvas = async (req,res) => {
    try{
        if(!req.body.canvasName || typeof req.body.canvasName !== 'string'){
            return res.status(400).json({ success: false, message:"You need to add a canvas name"});
        }
        const { canvasList } = db.data;
        await canvasList.push({canvasName:req.body.canvasName, canvasElements:req.body.elements, date:Date.now(), id:uuidv4() })
        await db.write();
        return res.status(200).json({ success: true });
    }catch(err){
        console.log(err)
        return res.status(500).json({ success: false, message:"Server error"});
    }
}

export const getCanvas = async (req,res) => {
    try{
        const { canvasList } = db.data;
        console.log(db.data)
        return res.status(200).json({ success: true,  data:canvasList});
    }catch{
        return res.status(500).json({ success: false, message:"Server error"});
    }
}