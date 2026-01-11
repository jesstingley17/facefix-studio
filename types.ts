
export interface Landmark {
  name: string;
  x: number;
  y: number;
}

export interface FaceLandmarks {
  points: Landmark[];
  description: string;
}

export interface GenerationResult {
  id: string;
  originalUrl: string;
  generatedUrl: string;
  prompt: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  MAPPING = 'MAPPING',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  ERROR = 'ERROR'
}

export interface Preset {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
