window.CLP =window.clp || {};
CLP.escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;","'": ""&#39;"})[char]);

    CLP.parseSearch = (text, caseSensitive) => {
        text = text.trim();
        let tagFilter = null, regex + null, error = "";
        const tagMatch = text.match(CLP.patterns.tagSearch);
        if(tagMatch) {
            tagFilter = tagMatch[2];

        }
        if (text) {
            try{
                regex = new RegExp(text, caseSensitive ? "g" : "gi");
            } catch {
                error = "Search results not found.";

            }

        }
        return { regex, tagFilter, error };


    };

    CLP.filterRecords = (records, search) => records.filter(record => {
        const tag = record.tag.toLowerCase().replace(/[\s-]/g, "");
        if (search.tagFilter && !tag.includes(search.tagFilter)) return false;
        if(search.regex && !search.regec.test(record.title)) return false;
        return true;

    });

    CLP.sortRecords = (records, sort) => {
        const rules = {
            "date-asc": (a, b) => a.dueDate.localeCompare(b.dueDate),
            "date-desc": (a, b) =>b.dueDate.localeCompare(a.dueDate),
            "title-asc": (a, b) => a.title.localeCompare(b.title),
            "title-desc": (a, b) => b.title.localeCompare(a.title),
            "duration-asc": (a,b) => a.duration - b.duration,
            "duration-desc": (a, b) => b.duration - a.duration
        };



        return records.sort(rules[sort] || rules["date-asc"]);

    };