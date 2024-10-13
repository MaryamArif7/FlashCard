"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTitle,
  Grid,
  CardContent,
  Typography,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please try again.');
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
    if (!name) {
      alert("Please Enter a Name");
      return;
    }
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcards collection with the same name already exists");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }

      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard, index) => {
        const cardDocRef = doc(colRef, `flashcard-${index}`);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();
      handleClose();
      router.push('/flashcards');
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("Failed to save flashcards");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="mt-24 text-white text-2xl">Generate Flashcards</h1>
        <div className="mt-10 grid w-96 gap-2">
          <Textarea
            placeholder="Enter Your Prompt here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleSubmit}>Generate</Button>
        </div>
      </div>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" className="text-white">Generated Flashcards</Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div
                  onClick={() => handleCardClick(index)}
                  style={{
                    width: '100%',
                    height: '200px',
                    perspective: '1000px',
                    borderRadius: '12px',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s',
                      transformStyle: 'preserve-3d',
                      transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        borderRadius: '12px',
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">{flashcard.front}</Typography>
                      </CardContent>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#f0f0f0',
                        transform: 'rotateY(180deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        borderRadius: '12px',
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">{flashcard.back}</Typography>
                      </CardContent>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Save
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
          <Button onClick={saveFlashcards} disabled={!name}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
