"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { transform } from "next/dist/build/swc";
import { 
  Dialog,
  DialogTitle,Grid,Paper,TextField,Typography,Box,
  
  
  DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setflashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setflashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please Enter a Name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "user"), user.id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("FlashCards collection with the same name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <div className="bg-black">
      <div className="  flex flex-col items-center">
        <h1 className=" mt-24 text-white text-2xl">Generate FlashCards</h1>
        <div className="mt-10 grid w-96 gap-2">
          <Textarea placeholder="Enter Your Prompt here " />
          <Button onClick={handleSubmit}>Submit</Button>

        </div>
      </div>
      
     {flashcards.length>0 && (
          <div >
            <h2>FlashCards Preview</h2>
            <Grid container spacing={3}>
            {flashcards.map((flashcard,index)=>(
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea 
                        onClick={()=>{
                            handleCardClick(index)
                        }}
                        
                        >
                            <CardContent>
                                <Box sx={{
                                    perspective:'1000px',
                                    '&> div ':{
                                        transition:'transform 0.6s',
                                        transformStyle:'preserve-3d',
                                        position:'relative',
                                        width:'100%',
                                        height:'200px',
                                        boxShadow:'0 4px 8px 0 rgba (0,0,0.2)',
                                        transform:flipped[index]
                                        ? 'rotateY(180deg)'
                                        :'rotateY(0deg)'

                                    },
                                    
                    
                                        '&> div >div':{
                                            
                                            
                                            position:'absolute',
                                            width:'100%',
                                            height:'100%',
                                            boxShadow:'0 4px 8px 0 rgba (0,0,0.2)',
                                             backfaceVisibility:"hidden",
                                             display:'flex',
                                             justifyContent:'center',
                                             alignItems:'center',
                                             padding:2,
                                             boxSizing:'border-box',
    
                                        },
                                        '& >div >div:nth-of-type(2)':{
                                            transform:'rotateY(180deg)',
                                        }
                                    
                                }}>
                                    <div>
                                        <div>
                                            <Typography variant="h5" component="div">
                                           {flashcard.front}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <Typography variant="h5" component="div">
                                           {flashcard.back}
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>
                            </CardContent>
                            
                        </CardActionArea>
                    </Card>

                </Grid>
            ))}
            </Grid>
            <Box sx={{mt:4 ,display:'flex' ,justifyContent:'center'}}>
            <Button variant='contained' color='secondary' onClick={handleOpen}> 
     Save
            </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}
            >
                <DialogTitle>
                    Save FlashCards
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                  Please enter a name for your flahcard collection
                </DialogContentText>
                <TextField
                variant="outlined"
                autoFocus margin='dense' lable='collection' type='Text' fullWidth value={name} onChange={(e)=>setName(e.target.value)}
                
                
/>
<DialogActions>
  <Button onClick={handleClose}>
    Cancel
  </Button>
  <Button >
    save
  </Button>
</DialogActions>

                
                </DialogContent>
               
            </Dialog>
          </div>
     )}


      
    </div>
  );
}
