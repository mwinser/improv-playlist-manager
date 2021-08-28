import { FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa"
import React, { useRef } from "react"
import { useContext } from "react"
import { Context } from "../context"
import { useState } from "react"
import { useReactToPrint } from "react-to-print"




export default function Playlist(props) {
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
            <div className="playlist-container">
                
                <div className="flex-row">
                    <h3>Playlist Editor</h3>
                    <button onClick={handlePrint}>
                        Print Playlist
                    </button>
                </div>
                

                {playlist && playlist.map((item, index)=> {
                    return(
                        <div key={item+"_"+index} className="card-small">
                            <div className="flex-row">
                                <p>{index+1}. {item}</p>
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
                            {playlist && playlist.map(item=><>{item}<br/></>)}
                        </p>
                    </div>
                </div>
            </div>
    )
}