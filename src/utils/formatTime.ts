import { format, formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import moment from 'moment';

// ----------------------------------------------------------------------

export function fDate(date: string | number | Date, formatStr: string = 'dd/MM/yyy') {
  return format(new Date(date), formatStr);
}

export function fOnlyDate(date: string | number | Date, formatStr: string = 'dd/MM') {
  return format(new Date(date), formatStr);
}

/**
 *
 * @param date
 * @returns yyyy/mm/dd
 */
export function formatDateYear(date: string | number | Date, formatStr: string = 'dd/MM/yyyy') {
  return format(new Date(date), formatStr);
}

export function formatDate(date: string | number | Date, formatStr: string = 'dd/MM') {
  return format(new Date(date), formatStr);
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function fToNowVN(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: viLocale,
  });
}

export function fTime(date: string | number | Date) {
  return format(new Date(date), 'hh:mm:ss');
}

export function fmdatetime(date: string | number | Date) {
  return format(new Date(date), 'yyyy/mm/dd hh:mm:ss');
}

export const DATE_FORMAT = 'DD/MM/YYYY';

export const convertStrToDate = ({ string, format = DATE_FORMAT }: { string: string; format?: string }) =>
  moment(string, format);

export const convertDateToStr = (date: any, format = DATE_FORMAT) =>
  moment(date).isValid() ? moment(date).format(format).toString() : '-';

export const convertStrToTime = (time: string | undefined) => {
  var now = new Date();
  var nowDateTime = now.toISOString();
  var nowDate = nowDateTime.split('T')[0];
  var target = new Date(nowDate + 'T' + time);
  return target;
};
