import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, ProgressBar } from 'react-bootstrap';
import useTimer from '../hooks/useTimer'; // Importing your custom hook

// Helper function to format time into HH:MM:SS
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const Timer: React.FC = () => {
  // Separate input states for hours, minutes, and seconds
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(0);

  // Use the custom timer hook
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  const [showModal, setShowModal] = useState(false); // Modal for timer end
  const [audio] = useState(new Audio('../assets/alarm.mp3')); // Audio alarm
  const [progress, setProgress] = useState(100); // Progress percentage
  const [totalInputTime, setTotalInputTime] = useState(60); // Track the total input time in seconds

  // Effect to handle progress bar and timer end logic
  useEffect(() => {
    if (totalInputTime > 0) {
      setProgress((time / totalInputTime) * 100); // Update progress bar based on remaining time
    }

    if (time === 0 && isRunning) {
      stopTimer();
      audio.play(); // Play alarm sound
      setShowModal(true); // Show modal
    }
  }, [time, isRunning, stopTimer, audio, totalInputTime]);

  // Convert hours, minutes, and seconds to total seconds
  const handleStart = () => {
    const totalSeconds =
      inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    setTotalInputTime(totalSeconds);
    resetTimer(); // Reset timer before starting
    startTimer(totalSeconds); // Start timer with total seconds
  };

  const handleClose = () => {
    setShowModal(false); // Close modal
  };

  const handleStop = () => {
    stopTimer();
    audio.pause();
    audio.currentTime = 0; // Reset audio
    handleClose();
  };

  return (
    <>
      <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title>Study Timer</Card.Title>
          <Card.Text>
            {/* Display time in HH:MM:SS */}
            <h2 className="display-4">{formatTime(time)}</h2>
          </Card.Text>

          {/* Progress bar showing remaining time */}
          <ProgressBar now={progress} variant="info" className="mb-3" />

          {/* Inputs for setting the timer */}
          <Form.Group className="mb-3">
            <Form.Label>Set Timer</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="number"
                value={inputHours}
                onChange={(e) => setInputHours(Number(e.target.value))}
                min={0}
                placeholder="HH"
                className="text-center mx-2"
              />
              <Form.Control
                type="number"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
                min={0}
                max={59}
                placeholder="MM"
                className="text-center mx-2"
              />
              <Form.Control
                type="number"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(Number(e.target.value))}
                min={0}
                max={59}
                placeholder="SS"
                className="text-center mx-2"
              />
            </div>
          </Form.Group>

          {/* Control buttons */}
          <Button variant="success" onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
          <Button variant="warning" onClick={stopTimer} disabled={!isRunning} className="mx-2">
            Stop
          </Button>
          <Button variant="danger" onClick={resetTimer}>
            Reset
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for Timer End Notification */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time's Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>The timer has ended. Would you like to stop it?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStop}>
            Stop Timer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Timer;
