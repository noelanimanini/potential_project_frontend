import React from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function CardStepper({ bodypart }) {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < 2) setActiveStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };
  return (
    <div>
      <Stepper activeStep={activeStep} variant="dots">
        <Step variant="dots">
          <StepLabel>first</StepLabel>
        </Step>
        <Step>
          <StepLabel>second</StepLabel>
        </Step>
      </Stepper>
      <Button onClick={() => previousStep()}> Previous</Button>
      <Button onClick={() => nextStep()}> Next Step</Button>
    </div>
  );
}

export default CardStepper;
