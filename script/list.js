// 第一个表格的独立逻辑
let jsonDataOverall = null;
let sortOrderOverall = {};

function loadOverallData() {
    const storedData = localStorage.getItem('modelData-overall');
    if (storedData) {
        const models = JSON.parse(storedData);
        models.forEach(model => insertRowOverall(model));
    }
}

document.getElementById('file-input-overall').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("请选择一个 .json 文件");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            jsonDataOverall = JSON.parse(e.target.result);
            document.getElementById('submit-button-overall').disabled = false;
        } catch (error) {
            alert("文件格式错误，请确认为有效的 JSON 文件");
        }
    };
    reader.readAsText(file);
});

document.getElementById('submit-button-overall').addEventListener('click', function() {
    if (jsonDataOverall) {
        insertRowOverall(jsonDataOverall);
        saveToLocalStorageOverall(jsonDataOverall);
        jsonDataOverall = null;
        document.getElementById('file-input-overall').value = "";
        this.disabled = true;
    }
});

function insertRowOverall(data) {
    const tableBody = document.getElementById('table-body-overall');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${data.rank}</td>
        <td>${data.model}</td>
        <td>${data.model_size}</td>
        <td>${data.memory_usage}</td>
        <td>${data.embedding_dimensions}</td>
        <td>${data.max_tokens}</td>
        <td>${data.average}</td>
        <td>${data.classification_average}</td>
        <td>${data.clustering_average}</td>
        <td>${data.pairclassification_average}</td>
        <td>${data.reranking_average}</td>
    `;
    tableBody.appendChild(newRow);
    if (Object.keys(sortOrderOverall).length === 0) {
        sortOrderOverall['rank'] = 'asc';
        sortTableOverall('rank', document.querySelector('#rank-toggle-overall'));
    }
}

function saveToLocalStorageOverall(data) {
    const storedData = localStorage.getItem('modelData-overall');
    let models = storedData ? JSON.parse(storedData) : [];
    models.push(data);
    localStorage.setItem('modelData-overall', JSON.stringify(models));
}

function sortTableOverall(column, toggleButton) {
    const tableBody = document.getElementById('table-body-overall');
    const rows = Array.from(tableBody.rows);
    
    for (let key in sortOrderOverall) {
        if (key !== column) sortOrderOverall[key] = 'desc';
    }

    const currentOrder = sortOrderOverall[column] === 'asc' ? 'desc' : 'asc';
    sortOrderOverall[column] = currentOrder;

    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndexOverall(column)].innerText;
        const bValue = b.cells[columnIndexOverall(column)].innerText;

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return currentOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return currentOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
    updateToggleButtonsOverall(column);
}

function updateToggleButtonsOverall(column) {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
        button.textContent = '▲';
        button.parentElement.classList.remove('active');
    });
    const currentButton = document.getElementById(`${column}-toggle-overall`);
    currentButton.textContent = sortOrderOverall[column] === 'asc' ? '▼' : '▲';
    currentButton.parentElement.classList.add('active');
}

function columnIndexOverall(column) {
    const columns = ['rank', 'model', 'model_size', 'memory_usage', 'embedding_dimensions', 'max_tokens', 'average', 'classification_average', 'clustering_average', 'pairclassification_average', 'reranking_average'];
    return columns.indexOf(column);
}

// 第二个表格的独立逻辑
let jsonDataSTS = null;
let sortOrderSTS = {};

function loadSTSData() {
    const storedData = localStorage.getItem('modelData_STS');
    if (storedData) {
        const models = JSON.parse(storedData);
        models.forEach(model => insertRowSTS(model));
    }
}

document.getElementById('file-input-STS').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("请选择一个 .json 文件");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            jsonDataSTS = JSON.parse(e.target.result);
            document.getElementById('submit-button-STS').disabled = false;
        } catch (error) {
            alert("文件格式错误，请确认为有效的 JSON 文件");
        }
    };
    reader.readAsText(file);
});

document.getElementById('submit-button-STS').addEventListener('click', function() {
    if (jsonDataSTS) {
        insertRowSTS(jsonDataSTS);
        saveToLocalStorageSTS(jsonDataSTS);
        jsonDataSTS = null;
        document.getElementById('file-input-STS').value = "";
        this.disabled = true;
    }
});

function insertRowSTS(data) {
    const tableBody = document.getElementById('table-body-STS');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${data.rank}</td>
        <td>${data.model}</td>
        <td>${data.model_size}</td>
        <td>${data.memory_usage}</td>
        <td>${data.embedding_dimensions}</td>
        <td>${data.max_tokens}</td>
        <td>${data.average}</td>
        <td>${data.classification_average}</td>
        <td>${data.clustering_average}</td>
        <td>${data.pairclassification_average}</td>
        <td>${data.reranking_average}</td>
    `;
    tableBody.appendChild(newRow);
    if (Object.keys(sortOrderSTS).length === 0) {
        sortOrderSTS['rank'] = 'asc';
        sortTableSTS('rank', document.querySelector('#rank-toggle-STS'));
    }
}

function saveToLocalStorageSTS(data) {
    const storedData = localStorage.getItem('modelData_STS');
    let models = storedData ? JSON.parse(storedData) : [];
    models.push(data);
    localStorage.setItem('modelData_STS', JSON.stringify(models));
}

function sortTableSTS(column, toggleButton) {
    const tableBody = document.getElementById('table-body-STS');
    const rows = Array.from(tableBody.rows);
    
    for (let key in sortOrderSTS) {
        if (key !== column) sortOrderSTS[key] = 'desc';
    }

    const currentOrder = sortOrderSTS[column] === 'asc' ? 'desc' : 'asc';
    sortOrderSTS[column] = currentOrder;

    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndexSTS(column)].innerText;
        const bValue = b.cells[columnIndexSTS(column)].innerText;

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return currentOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return currentOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
    updateToggleButtonsSTS(column);
}

function updateToggleButtonsSTS(column) {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
        button.textContent = '▲';
        button.parentElement.classList.remove('active');
    });
    const currentButton = document.getElementById(`${column}-toggle-STS`);
    currentButton.textContent = sortOrderSTS[column] === 'asc' ? '▼' : '▲';
    currentButton.parentElement.classList.add('active');
}

function columnIndexSTS(column) {
    const columns = ['rank', 'model', 'model_size', 'memory_usage', 'embedding_dimensions', 'max_tokens', 'average', 'classification_average', 'clustering_average', 'pairclassification_average', 'reranking_average'];
    return columns.indexOf(column);
}

// 页面加载时加载数据
window.onload = function() {
    loadOverallData();
    loadSTSData();
    loadRerankingData();
};



// 第三个表格的独立逻辑
let jsonDataReranking = null;
let sortOrderReranking = {};

function loadRerankingData() {
    const storedData = localStorage.getItem('modelData_Reranking');
    if (storedData) {
        const models = JSON.parse(storedData);
        models.forEach(model => insertRowReranking(model));
    }
}

document.getElementById('file-input-Reranking').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("请选择一个 .json 文件");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            jsonDataReranking = JSON.parse(e.target.result);
            document.getElementById('submit-button-Reranking').disabled = false;
        } catch (error) {
            alert("文件格式错误，请确认为有效的 JSON 文件");
        }
    };
    reader.readAsText(file);
});

document.getElementById('submit-button-Reranking').addEventListener('click', function() {
    if (jsonDataReranking) {
        insertRowReranking(jsonDataReranking);
        saveToLocalStorageReranking(jsonDataReranking);
        jsonDataReranking = null;
        document.getElementById('file-input-Reranking').value = "";
        this.disabled = true;
    }
});

function insertRowReranking(data) {
    const tableBody = document.getElementById('table-body-Reranking');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${data.rank}</td>
        <td>${data.model}</td>
        <td>${data.model_size}</td>
        <td>${data.memory_usage}</td>
        <td>${data.embedding_dimensions}</td>
        <td>${data.max_tokens}</td>
        <td>${data.average}</td>
        <td>${data.classification_average}</td>
        <td>${data.clustering_average}</td>
        <td>${data.pairclassification_average}</td>
        <td>${data.reranking_average}</td>
    `;
    tableBody.appendChild(newRow);
    if (Object.keys(sortOrderReranking).length === 0) {
        sortOrderReranking['rank'] = 'asc';
        sortTableReranking('rank', document.querySelector('#rank-toggle-Reranking'));
    }
}

function saveToLocalStorageReranking(data) {
    const storedData = localStorage.getItem('modelData_Reranking');
    let models = storedData ? JSON.parse(storedData) : [];
    models.push(data);
    localStorage.setItem('modelData_Reranking', JSON.stringify(models));
}

function sortTableReranking(column, toggleButton) {
    const tableBody = document.getElementById('table-body-Reranking');
    const rows = Array.from(tableBody.rows);
    
    for (let key in sortOrderReranking) {
        if (key !== column) sortOrderReranking[key] = 'desc';
    }

    const currentOrder = sortOrderReranking[column] === 'asc' ? 'desc' : 'asc';
    sortOrderReranking[column] = currentOrder;

    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndexReranking(column)].innerText;
        const bValue = b.cells[columnIndexReranking(column)].innerText;

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return currentOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return currentOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
    });

    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
    updateToggleButtonsReranking(column);
}

function updateToggleButtonsReranking(column) {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
        button.textContent = '▲';
        button.parentElement.classList.remove('active');
    });
    const currentButton = document.getElementById(`${column}-toggle-Reranking`);
    currentButton.textContent = sortOrderReranking[column] === 'asc' ? '▼' : '▲';
    currentButton.parentElement.classList.add('active');
}

function columnIndexReranking(column) {
    const columns = ['rank', 'model', 'model_size', 'memory_usage', 'embedding_dimensions', 'max_tokens', 'average', 'classification_average', 'clustering_average', 'pairclassification_average', 'reranking_average'];
    return columns.indexOf(column);
}

// 页面加载时加载数据
window.onload = function() {
    loadOverallData(); // 确保这是你想要的，可能需要单独处理
    loadSTSData();
    loadRerankingData();
};