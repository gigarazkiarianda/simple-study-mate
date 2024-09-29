import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import useTimer from '../hooks/useTimer';

const Timer: React.FC = () => {
  const [inputTime, setInputTime] = useState(60); 
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  const [showModal, setShowModal] = useState(false); 
  const [audio] = useState(new Audio('../assets/alarm.mp3')); 

  useEffect(() => {
    if (time === 0 && isRunning) {
      stopTimer();
      audio.play(); 
      setShowModal(true); 
    }
  }, [time, isRunning, stopTimer, audio]);

  const handleStart = () => {
    resetTimer();
    startTimer(inputTime); 
  };

  const handleClose = () => {
    setShowModal(false); 
  };

  const handleStop = () => {
    stopTimer(); 
    audio.pause(); 
    audio.currentTime = 0; 
    handleClose(); 
  };

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Study Timer</Card.Title>
          <Card.Text>{time} seconds</Card.Text>

          <Form.Group className="mb-3">
            <Form.Label>Set Timer (seconds)</Form.Label>
            <Form.Control
              type="number"
              value={inputTime}
              onChange={(e) => setInputTime(Number(e.target.value))}
              min={1}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
          <Button variant="warning" onClick={stopTimer} disabled={!isRunning} className="mx-2">
            Stop
          </Button>
          <Button variant="secondary" onClick={resetTimer}>
            Reset
          </Button>
        </Card.Body>
      </Card>

      {/* Modal untuk notifikasi */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Waktu Habis!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Timer telah selesai. Apakah Anda ingin menghentikannya?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleStop}>
            Hentikan Timer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Timer;
