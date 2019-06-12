import momentTimezone from "moment-timezone";

class FormaterController {
  dateFormater = (date: string, zone: string, format: string) => {
    if (!format) {
      format = "MMM D, YYYY h:mm a z";
    }

    return momentTimezone.tz(date, zone).format(format);
  };
}

export default FormaterController;
