export interface CampaignPreparation {
  id: number;
  name: string;
  initial_date: Date;
  final_date: Date;
  task_completed: number;
  number_contents: number;
  number_creators: number;
  campaign_state: string; // Puedes ajustar el tipo si tienes un enum para los estados
  budget: number;
  campaign_type: string; // Puedes ajustar el tipo si tienes un enum para los tipos
  country: string;
  pr: boolean;
}
