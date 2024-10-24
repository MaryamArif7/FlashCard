"use client";
import { useUser } from "@clerk/nextjs"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "../../componetss/Navbar"
import {
  Dialog,
  DialogTitle,
  CardContent,
  Typography,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    }
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    /*if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.');
      return;
    }
  */
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <div className="bg-purple-400 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-10 font-bold text-2xl">Generate Flashcards</h1>
        <div className="mt-4 grid w-96 gap-2">
          <Textarea
            placeholder="Enter Your Prompt here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleSubmit}>Generate</Button>
        </div>
      </div>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 1}}>
       
          <div className="relative">
            <Carousel>
              <CarouselContent>
                {flashcards.map((flashcard, index) => (
                  <CarouselItem key={index}>
                    <div
                      onClick={() => handleCardClick(index)}
                      style={{
                        width: "300px",
                        height: "300px",
                        perspective: "1000px",
                        margin: "0 auto",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        }}
                      >
                        {/* Front Side */}
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                          }}
                        >
                          <CardContent>
                            <Typography variant="body1">
                              {flashcard.front}
                            </Typography>
                          </CardContent>
                        </div>

                  
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            backgroundColor: "#f0f0f0",
                            transform: "rotateY(180deg)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                          }}
                        >
                          <CardContent>
                            <Typography variant="body1">
                              {flashcard.back}
                            </Typography>
                          </CardContent>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
             
            </Carousel>
          </div>
        </Box>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button  onClick={handleOpen}>
          Save  Your Flashcards
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard collection
          </DialogContentText>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            label="Collection"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
