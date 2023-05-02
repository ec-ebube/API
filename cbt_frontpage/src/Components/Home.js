// import {useState} from 'react'




const Home = () => {
    
    // const [isLoading, setIsLoading] = useState(true);

    let like = 0;
    const handliClick= () => {
        like=like+1;
        console.log(like);
    }
    return (
        <div className="home">
            <div className="home">
                {/* {isLoading && <div className='loading'>Loading...</div>} */}
                <button onClick={handliClick}>Like</button>
            </div>
        </div>
    );
}
 
export default Home;