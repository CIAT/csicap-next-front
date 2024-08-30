type NavigateAction = "PREV" | "NEXT" | "TODAY";

export interface CustomToolbarProps {
    label: string;
    onNavigate: (action: NavigateAction) => void;
}