export const required = (field: string) => (value: string | undefined | null): true | string => 
  (value !== undefined && value !== null && value.trim() !== '') || `${field} مطلوب.`;

export const minLength = (field: string, length: number) => (value: string | undefined | null): true | string => 
  (!!value && value.length >= length) || `${field} يجب أن يكون على الأقل ${length} أحرف.`;

export const emailRule = (value: string | undefined | null): true | string => {
  if (!value || value.trim() === '') {
  
    return true;
  }

  // تحقق من الصيغة فقط إذا فيه نص مدخل
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'البريد الإلكتروني غير صالح.';
};

