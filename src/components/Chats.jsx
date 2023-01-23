import React from "react"
import "../css/Chats.css"


export default function Chats(props) {
  const bottomRef = React.useRef(null);
  let chats = props.chats[props.reciever]
  const [message, setMessage] = React.useState("")
  const [isSending, setIsSending] = React.useState(false)
  let chatData

  if (chats !== undefined) {
    chatData = (chats).map((x, index) => {
      let main = x["r"] || x["s"];
      var user = x["r"] ? "r" : "s"

      return (
        <div key={index}>
          <div className={user}>
            <p>{main}</p>
          </div>
        </div>
      )
    })
  }
  else {
    chatData = []
  }

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }
  const send = () => {
    if (message !== "") {
      setIsSending(true)

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ s: props.username, r: props.reciever, message: message }),
      };
      setMessage("")
      fetch("https://Chatit-backend.divu050704.repl.co/api/send/", requestOptions)
        .then((res) => {
          setIsSending(false)

        })
    }
  }

  return (
    <div>
      <div className="chat--navbar">

        <img
          className="chat--navbar-goback"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAL9JREFUSEvllNENwjAMBe9twCYwAozAJKxAN2IDGIFuwgZBkdoKkrSJVfcD0a9Kje78HNdi40cb8/kTQQhhB1wkddaWVls0wO/AAegkXS2SRUEC74GjpJeLwAMeCykm8IIXBZ7wTOAN/xIkcMs9ZmclTa2fXgbBA9ivoseLLQkiNJE8gZN1LNPisinyliyN6diuVUlm/2SvJC2rYlWS1mU3Ss6SbpYpqwo+pisuOhN8dhdZKqydbUpQgyx9/33BG+prVhmfkPrRAAAAAElFTkSuQmCC"
          alt="go-back"
          onClick={props.handleChatClose}
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdZJREFUSEu1VdFtAjEMte8DpDOoMEHbCQob0AlKJ4BuQCcoG5ROUJigMEG7QWEDmOCoIEjcR1wZ5VDuSEhBJdJJJyXxs5+fXxAuvPDC8SEIoJRqA8ADADTMJzlNzTcmosmxJL0Aq9WqFUXROwDcBKqca62fqtXql+ucE0Ap1QeAl1PoQ8ReHMdvxTsHAJvNpsfMr6cEz84i4nMcxwP7bg7A0PJ5TvDsjtb63qYrB6CUmgPAdRGAmX+iKOpvt9uh7JXL5a7Wuo+IV45k5kR0u68q+zFq+XA2ylF6gMpHIhpLrH0FSinJruMCSNO0Xq/Xl/ZekiS1UqmUeOgcEVG3CCDavvsngCkRNYsA7GuuSx0htRHRjh2bIi8AACwRUZo8Mk3uMLPMSs2XlAvAS9EZsp0RkVjL35oMAAsAECsQGcsS+2i5JG32nU0WU8vJVPTPzG2fz8hgIuLYMQ+HMhXk4qAxc7NSqQh13rVerxuI+G0dWBDR3iBDVjFM0/S5OANZMDML4rhS/W4dtQo54JCfDNiAmSdZNSZreSN6tpKCZpdlEdK4iy9X8JyKipeMs4p9HJhf4exCa9096cGxAxgTFI5F15mVzKwnc2dqvhV8k88YstyViwP8Ai7L3BmUk5hLAAAAAElFTkSuQmCC"
          alt="user"
        />&nbsp;
        <h3>{props.reciever}</h3>
      </div>
      <div className="chats--content">
        {chatData}
        <div className="chats--content-sendData">
          <textarea
            autoFocus
            margin="2rem"
            placeholder={isSending ? "Sending....." : "Type a message.."}
            onChange={handleMessage}
            value={message}
          />

          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXFJREFUSEu9lW1Rw0AQht9VAA6gDkABOAAH4AAcUBRQHIADcAAKAAfUAShY5sncMtdw11wypPsr00ner/2oaeaymfG1WwJ3f5e0J2lpZo//4W7Dgbt/JQKwPyU9SLo3M36fVH2CJ0lnkr4zIsBXU4n6BNeS7iQRD+qXkk6SdIgQcGtmuGuqPsGRpDfiMbMFCO5+KglinEVB3kT0Z4qyPixype5+mBxdZEQ4okcvNTslgugDH6Fy4+OM6DzrU/FdSEsE0YcQVSPaT9HxPqNNMearfMRLBNGHvushoktJB0FkZsc1BzWC17SA/chwciUJAvpEfZgZOE0RDQETESQdcIqIKetqW5NrwKi8kUSTA7j4bo0gzkVpTAEmiqjnpLhtTN098l+bWZdnWjQyRnEUm85BHNzooVOBYjaZ4j6xI03AxR64eywZMUW+AHPsmO/RV3XbuV6ngzcJuOaATUQ5MfyOWpb96Mfd/mWOltfwwewOfgArvawZEjt8KgAAAABJRU5ErkJggg=="
            alt="send"
            className="chats--content-sendData-img"
            onClick={send}
          />
        </div>
        <div ref={bottomRef}></div>
      </div>
    </div>
  )
}