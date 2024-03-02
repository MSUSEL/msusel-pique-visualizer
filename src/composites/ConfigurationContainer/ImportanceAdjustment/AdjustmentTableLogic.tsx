// AdjustmentTableLogic.tsx
import { useAtomValue } from "jotai";
import React, { useMemo, useState } from "react";
import { State } from "../../../state";
import { Profile } from "../../../types";
import * as schema from "../../../data/schema";
import { AdjustmentTableUI } from "./AdjustmentTableUI";

interface Weights {
  [key: string]: number;
}

interface TQIEntry {
  weights: Weights;
}

interface AdjustmentTableProps {
  selectedProfile?: Profile[];
  isProfileApplied: boolean;
  onResetApplied: () => void;
}

export const AdjustmentTableLogic: React.FC<AdjustmentTableProps> = ({
  selectedProfile,
  isProfileApplied,
  onResetApplied,
}) => {
  const dataset = useAtomValue(State.dataset);
  if (!dataset) return null;

  const getInitialWeights = (
    selectedProfile: Profile[] | undefined,
    dataset: schema.base.Schema,
    useDataset: boolean
  ): { [key: string]: number } => {
    let weights: Weights = {};
    if (selectedProfile && selectedProfile.length > 0 && !useDataset) {
      const profileWeights = selectedProfile[0].importance;
      weights = { ...profileWeights };
    } else {
      Object.entries(dataset.factors.tqi).forEach(([_, tqiEntry]) => {
        const entry = tqiEntry as TQIEntry;
        Object.entries(entry.weights).forEach(([aspect, importance]) => {
          weights[aspect] = importance;
        });
      });
    }
    return weights;
  };

  const sliderValues = useMemo(() => {
    const useDataset = !isProfileApplied;
    return getInitialWeights(selectedProfile, dataset, useDataset);
  }, [selectedProfile, dataset, isProfileApplied]);

  const [values, setValues] = useState<{ [key: string]: number }>(
    () => sliderValues
  );

  const resetAllAdjustments = () => {
    const resetValues = getInitialWeights(selectedProfile, dataset, true);
    setValues(resetValues);
    onResetApplied();
  };

  const recalculatedWeights = useMemo(() => {
    const newWeights: Weights = {};
    Object.keys(values).forEach((name) => {
      const totalImportance = Object.values(values).reduce(
        (sum, importance) => sum + importance,
        0
      );
      newWeights[name] = values[name] / totalImportance;
    });
    return newWeights;
  }, [values]);

  const handleSliderChange = (name: string, newImportance: number) => {
    setValues((prev) => ({ ...prev, [name]: newImportance }));
  };

  const handleDownload = () => {
    // Function to handle download action
  };

  return (
    <AdjustmentTableUI
      dataset={dataset}
      values={values}
      recalculatedWeights={recalculatedWeights}
      handleSliderChange={handleSliderChange}
      resetAllAdjustments={resetAllAdjustments}
      handleDownload={handleDownload}
    />
  );
};
