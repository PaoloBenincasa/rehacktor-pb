import { useState, useRef, useEffect } from "react";
import supabase from "../../supabase/client";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'




function ChatUI({game}){
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);
    dayjs.extend(relativeTime);

    function scrollSmoothToBottom(){
        if (messageRef.current){
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    };

    const getInitialMessages = async () =>{
        setLoadingInitial(true);
        if (messages.length) return;

        const {data, error} = await supabase
        .from("Messages")
        .select()
        .eq("game_id", game.id)
        if (error){
            setError(error.message);
            return;
        }
        setLoadingInitial;
        setMessages(data);
    }

    useEffect(()=>{
        getInitialMessages();
        const channel = supabase
        .channel("Messages")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "Messages",
            },
            ()=>getInitialMessages()
        )
        .subscribe();

        return () =>{
            if (channel){
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, []);

    useEffect(()=>{
        scrollSmoothToBottom();
    }, [messages]);

    // if(loadingInitial){
    //     return <progress></progress>;
    // }

    return(
        <div className="messages" ref={messageRef}> 
            {error && <article>{error}</article>}
            {
                messages &&
                messages.map((message)=>(
                    <article key={message.id} className="bg-light">
                        <p className="bg-light">{message.profile_username}</p>
                        <div className="bg-light">
                            <p className="bg-light">{message.content}</p>
                            <p className="bg-light">{dayjs().to(dayjs(message.created_at))}...</p>
                        </div>
                    </article>
                ))
            }
        </div>
    )

}

export default ChatUI;