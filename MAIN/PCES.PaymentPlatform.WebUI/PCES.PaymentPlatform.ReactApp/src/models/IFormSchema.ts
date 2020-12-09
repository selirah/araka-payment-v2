export interface IFormSchema {
  input?: boolean;
  tableView?: boolean;
  inputType: string;
  inputMask?: string;
  label?: string;
  key: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  multiple?: boolean;
  defaultValue?: string;
  protected?: boolean;
  unique?: boolean;
  persistent: boolean;
  clearOnHide: boolean;
  validate: {
    required: boolean;
    minLength: string;
    maxLength: string;
    pattern: string;
    custom: string;
    customPrivate: boolean;
  };
  conditional?: {
    show: string;
    when: null;
    eq: string;
  };
  type: string;
  tags?: any[];
  lockKey?: boolean;
  isNew?: boolean;
  kickbox?: {
    enabled: boolean;
  };
}
