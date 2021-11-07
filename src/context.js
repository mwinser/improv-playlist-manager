import React from "react"
import { useState } from "react"


const Context = React.createContext([])

function ContextProvider ({children}) {
    const [playlist, setPlaylist] = useState([])


    function toggleGameInPlaylist(game) {
        if (playlist.includes(game)){
          setPlaylist(prevState=>prevState.filter(item => item !== game))
        } else {
          setPlaylist(prevState=>[...prevState, game])
        }
      }

    function moveGamePosition(game, index, change, end=false) {
      
      if(end){ 
        if (change<=0) {setPlaylist(prevState=> {
          prevState.splice(index, 1)
          prevState.unshift(game)
          return prevState
          })}
        else {setPlaylist(prevState=> {
          prevState.splice(index, 1)
          prevState.push(game)
          return prevState
        })
        }
      }
      else {
        setPlaylist(
          prevState=> {
            const temp = prevState
            temp[index] = temp[index+change]
            temp[index+change] = game
            return temp
          }
        )
      }
    }

    return (
        <Context.Provider value={{playlist, toggleGameInPlaylist, moveGamePosition}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}