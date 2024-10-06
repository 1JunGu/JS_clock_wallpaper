import {Clock, Filter, updateClock} from "./scripts.js";

let clock = new Clock();
let filter = new Filter();

updateClock(clock, filter);

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        if (properties.ui_use_12h_format) {
            filter.use_12h_format_flag = properties.ui_use_12h_format.value;
        }
        if (properties.ui_hide_seconds) {
            filter.hide_seconds_flag = properties.ui_hide_seconds.value;
        }
        if (properties.ui_hide_period) {
            filter.hide_period_flag = properties.ui_hide_period.value;
        }
        if (properties.ui_show_unix) {
            filter.show_unix_flag = properties.ui_show_unix.value;
        }
        if (properties.ui_show_leading_zero) {
            filter.show_leading_zero_flag = properties.ui_show_leading_zero.value;
        }
        if (properties.ui_hide_timezone) {
            filter.hide_timezone_flag = properties.ui_hide_timezone.value;
        }
        if (properties.ui_show_day_name) {
            filter.show_dayName_flag = properties.ui_show_day_name.value;
        }
        if (properties.ui_font_size) {
            filter.change_font_size = properties.ui_font_size.value;
        }
        if (properties.ui_line_height) {
            filter.change_line_height = properties.ui_line_height.value;
        }
        if (properties.ui_use_typehint) {
            filter.use_typehint_flag = properties.ui_use_typehint.value;
        }
        if (properties.ui_font_family) {
            filter.change_font_family = properties.ui_font_family.value;
        }
        if (properties.ide_theme) {
            filter.change_ide_theme = properties.ide_theme.value;
        }

        updateClock(clock, filter);
    }
};

setInterval(function () {
    updateClock(clock, filter);

}, 1000);