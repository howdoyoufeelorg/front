//@flow
import type {DiagnosisSeverity, Instruction} from '../models/Instruction';
import { useSelector } from 'react-redux';
import { action } from '../sagas';
import { useEffect } from 'react';

export type UseInstructionsProps = {
  instructions: Array<Instruction>,
  ajaxInProgress: boolean,
  resources: any,
  severity: DiagnosisSeverity,
};

export const useInstructions = (): UseInstructionsProps => {
  const instructions: Array<Instruction> = useSelector((state) => state.instructions || []);
  const resources = useSelector((state) => state.resources);
  const ajaxInProgress = useSelector((state) => state.ajax.ajaxInProgress);
  const severity: DiagnosisSeverity = useSelector((state) => state.diagnosisSeverity);

  useEffect(() => {
    if (!ajaxInProgress) {
      action('INSTRUCTIONS_LOAD_SILENTLY');
    }
  }, [ajaxInProgress]);

  return { ajaxInProgress, instructions, resources, severity };
};
