import { useState, useRef, useEffect } from "react";
import supabase from "../../supabase/client";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import style from './'




function ChatUI({ game }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);
    dayjs.extend(relativeTime);

    function scrollSmoothToTop() {
        if (messageRef.current) {
            // messageRef.current.scrollTop = messageRef.current.scrollHeight;
            messageRef.current.scrollTop = 0;

        }
    };

    const getInitialMessages = async () => {
        setLoadingInitial(true);
        if (messages.length) return;

        const { data, error } = await supabase
            .from("Messages")
            .select()
            .eq("game_id", game.id)
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial;
        setMessages(data);
    }

    useEffect(() => {
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
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollSmoothToTop();
    }, [messages]);

    // if(loadingInitial){
    //     return <progress></progress>;
    // }

    return (
        <div ref={messageRef} >
            {error && <article>{error}</article>}
            {
                messages &&
                messages.slice().reverse().map((message) => (
                    <div className="w-100 d-flex justify-content-center">

                        <div key={message.id} className="w-50  mb-3 ps-3 pe-3 bg-newblack rounded">

                            <p className="ChatUser bg-newblack rounded p-2 mb-0">{message.profile_username}</p>
                            <p className="chatMsg rounded p-2 mb-0 ">{message.content}</p>
                            <p className="chatDate bg-newblack  rounded p-2 mb-1 fst-italic">{dayjs().to(dayjs(message.created_at))}</p>

                        </div>
                    </div>
                ))
            }
        </div>
    )

}

export default ChatUI;