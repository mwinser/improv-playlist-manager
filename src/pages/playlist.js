import { FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { Link } from "gatsby"
import React, { useRef } from "react"
import { useContext } from "react"
import { Context } from "../context"
import { useState } from "react"
import { useReactToPrint } from "react-to-print"
import Layout from "../components/layout"




export default function PlaylistPage(props) {
    const {playlist, toggleGameInPlaylist, moveGamePosition} = useContext(Context)
    const [fakeState, setFakeState] = useState(0)
    const componentRef = useRef()
    function updatePlaylist(){
        //in Gatsby Context passed as props doesn't update on Context change
        setFakeState(prevState=>prevState+1)
        console.log(fakeState + " forced update due to context change")
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    
    return (
        <Layout>
            <div classname="playlist-container">
                <h2>Playlist Manager Page</h2>
                <div className="flex-row">
                    <Link to="/" state={{playlist}}>
                        <button>Back to Index</button>
                    </Link>
                    <button onClick={handlePrint}>
                        Print Playlist
                    </button>
                </div>
                

                {playlist && playlist.map((item, index)=> {
                    return(
                        <div key={item+"_"+index} className="card-small">
                            <div className="flex-row">
                                <h3>{item}</h3>
                                <div className="buttons-container">
                                    {index>0 ? <button onClick={()=>{moveGamePosition(item, index, -1); updatePlaylist()}}><FaArrowUp/> </button> : null}
                                    {index<playlist.length-1 ? <button onClick={()=>{moveGamePosition(item, index, 1); updatePlaylist()}}><FaArrowDown/> </button> : null}
                                    <button onClick={()=>toggleGameInPlaylist(item)}><FaRegTrashAlt/> </button>
                                </div>
                                
                            </div>
                            
                        </div>
                    )
                    
                })
                }

                <div className="printable-playlist-container">
                    <div className="printable-playlist" ref={componentRef}>
                        <p>
                            {playlist.map(item=><>{item}<br/></>)}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}