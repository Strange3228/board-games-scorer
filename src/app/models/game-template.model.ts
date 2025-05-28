export type WinType = 'win_lose' | 'points';

export interface PointType {
  name: string;
}

export interface GameTemplate {
  id?: string;
  name: string;
  description?: string;
  winType: WinType;
  pointTypes?: PointType[];
}

export interface CreateGameTemplateDto {
  name: string;
  description?: string;
  winType: WinType;
  pointTypes?: PointType[];
} 