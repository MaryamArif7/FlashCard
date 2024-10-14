"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(db, "users", user.id), search); 
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <div>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          <div>
            <h2 className="text-white mt-4 text-xl">Flashcards Preview</h2>
            <Grid container spacing={3}>
              {flashcards.map((flashcard) => (
                <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                  <Card>
                    <CardActionArea
                      onClick={() => handleCardClick(flashcard.id)}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            perspective: "1000px",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            "& > div": {
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            },
                          }}
                        >
                          <div
                            style={{
                              transform: flipped[flashcard.id]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                              }}
                            >
                              <Typography variant="h5" component="div">
                                {flashcard.front}
                              </Typography>
                            </div>

                            <div
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                              }}
                            >
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
          </div>
        ) : (
          <Typography>No flashcards found.</Typography>
        )}
      </Grid>
    </div>
  );
}
