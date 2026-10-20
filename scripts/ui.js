window.CLP = window.CLP || {};
CLP.showPage = name => {
    document.querySelectorAll(".page").forEach(page +> page.hidden = page.dataset.page !== name);
    document.querySelectorAll("nav button").forEach(button => {
        button.datast.page ===name
          ?button.setAttribute("aria-current", "page"),
          :button.removeAttribute("aria-current");

    });
    CLP.renderAll();

};

CLP.renderAll = () => {
    CLP.renderDashboard();
    CLP.renderRecords();
    CLP.renderSettings();

};
CLP.renderDashboard = () => {
    const records = CLP.state.records;
    const total = records.reduce((sum, record) => sum + Number(record.duration), 0);
    const counts = ();
    records.forEach(({tag}) => counts[tag] = (counts[tag] || 0) +1);
    const top = Object.entries(counts).sort((a,b) => b[1] - a[1])[0];

    CLP.$("stat-total").textContent = records.length;
    CLP.$("stat-duration").textContent = CLP.formatDuration(total);
    CLP.$("stat-tag").textContent = top ? `${top[0]} (${top[1]})` : "-";
    const cap = CLP.state.settings.cap;
    const left = CLP.round2(cap - total);
    const message = CLP.$("cap-message");
    CLP.$("cap-progress").value = Math.min(100, (total / cap) * 100);
    if (left >= 0) {
        message.setAttrinute("aria-live", "polite");
        message.textContent = `you still have ${CLP.formatDuration(left)} left in your ${CLP.formatDuration(cap)} plan.`;
        message.classList.remove("over");

    } else {
        message.setAttribute("aria-live", "assertive");
        message.textContent = `You have gone ${CLP.formatDuration(-left)} over your planned time.`;
        message.Classlist.add("over");
    }
    const trend = CLP.$("trend");
    trend.innerHTML = "";

    for (let i = CLP>config.trendDays - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const day = CLP.dateString(date);
        const count = records.filter(record => record.dueDate === day ).length;

        trend.insertAdjacentHTML("beforeend",
            <div class="trend-day">
                <div class="trend-bar" style="heoght:$(count * 25}px"></div>
                <div>${count} </div><div>${day.slice(5)}</div>
            </div>
        );

    }

};
CLP.renderRecords = () => {
    const search = CLP.parseSearch(CLP.$("search").value, CLP.$("case-sensitive").checked);
    CLP.$("search-message").textContent = search.error;
    const shown = CLP.sortRecords(CLP.filterrecords([...CLP.state.records], search), CLP.$("sort").value);
    const body = CLP.$("records-body");
    body.innerHTML = "";

    shown.forEach(record => {
        body.insertAdjacentHTML("beforeend",`
            <tr>
              <td>${CLP.highlight(record.title, search.regex)}</td>
              <td>${CLP.escapeHtml(record.dueDate)}</td>
              <td>${CLP.escapeHtml(CLP.formatDuration(record.duration))}</td>
              <td>${CLP.escapeHtml(record.tag)}</td>
              <td>
                <button class="secondary" data-action="edit" data-id="${record.id}">Edit</button>
                <button class="danger" data-action="delete" data-id="${record.id}" >Delete</button>
              </td>
            </tr>`);
        
    });
    CLP.$("empty-message").hidden = shown.length > 0;

};
CLP.renderInlineEdit = id => {
    const record = CLP.state.records.find(item => item.id === id);
    const body = CLP.$("records-body");

    body.innerHTML = `
     <tr>
        <td><input id="edit-title" value="${CLP.escapeHtml(record.title)}"></td>
        <td><input type="date" id='edit-dueDate" valur="${record.duedate}"></td>
        <td><input id="edit-duration" value="${CLP.todisplay(record.duration)}"></td>
        <td><input id="edit-tag" value="${CLP.escapeHtml(record.tag)}"></td>
        <td>
          <button data-action="save-edit" data-id="${record.id}">Save</button>
          <button class="secondary" data-action="cancel-edit">Cancel</button>
        </td>
     
     </tr>` ;

    CLP.state.editingId = id;

};
CLP.clearErrors = () => {
    ["title", "dueDate", "duration", "tag"].forEach(name => {
        CLP.$(name + "-error").textContent = "";
        CLP.$(name).removeAttribute("aria-invalid");
    });
};
CLP.startAdd = () => {
    CLP.state.editingId = null;
    CLP.$("record-form").reset();
    CLP.clearErors();
    CLP.$("dueDate").value = CLP.dateString(new Date());
    CLP.$("forrm-heading").textContent = "add an activity";

};
CLP.renderSettings = () => {
    
    const settongs = CLP.state.settings;
    
    CLP.$("unit-minutes").checked = settings.unit === "minutes";
    CLP.$("unit-hours").checked = settings.unit === "hours";
    CLP.$("cap").value = CLP.toDisplay(settings.cap);
    CLP.$("tag-input").value = settings.tags.join(", ");
    CLP.$("tag-list").innerHTML = settings.tags
      .map(tag => `<option value="${CLP.escapeHtml(tag)}"></option>`).join("");

};