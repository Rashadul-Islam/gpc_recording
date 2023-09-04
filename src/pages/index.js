import { useState, useRef, useEffect } from "react";
import HomeImage from "@/assets/home.svg";
import Image from "next/image";

const Home = () => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const screenStreamRef = useRef(null);

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });

      const combinedStream = new MediaStream();
      [audioStream, screenStream].forEach((stream) => {
        stream.getTracks().forEach((track) => {
          combinedStream.addTrack(track);
        });
      });

      const recorder = new MediaRecorder(combinedStream);
      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
      setRecording(true);
      setPaused(false);
      setMediaRecorder(recorder);
      screenStreamRef.current = screenStream;
    } catch (error) {
      console.error("Error accessing audio or screen:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
      setPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setPaused(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recording.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (recordedChunks.length > 0 && !paused && !recording) {
      downloadRecording();
      const tracks = screenStreamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      setRecordedChunks([]);
    }
  }, [recordedChunks, paused, recording]);

  // useEffect(() => {
  //   startRecording();
  // }, []);

  const buttonStyle =
    "m-2 g-transparent font-thin hover:text-white py-1 px-3 border hover:border-transparent rounded";

  return (
    <div className="h-screen w-screen bg-white">
      <h3 className="text-center text-bold font-thin text-[24px] italic text-gray-600 pt-3 mb-5">
        Welcome To GP Center Recording
      </h3>
      <div className="flex justify-center h-[60%]">
        <Image src={HomeImage} alt="" />
      </div>
      <div className="flex justify-center mt-10">
        {!recording && (
          <button
            className={`${buttonStyle} border-blue-500 hover:bg-blue-500`}
            onClick={startRecording}
          >
            Start Recording
          </button>
        )}
        {recording && !paused && (
          <button
            className={`${buttonStyle} border-[#64B0CA] hover:bg-[#64B0CA]`}
            onClick={pauseRecording}
          >
            Pause Recording
          </button>
        )}
        {recording && paused && (
          <button
            className={`${buttonStyle} border-[#64B0CA] hover:bg-[#64B0CA]`}
            onClick={resumeRecording}
          >
            Resume Recording
          </button>
        )}
        {recording && (
          <button
            className={`${buttonStyle} border-red-400 hover:bg-red-400`}
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
