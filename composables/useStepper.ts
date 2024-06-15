import { ref } from 'vue';

export function useStepper(totalSteps: number) {
  const currentStep = ref(1);

  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  return {
    currentStep,
    nextStep,
    previousStep,
  };
}
