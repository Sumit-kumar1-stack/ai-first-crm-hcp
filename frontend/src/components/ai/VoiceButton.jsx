import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import "./VoiceButton.css";

export default function VoiceButton({ onResult }) {

    const recognitionRef = useRef(null);

    const [listening, setListening] = useState(false);

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = true;

        recognition.lang = "en-US";

        recognition.onstart = () => setListening(true);

        recognition.onend = () => setListening(false);

        recognition.onresult = (event) => {

            let text = "";

            for (let i = 0; i < event.results.length; i++) {

                text += event.results[i][0].transcript;

            }

            onResult(text);

        };

        recognitionRef.current = recognition;

    }, [onResult]);

    const toggle = () => {

        if (!recognitionRef.current) return;

        if (listening)

            recognitionRef.current.stop();

        else

            recognitionRef.current.start();

    };

    return (

        <button
            className={`voice-btn ${listening ? "active" : ""}`}
            onClick={toggle}
        >

            {

                listening

                    ? <MicOff size={18} />

                    : <Mic size={18} />

            }

        </button>

    );

}
