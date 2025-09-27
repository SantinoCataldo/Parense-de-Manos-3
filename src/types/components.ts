// Tipos para componentes UI
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

// Props para componentes específicos del evento
export interface FighterCardProps {
  fighter: import('./index').Fighter;
  showDetails?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface FightCardProps {
  fight: import('./index').Fight;
  showResult?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CountdownProps {
  targetDate: string;
  onComplete?: () => void;
  className?: string;
}

export interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
}