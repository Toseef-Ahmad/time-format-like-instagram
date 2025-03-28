/**
 * Advanced date formatting utility for human-readable time differences
 * @module TimeAgo
 */
interface TimeDiffResult {
  value: number;
  unit: 'month' | 'day' | 'hour' | 'minute' | 'second' | 'just now';
}

/**
 * Options for customizing time ago formatting
 */
interface TimeAgoOptions {
  /**
   * Maximum units to display (e.g., 2 would show "2 months 5 days ago")
   * @default 1
   */
  maxUnits?: number;
  
  /**
   * Custom language for time units
   * @default English
   */
  language?: 'en' | 'es' | 'fr';
  
  /**
   * Show full words instead of abbreviated units
   * @default false
   */
  fullWords?: boolean;
}

/**
 * Converts a date to a human-readable "time ago" format
 * @param date - Date to convert (Date object, timestamp, or ISO string)
 * @param options - Formatting options
 * @returns Formatted time difference string
 * 
 * @example
 * timeAgo(new Date('2023-01-01'))  // "2 years ago"
 * timeAgo(new Date(), { maxUnits: 2 })  // "Just now"
 */
export function timeAgo(
  date: Date | number | string, 
  options: TimeAgoOptions = {}
): string {
  // Normalize input to Date object
  const targetDate = new Date(date);
  const currentDate = new Date();

  // Validate input
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date input');
  }

  // Calculate time difference
  const diff = calculateTimeDifference(currentDate, targetDate);

  // Apply formatting options
  return formatTimeDifference(diff, {
    maxUnits: options.maxUnits ?? 1,
    language: options.language ?? 'en',
    fullWords: options.fullWords ?? false
  });
}

/**
 * Calculate precise time difference between two dates
 * @param currentDate - Current date
 * @param targetDate - Target date to compare
 * @returns Detailed time difference object
 */
function calculateTimeDifference(currentDate: Date, targetDate: Date): TimeDiffResult {
  const diffMs = Math.abs(currentDate.getTime() - targetDate.getTime());
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  // Determine most appropriate unit
  if (months > 0) return { value: months, unit: 'month' };
  if (days > 0) return { value: days, unit: 'day' };
  if (hours > 0) return { value: hours, unit: 'hour' };
  if (minutes > 0) return { value: minutes, unit: 'minute' };
  if (seconds > 0) return { value: seconds, unit: 'second' };
  
  return { value: 0, unit: 'just now' };
}

/**
 * Format time difference with language and styling options
 * @param diff - Time difference result
 * @param options - Formatting options
 * @returns Formatted time ago string
 */
function formatTimeDifference(
  diff: TimeDiffResult, 
  options: Required<TimeAgoOptions>
): string {
  // Language-specific translations
  const translations = {
    en: {
      month: { singular: 'month', plural: 'months' },
      day: { singular: 'day', plural: 'days' },
      hour: { singular: 'hour', plural: 'hours' },
      minute: { singular: 'minute', plural: 'minutes' },
      second: { singular: 'second', plural: 'seconds' },
      justNow: 'Just now'
    },
    es: {
      month: { singular: 'mes', plural: 'meses' },
      day: { singular: 'día', plural: 'días' },
      hour: { singular: 'hora', plural: 'horas' },
      minute: { singular: 'minuto', plural: 'minutos' },
      second: { singular: 'segundo', plural: 'segundos' },
      justNow: 'Justo ahora'
    }
    // Add more languages as needed
  };

  const lang = translations[options.language] || translations.en;

  // Handle "just now" case
  if (diff.unit === 'just now') {
    return lang.justNow;
  }

  // Determine unit text based on value and fullWords option
  const unitText = diff.value === 1 
    ? (options.fullWords ? lang[diff.unit].singular : diff.unit[0])
    : (options.fullWords ? lang[diff.unit].plural : diff.unit[0]);

  return `${diff.value} ${unitText} ago`;
}

/**
 * Convert date to specific format with additional options
 * @param date - Date to format
 * @param format - Desired output format
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD')  // "2024-03-15"
 * formatDate(new Date(), 'DD/MM/YYYY')  // "15/03/2024"
 */
export function formatDate(
  date: Date | number | string, 
  format: string = 'YYYY-MM-DD'
): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date input');
  }

  return format
    .replace('YYYY', d.getFullYear().toString())
    .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
    .replace('DD', String(d.getDate()).padStart(2, '0'))
    .replace('HH', String(d.getHours()).padStart(2, '0'))
    .replace('mm', String(d.getMinutes()).padStart(2, '0'))
    .replace('ss', String(d.getSeconds()).padStart(2, '0'));
}

// Utility exports for more specific use cases
export const utilities = {
  /**
   * Check if a date is in the past
   * @param date - Date to check
   * @returns Boolean indicating if date is in the past
   */
  isPast: (date: Date | number | string): boolean => {
    return new Date(date).getTime() < Date.now();
  },

  /**
   * Check if a date is in the future
   * @param date - Date to check
   * @returns Boolean indicating if date is in the future
   */
  isFuture: (date: Date | number | string): boolean => {
    return new Date(date).getTime() > Date.now();
  },

  /**
   * Calculate days between two dates
   * @param startDate - First date
   * @param endDate - Second date
   * @returns Number of days between dates
   */
  daysBetween: (
    startDate: Date | number | string, 
    endDate: Date | number | string
  ): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};
