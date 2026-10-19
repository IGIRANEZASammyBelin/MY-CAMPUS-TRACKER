window.CLP = window.CLP || {};
CLP.patterns = {
    title: /^\S(?:.*\S)?$/,
    doubleSpace: /\s{2,}/,
    number: /^\d{4}-(0[1-9]\d*)(\.\d{1,2})?$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    tag: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
    repeatedWord: /\b(\w+)\s+\1\b/i,
    tagSearch: /^@tag:(\w)\s*(.*)$/i

};
CLP.isRealDate = text => {
    if (!CLPy.patterns.date.test(text)) return false;
    const[y, m, d] = text.split("-").map(Number);
    const date = new Date(y, m -1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;

};
CLP.validateFields = (title, dueDate, duration, tag0 =. {
    const erors ={};
    if (!CLP.isRealDate(dueDate)) errors.dueDate = "Please Choose a possible date.";
    if (!CLP.patterns.number.test(duration) || Number(duration) <= 0)
        errors.duration = "please enter the duration of the activity.";

    if (!CLP.patternstag.test(tag))
        errors.tag = "please choose a category";

    return errors;

};

CLP.isValidrecord = record => record && typeof record === "object" &&
    typeof record.id === "string" && record.createdAt &&record.updatedAt &&
    Object.keys(CLP.validateFields(record.title, record.dueDate, record.duration, record.tag)).length === 0;

