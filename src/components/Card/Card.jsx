import { useState } from "react";

export const Card = ({
    editCardStatus, deleteCard, data: {_id, title, createdAt, user: { userName }, description, status, importance}, data
}) => {

    const [showMore, setShowMore] = useState(false);

    const dateTime = new Date(createdAt).toLocaleString() + " hs.";
    
    const limitString = (str) => {
        if (str.length > 170) {
            return { string: str.slice(0,167).concat("..."), addButton: true}
        }
        return { string:str, addButton: false}
    }

    return(
    <div className="card">
        <div className="close" onClick={() => deleteCard(_id)}>x</div>
        <h3>{title}</h3>
        <p className="text_subtitle">{dateTime}</p>
        <p className="text_subtitle">{userName}</p>
        <button className={status.toLowerCase()} onClick={()=>editCardStatus(data)}>{status.toLowerCase()}</button>
        <button className={importance.toLowerCase()}>{importance.toLowerCase()}</button>
        <p>{!showMore ? limitString(description).string : description}</p>
        {
            !showMore && limitString(description).addButton && (
                <button className="read-more_button" type="button" onClick={()=>{setShowMore(true)}}>
                    Ver más...
                </button>
            )
        }
        {
            showMore && (
                <button className="read-more_button" type="button" onClick={()=>{setShowMore(false)}}>
                    Ver menos
                </button>
            )
        }
    </div>
)}