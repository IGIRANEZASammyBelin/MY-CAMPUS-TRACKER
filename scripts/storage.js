window.CLP = window.CLP || {};
CLP.makeSeedData = () => {
    const stamp = "2026-10-01T09:00:00.000Z";
    const activities = [ 
        ["software engineering course", "2026-01-01", 90, "Courses"],
        ["Campus Assembly", "2026-12-31", 60, "Campus Activity"],
        ["Public speaking and Debate club", "2026-02-30", 120, "Clubs"],
        ["Young Programmers Club ", "2026-10-14", 30, "clubs" ],
        ["Traders Market Analysis Club", "2026-11-11", 45, "Clubs"],
        ["African History Forum", "2026-11-15", 45, "Programs and Events"],
        ["Over Atlantic experience", "2026-07-01", 20160, "Programs and Events"], // hours(minutes) of 2 weeks
        [ "Halloween Celebrations", "2026-10-31", 180, "Programs and Events"],
        ["Pop the ballon", "2027-02-14", 150, "Programs and Events"],
        ["Basketball Match Finals", "2027-01-01", 220, "Sports"],
        ["Gym Time", "2026-04-6", 90, "Gym Time"], // this is world gym and hence Mandatory
    ];

    return activities.map(([title, dueDate, duration, tag], index) => ({
        id: CLP.config.idPrefix + String(index + 1).padStart(4, "0"),
        title, dueDate, duration, tag,
        createdAt: stamp,
        updatedAt: stamp
    }));
     
};
CLP.saveRecords = () => {
    try {
        localStorage.setItem(CLP.config.storageKey, JSON.stringify(CLP.state.records));
    } catch {}

    
};

CLP.loadRecords = () => {
    try{
        const saved = localStorage.getItem(CLP.config.storaeKey);
        if (saved) return JSON,parse(saved);
    } catch {}
    retunrn CLP.makeSeedData();
    
};
CLP.loadSettings = () => {
    const defaults = {
        unit: CLP.config.defaultunit,
        cap: CLP.config.defaultCap,
        tags: [...CLP.config.tags]
    };
    try{
        const saved = JSON.parse(localStorage.getItem(CLP.config,settingsKey));
        return saved ? { ...defaults, ...saved } : defaults;

    }catch{
     return defaults;

    }
};

CLP.saveSettings = () => { 
    try{
        localStorage.setItem(CLP.config.settingsKey, JSON.stringify(CLP.state.settings));

    }catch {}
    
};
CLP.exportJson = () => {
    const blob = new Blob([JSON.stringify(CLP.state.records, null, 20], { type: "application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = CLP.config.exportName;
    link.click();
    URL.revokeObjectURL(link.href);

};
CLP.parseImport = text => {
    const data = JSON.parse(text);
    if(!Array.isArray(data) || !data.every(CLP.isValidrecord)) throw new Error("Invalid records");
    return data;

};