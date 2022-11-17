import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useApp } from "../context/app-context";

export function MovieList(){

    const app = useApp();
    const db = getFirestore(app);

    const [movies, setMovies] = useState<DocumentData[]>();

    useEffect(() => {
        getMovies().then(result => setMovies(result))
    }, [])

    // Get a list of cities from your database
    async function getMovies() {
        const watchedMovies = collection(db, 'watchedmovies');
        const movieSnapshot = await getDocs(watchedMovies);
        const movieList = movieSnapshot.docs.map(doc => doc.data());
        return movieList;
    }
    
    return(
        <div>
            <p>Hei Cam!</p>
            <p>Vi har sett {movies?.length} filmer</p>
        </div>
    )
}