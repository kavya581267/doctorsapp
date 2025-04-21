
export class Medication {
    id: number;
    medicationName: string;
    genericName: string | null;
    category: string | null;
    description: string | null;
    dosage: string;
    dosageUnit: string | null;
    dosageForm: string;
    strength: string | null;
}

export class Problem {
    id: number;
    problem: string;
}

export class LabTest {
    id: number;
    testName: string;
    description: string;
    category: string | null;
}

class LabObservation {
    id: number;
    labTestId: number;
    observation: string;
    observationCode: string;
    units: string;
    ranges: string; // This is a JSON string. If you want to parse it into an object, let me know!
  }

  export class Symptom {
    id: number;
    name: string;
  }


export class MasterData {
    familyHistory: Symptom[] = []
    labResults: LabObservation[] = []
    labTests: LabTest[] = []
    medications: Medication[] = []
    pastMedicalHistory: Symptom[] = []
    presentingComplaints: Symptom[] = []
    problems: Problem[] = []
}

