import React from "react";
import "../css/Home.css"
import Chats from "./Chats"
import Search from "./Search"
import NewMessage from "./NewMessage"

export default function Home(props) {
  // State for searching element
  const [searchOpen, setSearchOpen] = React.useState(false)
  //State for chats data
  const [chats, setChats] = React.useState([])
  // State to check whether chat of an user is open or not
  const [isChatOpen, setIsChatOpen] = React.useState(false)
  // State to store the username of the user whose chat is opened
  const [reciever, setReciever] = React.useState("")
  // State to check all usernames on the database
  const [usernames, setUsernames] = React.useState([])
  // State for search input box value 
  const [searchValue, setSearchValue] = React.useState("")
  // State to fetch chat data and all the users available 
  const [fetching, setFetching] = React.useState(false)
  // State to Open new message window
  const [newMessageOpen, setNewMessageOpen] = React.useState(false)
  React.useEffect(() => {
    // Setting interval to fetch in every 2 seconds (could have done something better)
    setFetching(true)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: props.username }),
    };
    fetch("https://Chatit-backend.divu050704.repl.co/api/chats/", requestOptions)
      .then(res => res.json())
      .then(last => {
        setChats((prev) => {
          setFetching(false)
          if (prev === last) {
            return prev
          }
          else {
            return last
          }
        })
      })
    setInterval(() => {
      // Chats data
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: props.username }),
      };
      fetch("https://Chatit-backend.divu050704.repl.co/api/chats/", requestOptions)
        .then(res => res.json())
        .then(last => {
          setChats((prev) => {
            if (prev === last) {
              return prev
            }
            else {
              return last
            }
          })
        })
      // usernames :)
      fetch("https://chatit-backend.divu050704.repl.co/api/users")
        .then(res => res.json())
        .then(last => setUsernames(last))
    }, 1000)
  }, [props.username])
  // converting chat data of a user to an array for further usage
  let usersArray = []
  for (var i in chats) {
    usersArray.push(i)
  }

  // converting JS to JSX
  let users = usersArray.map(x => {
    // regex expression to match the search bar value
    let reg = new RegExp(`${searchValue}`, 'gi')
    // testing the values
    if (reg.test(x)) {
      let lastChat
      // Reading the last message
      if (chats[x][chats[x].length - 1] !== undefined) {
        // Check if the message is being sent by the reviever or the sender
        // If reciever ,i.e., the 3rd person
        if (chats[x][chats[x].length - 1]["r"]) {
          lastChat = x + ": " + chats[x][chats[x].length - 1]["r"]
        }
        // If the sender ,i.e., the person who is logged in
        else {
          lastChat = "Me: " + chats[x][chats[x].length - 1]["s"]
        }
        return (
          <div key={x} onClick={() => {
            setIsChatOpen(true)
            setReciever(x)
            
          }}
            className="home--chats">
            <span style={{display:"flex", alignItems: "center"}}>
            <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYFJREFUSEu1VdFxgzAMlYFByACIY4LCJmGSppM0naRkAi5mgJJBjHriDGdAGEIu/rX1niw9PSl481FvxodNgqZp8q7rcqXUBwDkANACQEVEjyAIqiRJKl+SqwR1XcdhGH5bUB9Ga4wpsixj4sURCbTWZwBg8L2nJaKfNE0v84AFwQHwEZOIvuYkEwJblr+9aQvvFuWaEGitf9dqPmTHSQRBcFZKfa4kUiFiMdyNBBulKRHx6gL63iulikFdI8H9fr+sZWWMOc1V4iun2wv3B6waVs/iSAT8SGtNW2VyCbi5sRQgqWOjpC0inhhrFwFP76DzHU3uc0TEHtslWFXQAdleEbGcEPiabP2HrcC1A7FfDCo2mU2NiPgX87OQKD+wKmLzkyxljPEOmqvntTIJcpUHzcnKtQqvU0qOO5f0HrPr/R8AbsaY3vujKIrtjpjYhfRj0a43Gi5WS5qViYrmUU8snMoYUz61cFwyqy6e8GFl8jUP3u2llXlguMSQzaX/KtE/B+fkGTSQcTAAAAAASUVORK5CYII="
            width="50rem"
            />&nbsp;&nbsp;
            </span>
            <div>
              <p style={{fontSize: "large"}}><strong>{x}</strong></p>
              <p style={{fontSize: "medium", marginTop: "-1rem"}}>{lastChat}</p>
            </div>
          </div>
        )
      }
    }
  }
  )

  let users1 = usernames.map(x => {
    let reg = new RegExp(`${searchValue}`, 'gi')

    if (reg.test(x.username) && props.username !== x.username) {
      return (
        <div key={x.username} onClick={() => {
          setIsChatOpen(true)
          setReciever(x.username)
        }}
          className="home--chats">
          <span style={{display:"flex", alignItems: "center"}}>
            <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYFJREFUSEu1VdFxgzAMlYFByACIY4LCJmGSppM0naRkAi5mgJJBjHriDGdAGEIu/rX1niw9PSl481FvxodNgqZp8q7rcqXUBwDkANACQEVEjyAIqiRJKl+SqwR1XcdhGH5bUB9Ga4wpsixj4sURCbTWZwBg8L2nJaKfNE0v84AFwQHwEZOIvuYkEwJblr+9aQvvFuWaEGitf9dqPmTHSQRBcFZKfa4kUiFiMdyNBBulKRHx6gL63iulikFdI8H9fr+sZWWMOc1V4iun2wv3B6waVs/iSAT8SGtNW2VyCbi5sRQgqWOjpC0inhhrFwFP76DzHU3uc0TEHtslWFXQAdleEbGcEPiabP2HrcC1A7FfDCo2mU2NiPgX87OQKD+wKmLzkyxljPEOmqvntTIJcpUHzcnKtQqvU0qOO5f0HrPr/R8AbsaY3vujKIrtjpjYhfRj0a43Gi5WS5qViYrmUU8snMoYUz61cFwyqy6e8GFl8jUP3u2llXlguMSQzaX/KtE/B+fkGTSQcTAAAAAASUVORK5CYII="
            width="50rem"
            />&nbsp;&nbsp;
            </span>
            <div>
              <p style={{fontSize: "large"}}><strong>{x.username}</strong></p>
          </div>
        </div>
      )
    }
  })
  const logout = () => {
    fetch("https://Chatit-backend.divu050704.repl.co/api/auth/logout", { credentials: "include" })
      .then(() => {
        window.location.reload()
        localStorage.removeItem("user")
      })
  }
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value)
  }
  const handleSearchOpen = () => {
    setSearchOpen(false)
  }
  const clearSearchValue = () => {
    setSearchValue("")
  }
  const check = (currentValue) => currentValue === undefined
  const handleNewMessageOpen = () => {
    setNewMessageOpen(false)
  }
  return (
    <div>
      {
        !isChatOpen &&
        <div>
          {(!searchOpen && !newMessageOpen) ?
            <div>
              <div className="home--navbar">
                <div className="home--navbar-content1">
                  <img
                    src="https://github.com/divu050704/assets-holder/blob/main/chatit/image%20(1).png?raw=true"
                    alt="chatit-icon"
                    width="25rem"
                  />&nbsp;
                  <h2 style={{ color: "white" }}>Chatit</h2>
                </div>
                <div className="home--navbar-content2">
                  <div className="home--icons">
                    <box-icon name='search' color='#ffffff' onClick={() => setSearchOpen(true)}></box-icon>&nbsp;
                  </div>
                  <div className="home--icons">
                    <box-icon name='log-out' color='#ffffff' onClick={logout}></box-icon>
                  </div>
                </div>
              </div>
              {
                fetching
                  ?
                  <div className="fetching">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_usmfx6bp.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                  </div>
                  : //else if
                  users.length !== 0
                    ?
                    <div id="chats">
                      {users}
                      {users.length !== 0 &&
                        <div className="home--newMessage" onClick={() => setNewMessageOpen(true)}>
                          <box-icon name='chat' type='solid' color='#ffffff' ></box-icon>
                        </div>}
                    </div>
                    :
                    <div className="notFound">
                      <div className="notFound--content">
                        <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_e3pteeho.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                        <h1>No chats Found</h1>
                        <button className="login--button" onClick={() => setNewMessageOpen(true)}>Start New</button>
                      </div>
                    </div>

              }
            </div>
            :
            (searchOpen && !newMessageOpen)
              ?
              <div>
                <Search
                  searchValue={searchValue}
                  handleSearchValueChange={handleSearchValueChange}
                  handleSearchOpen={handleSearchOpen}
                  clearSearchValue={clearSearchValue}
                />
                {fetching ?
                  <div className="fetching">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_usmfx6bp.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                  </div>
                  :
                  <div id="chats">{users}</div>
                }
                {
                  users.every(check) &&
                  <div className="notFound">
                    <div className="notFound--content">
                      <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_3X1oGR.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                      <h1>Not Found</h1>
                    </div>
                  </div>
                }
              </div>
              :
              newMessageOpen
              &&
              <div>
                <NewMessage
                  searchValue={searchValue}
                  handleSearchValueChange={handleSearchValueChange}
                  handleNewMessageOpen={handleNewMessageOpen}
                  clearSearchValue={clearSearchValue}
                />
                {fetching ?
                  <div className="fetching">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_usmfx6bp.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                  </div>
                  :
                  <div id="chats">{users1}</div>
                }
                {
                  users1.every(check) &&
                  <div className="notFound">
                    <div className="notFound--content">
                      <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_3X1oGR.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
                      <h1>Not Found</h1>
                    </div>
                  </div>
                }

              </div>

          }
        </div>
      }
      {
        isChatOpen &&
        <Chats
          handleChatClose={() => setIsChatOpen(false)}
          reciever={reciever}
          chats={chats}
          username={props.username}
        />
      }
    </div>




  )
}