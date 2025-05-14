import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { FaHeart, FaVolumeUp, FaVolumeMute, FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffd1ff, #faa2c1);
  padding: 20px;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const AudioControlContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 25px;
  z-index: 3;
`;

const AudioButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const VolumeSlider = styled.input`
  width: 100px;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const MessageText = styled(motion.div)`
  color: white;
  font-size: 2rem;
  max-width: 600px;
  line-height: 1.6;
  margin: 2rem auto;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const VideoContainer = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Heart = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const FloatingHeart = ({ size, delay }) => {
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  const randomX = Math.random() * 100;
  
  return (
    <Heart
      style={{
        fontSize: size,
        left: `${randomX}vw`,
        bottom: -100,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: -(height + 100),
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <FaHeart />
    </Heart>
  );
};

export default function MessagePage() {
  const [hearts, setHearts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const heartSizes = Array.from({ length: 20 }, () => 
      Math.random() * 30 + 20
    );
    const heartDelays = Array.from({ length: 20 }, () => 
      Math.random() * 4
    );
    setHearts(heartSizes.map((size, i) => ({
      size: `${size}px`,
      delay: heartDelays[i]
    })));
  }, []);

  useEffect(() => {
    if (mounted && audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay failed:", error);
        });
      }
      audioRef.current.volume = volume;
    }
  }, [isMuted, mounted, volume]);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const adjustVolume = (amount) => {
    const newVolume = Math.max(0, Math.min(1, volume + amount));
    setVolume(newVolume);
  };

  if (!mounted) return null;

  return (
    <Container>
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
      />
      
      <AudioControlContainer>
        <AudioButton onClick={() => adjustVolume(-0.1)} title="ลดเสียง">
          <FaMinus />
        </AudioButton>
        
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        
        <AudioButton onClick={() => adjustVolume(0.1)} title="เพิ่มเสียง">
          <FaPlus />
        </AudioButton>
        
        <AudioButton onClick={toggleAudio} title="เปิด/ปิดเสียง">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </AudioButton>
      </AudioControlContainer>

      {hearts.map((heart, i) => (
        <FloatingHeart key={i} size={heart.size} delay={heart.delay} />
      ))}

      <MessageText
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        สู้ๆนะคับคนเก่ง
        <br />
        เค้าอยู่ข้างเทอเสมอ
        <br />
        อย่ากดดันตัวเองนะคับ
        <br />
        เค้าเป็นกำลังใจให้
        <br />
        รักนะ ❤️
      </MessageText>

      <VideoContainer>
        <Video 
          autoPlay 
          loop 
          muted 
          playsInline
          src="/couple-video.mov"
        />
      </VideoContainer>
    </Container>
  );
} 