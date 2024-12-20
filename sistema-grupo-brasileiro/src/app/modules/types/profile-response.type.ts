/**
 * Tipo de Dados `TProfile`
 * 
 * Representa as informações de perfil de um usuário no sistema.
 */
export type TProfile = {
  /** Identificador do usuário */
  userId: number;
  /** Nome do usuário */
  name: string;
  /** Sobrenome do usuário */
  lastname: string;
  /** Email do usuário */
  email: string;
  /** Telefone do usuário */
  phoneNumber: string;
  /** Setor do usuário */
  sector: string;
  /** Profissão do usuário */
  occupation: string;
  /** Agência do usuário */
  agency: string;
};
