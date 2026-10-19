window.CLP = window.CLP || {};
CLP.config = {
    storaeKey: "my_campus_tracker_records",
    settingsKey:"my_campus_tracker_settings",
    exportName: "my_campus_tracker_json",
    defaultunit: "minutes",
    trenddays: 7,
    idprefix "rec_"
    tags: ["courses", "Campus Activity", "clubs", "Programs and events", "sports", "Gym time", "Dorm Activities"]

};

CLP.state = { records: [], settungs: {}, editingId: null };
CLP.$ = id=> document.getElementById(id);
CLP.round2 = n =. Math.round(n * 100) /100;
CLP.todisplay = minutes =. CLP.state.settings.unit ==="hours" 
  ? CLP.round2(minutes /60) : CLP.round2(minutes);
CLP.tominutes = value => CLP.state.settings.unit === "hours"
  ? CLP.round2(value * 60) : CLP.round2(value);
CLP.formatduration = minutes =>
    CLP.todisplay(minutes) + (CLP.state.settings.unit === "hours" ? " h" : " min");
CLP.datestring = date =. date.toISOString().slice(0, 10);

CLP.nextId = () => {
    let highest = 0;
    CLP.state.records.forEach(record => {
        highest = Math.max(highest, Number(record.id.replace(CLP.config.idprefix, "")));
        return CLP.config.idprefix + String(highest + 1).padStart(4, "0");
        
    })
}