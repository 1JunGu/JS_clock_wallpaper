const en_month_name = ['"January"', '"February"', '"March"', '"April"', '"May"', '"June"', '"July"', '"August"', '"September"', '"October"', '"November"', '"December"'];
const dayNames = ['"Sunday"', '"Monday"', '"Tuesday"', '"Wednesday"', '"Thursday"', '"Friday"', '"Saturday"'];

const theme = {
    main: "./styles/main.css",
    PycharmDarcula: "./styles/PycharmDarcula.css",
    GithubDark: "./styles/GithubDark.css",
    GithubLight: "./styles/GithubLight.css",
    IntellijLight: "./styles/IntellijLight.css",
    MaterialDarker: "./styles/MaterialDarker.css",
    VSCodeDarkModern: "./styles/VSCodeDarkModern.css",
    MonokaiPro: "./styles/MonokaiPro.css",
    AtomOneDark: "./styles/AtomOneDark.css",
    SynthWave84: "./styles/SynthWave84.css",
    Dracula: "./styles/Dracula.css"
}

export function Clock() {
    let time = new Date();

    this.hour = time.getHours();
    this.minute = time.getMinutes();
    this.second = time.getSeconds();
    this.day = time.getDate();
    this.day_name = dayNames[time.getDay()];
    this.month = en_month_name[time.getMonth()];
    this.year = time.getFullYear();
    this.weekOfYear = Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 4).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;//The first week of the year is the week that contains the first Thursday;ISO 8601
    //this.oneJan = new Date(this.year,0,1);
    //this.numberOfDays = Math.floor((time - this.oneJan) / (24 * 60 * 60 * 1000));
    //this.weekOfYear = Math.floor((this.day +1+ this.numberOfDays) / 7);
    this.unix = Math.floor(Date.now() / 1000);
    const timeZoneOffsetInMinutes = time.getTimezoneOffset();
    const timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffsetInMinutes / 60));
    const timeZoneSign = timeZoneOffsetInMinutes > 0 ? '-' : '+'; 
    this.timezone = '"' + `GMT${timeZoneSign}${timeZoneOffsetHours.toString().padStart(1, '0')}` + '"';

    if (this.hour < 12) {
        this.period = '"AM"';
    } else {
        this.period = '"PM"';
    }
}

export function Filter() {
    this.use_12h_format_flag = undefined;
    this.hide_period_flag = undefined;
    this.hide_seconds_flag = undefined;
    this.show_unix_flag = undefined;
    this.show_leading_zero_flag = undefined;
    this.hide_timezone_flag = undefined;
    this.use_typehint_flag = undefined;
    this.show_dayName_flag = undefined;
    this.change_font_size = 32;
    this.change_line_height = 1.2;
    this.change_font_family = "JetBrains Mono, monospace";
    this.change_ide_theme = "PycharmDarcula";
}

export function changeTo12hFormat(hour) {
    hour %= 12;

    if (hour === 0) {
        return 12;
    }

    return hour;
}

export function use12hFormat(flag, object) {
    if (flag) {
        object['hour'] = changeTo12hFormat(object['hour']);
    }
}

export function addLeadingZero(num) {
    if (num < 10) {
        return '"0' + num + '"';
    }

    return '"' + num + '"';
}

export function changeClass(id, from, to) {
    if (!document.getElementById(id).classList.contains(to)) {
        document.getElementById(id).classList.add(to);
    }
    if (document.getElementById(id).classList.contains(from)) {
        document.getElementById(id).classList.remove(from);
    }
}

export function toggleElement(flag, id, displayMethod) {
    let element = document.getElementById(id);
    if (flag) {
        element.style.display = 'none';
    } else {
        element.style.display = displayMethod;
    }
}

export function showLeadingZero(flag, object) {
    if (flag) {
        object['hour'] = addLeadingZero(object['hour']);
        object['minute'] = addLeadingZero(object['minute']);
        object['second'] = addLeadingZero(object['second']);
        object['day'] = addLeadingZero(object['day']);

        changeClass('hours_value', 'number', 'string');
        changeClass('minutes_value', 'number', 'string');
        changeClass('seconds_value', 'number', 'string');
        changeClass('days_value', 'number', 'string');
    } else {
        changeClass('hours_value', 'string', 'number');
        changeClass('minutes_value', 'string', 'number');
        changeClass('seconds_value', 'string', 'number');
        changeClass('days_value', 'string', 'number');
    }
}

export function toggleDayName(flag){
    if (flag){
        document.getElementById('list_bracket_start').style.display = 'none';
        document.getElementById('list_comma').style.display = 'none';
        document.getElementById('day_names_value').style.display = 'none';
        document.getElementById('list_bracket_end').style.display = 'none';
    } else {
        document.getElementById('list_bracket_start').style.display = 'inline';
        document.getElementById('list_comma').style.display = 'inline';
        document.getElementById('day_names_value').style.display = 'inline';
        document.getElementById('list_bracket_end').style.display = 'inline';
    }
}

export function changeFontSize(size) {
    document.body.style.fontSize = size + "px";
}

export function changeLineHeight(height){
    document.body.style.lineHeight = height;
}

export function changeFontFamily(family) {
    document.body.style.fontFamily = family;
    document.getElementById('object_clock').style.fontFamily = family;
}

export function updateElementValue(object, key) {
    document.getElementById(key + 's_value').innerHTML = object[key].toString();
}

export function updateAllClockElement(object) {
    updateElementValue(object, 'hour');
    updateElementValue(object, 'minute');
    updateElementValue(object, 'second');
    updateElementValue(object, 'period');
    updateElementValue(object, 'day');
    updateElementValue(object, 'day_name');
    updateElementValue(object, 'month');
    updateElementValue(object, 'year');
    updateElementValue(object, 'weekOfYear');
    updateElementValue(object, 'unix');
    updateElementValue(object, 'timezone')

    const paragraphs = document.getElementById('object_clock').getElementsByTagName('p');
    let lastParagraph = null;

    // 遍历所有的 <p> 元素，从后向前遍历
    for (let i = paragraphs.length - 2; i >= 0; i--) {
        const paragraph = paragraphs[i];
        // 找到第一个非隐藏的 <p> 元素
        if (paragraph.style.display !== 'none') {
            lastParagraph = paragraph;
            break;
        }
    }

    // 如果找到了最后一个非隐藏的 <p> 元素，则隐藏其后的逗号
    if (lastParagraph) {
        const commas = lastParagraph.getElementsByClassName('comma');
        if (commas.length > 0) {
        // 隐藏最后一个逗号
            commas[commas.length - 1].style.display = 'none';
        }
    }

    // 遍历所有的 <p> 元素
    for (let i = 0; i < paragraphs.length; i++) {
        let paragraph = paragraphs[i];
        // 如果不是最后一个 <p> 元素，则显示逗号
        if (paragraph !== lastParagraph) {
            const commas = paragraph.getElementsByClassName('comma');
            if (commas.length > 0) {
            // 隐藏最后一个逗号
                commas[commas.length - 1].style.display = 'inline';
            }
        }
    }
}

export function changeIdeTheme(theme_key = 'main') {
    let link = document.querySelectorAll('link')[1];

    if (link.getAttribute('href') !== theme[theme_key]) {
        link.setAttribute('href', theme[theme_key]);
    }
}

export function updateClock(object, filter) {
    object = new Clock();

    use12hFormat(filter.use_12h_format_flag, object);
    toggleElement(filter.hide_seconds_flag, 'second', 'block');
    toggleElement(filter.hide_period_flag, 'period', 'block');
    toggleElement(!filter.show_unix_flag, 'unix', 'block');
    toggleElement(filter.hide_timezone_flag, 'timezone', 'block');
    toggleElement(!filter.use_typehint_flag, 'typehint', 'inline');
    toggleDayName(!filter.show_dayName_flag)
    showLeadingZero(filter.show_leading_zero_flag, object);
    changeFontSize(filter.change_font_size);
    changeLineHeight(filter.change_line_height);
    changeFontFamily(filter.change_font_family);
    changeIdeTheme(filter.change_ide_theme);
    // toggleElement(!filter.show_dayName_flag, 'day_name', 'inline');
    // toggleElement(!filter.show_dayName_flag, 'list_bracket_start', 'inline');
    // toggleElement(!filter.show_dayName_flag, 'list_comma', 'inline');
    // toggleElement(!filter.show_dayName_flag, 'list_bracket_end', 'inline');

    updateAllClockElement(object);
}
