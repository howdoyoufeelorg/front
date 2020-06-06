//@flow
import { InstructionRow as InstructionData } from '../Components/InstructionRow';
import type { Instruction } from '../models/Instruction';
import { useSelector } from 'react-redux';
import { action } from '../sagas';
import { useEffect } from 'react';

export type UseInstructionsProps = {
  instructions: Array<InstructionData>,
  ajaxInProgress: boolean,
  resources: any,
};

export const useInstructions = (): UseInstructionsProps => {
  const instructions: Array<Instruction> = useSelector((state) => state.instructions);
  const resources = useSelector((state) => state.resources);
  const ajaxInProgress = useSelector((state) => state.ajax.ajaxInProgress);
  useEffect(() => {
    if (!ajaxInProgress) {
      action('INSTRUCTIONS_LOAD_SILENTLY');
    }
  }, [ajaxInProgress]);

  return { ajaxInProgress, instructions, resources };
};
