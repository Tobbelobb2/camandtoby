import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useApp } from "../context/app-context";
import { WatchedMovie } from "../Interfaces";

export function MovieList(){

    const app = useApp();
    const db = getFirestore(app);

    const [movies, setMovies] = useState<WatchedMovie[]>([]);

    useEffect(() => {
        getMovies().then(result => setMovies(result as WatchedMovie[]))
    }, [])

    // Get a list of cities from your database
    async function getMovies() {
        const watchedMovies = collection(db, 'watchedmovies');
        const movieSnapshot = await getDocs(watchedMovies);
        const movieList = movieSnapshot.docs.map(doc => doc.data());
        return movieList;
    }

    console.log(movies)

    function getDateString(date: Date){
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        return date.toISOString().split('T')[0]
    }
    
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>Hei bubs! I love you the most!</p>
            <p>We have so far seen {movies?.length} movies!</p>
            <div className="table-responsive">
                <Table responsive striped bordered className="table">
                    <thead>
                        <tr >
                            <th style={{paddingRight: "4rem"}}>
                                Movie Name
                            </th>
                            <th style={{paddingRight: "4rem"}}>
                                Recommended by
                            </th>
                            <th style={{paddingRight: "4rem"}}>
                                Tobys rating
                            </th>
                            <th style={{paddingRight: "4rem"}}>
                                Cams rating
                            </th>
                            <th style={{paddingRight: "4rem"}}>
                                Date watched
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies?.map(movie => 
                            <tr>
                                <td>{movie.title}</td>
                                <td>{movie.recommendedBy}</td>
                                <td>
                                    {movie.tobysRating}
                                </td>
                                <td>{movie.camsRating}</td>
                                
                                <td>
                                    {getDateString(new Date(movie.dateWatched.seconds * 1000))}
                                </td>
                            </tr>
                            )}
                    </tbody>
                    </Table>
                </div>
        </div>
    )
}