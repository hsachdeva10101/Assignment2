class DataLoader {
    getter():object {
        let id = 1;
        return [
            {
                "id": ++id,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "foo@gmail.com",
                "Phone Number": "123",
                "Role": "trainee",
                "Address": "Chd"
            },
            {
                "id": ++id,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "bar@mail.com",
                "Phone Number": "456",
                "Role": "trainee",
                "Address": "Chd"
            },
            {
                "id": ++id,
                "First Name": "foo",
                "Middle Name": "bar",
                "Last Name": "baz",
                "email": "baz@gmail.com",
                "Phone Number": "789",
                "Role": "trainee",
                "Address": "Chd"
            }
        ];
    }
}

class TableClass {
    // view
    view(): void {
        let loadTable = document.getElementById('loadTable');
        loadTable.innerHTML = '';

        let data =new DataLoader();
        let tableData = data.getter();

        let tableHeader: string[] = [];
        for(let i = 0; i < Object.keys(tableData).length; i++) {
            for (let key in tableData[i]) {
                if (tableHeader.indexOf(key) === -1) {
                    tableHeader.push(key);
                }
            }
        }

        // table
        let MakeTable = document.createElement('table');
        MakeTable.classList.add('table');

        // table head
        let thead = document.createElement('thead');
        thead.classList.add('thead');

        let thead_tr = thead.insertRow(-1);

        for(let i = 0; i < Object.keys(tableHeader).length; i++) {
            let theadRow = document.createElement('th');
            theadRow.setAttribute('id', 'theadRow-'+i);
            theadRow.classList.add(tableHeader[i]);

            thead_tr.append(theadRow);
            thead_tr.setAttribute('id','thead-tr'+i);
        }

        // action
        let actionBtn = thead_tr.insertCell(-1);
        actionBtn.classList.add('table-action');
        actionBtn.innerHTML = `<strong>Action</strong>`;

        MakeTable.append(thead);

        // table body
        let TableBody = document.createElement('tbody');
        TableBody.classList.add('tbody');
        MakeTable.append(TableBody);

        for(let i = 0; i < Object.keys(tableData).length;i++) {
            let tableRowId= 'tr-'+i;

            let tr =TableBody.insertRow(0);
            tr.setAttribute('id', tableRowId);
            TableBody.append(tr);
            for(let j = 0; j < tableHeader.length; j++) {
                let tCell = tr.insertCell(-1);
                tCell.innerHTML = tableData[i][tableHeader[j]];
                tCell.classList.add('tableCell');
            }

            let edit_delCell = tr.insertCell(-1);

            // edit button
            let editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.innerHTML = 'Edit';
            editButton.addEventListener("click", this.edit(tableRowId, tableHeader));
            edit_delCell.append(editButton);

            // delete button
            let delBtn = document.createElement('button');
            delBtn.classList.add('delete-btn');
            delBtn.innerHTML = 'Delete';
            delBtn.addEventListener('click', this.delete(tableRowId));
            edit_delCell.append(delBtn);

            // save
            let saveBtn = document.createElement('button');
            saveBtn.setAttribute('id', `save-btn-${i}`);
            saveBtn.innerHTML = `Save`;
            saveBtn.classList.add(`save-btn`);
            saveBtn.addEventListener('click', this.save(tableRowId, tableHeader));
            edit_delCell.append(saveBtn);

            // cancel
            let cancelButton = document.createElement('button');
            cancelButton.setAttribute('id', `cancel-button-${i}`);
            cancelButton.innerHTML = 'Cancel';
            cancelButton.classList.add('btn-info');
            cancelButton.addEventListener('click', this.cancel(tableRowId, tableHeader, tableData))
            edit_delCell.append(cancelButton);

        }

    }

    delete(id: string) {
        return (): void=> {
            let delElement = document.getElementById(id);
            delElement.remove();
        }
    }

    // later
    edit(id:string, tableHeader: string | string[])  {

        // select all cells and make editable true
        return (): void => {
            // just suppressed errors: not clear what to do
            let editElement = document.getElementById(id);


            for (let i = 0; i < tableHeader.length; i++) {
                let getCell = editElement.querySelectorAll('.tableCell')[i];
                for(let j = 0; j < Object.keys(getCell).length; j++) {
                    getCell[j].contentEditable = true;
                }
            }

            // toggle buttons
            for (let i = 0; i < editElement.querySelector('#saveCnclEdtClr').children.length; i++) {
                if (editElement[i].querySelector('#saveCnclEdtClr').children[i].style.display === 'none') {
                    editElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'block';
                } else {
                    editElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'none';
                }
            }
        }
    }


    // Check line 171 if it does not work
    // check
    cancel(id:string, tableHeader:string|string[], tableData:object) {
        return (): void=> {
            let cancelElement:HTMLElement = document.getElementById(id);
            let cancelElementIndex:number;
            for(let i = 0; i < Object.keys(cancelElement).length; i++) {
                cancelElementIndex = cancelElement[i].rowIndex;
            }


            for (let i = 0; i < Object.keys(tableData).length; i++) {
                for (let j = 0; j < tableHeader.length; i++) {
                    cancelElement.querySelectorAll('.tableCell')[j].innerHTML = tableData[cancelElementIndex - 1][tableHeader[j]];
                }
            }

            for (let i = 0; i < cancelElement.querySelector('#saveCnclEdtClr').children.length; i++) {
                if (cancelElement[i].querySelector('#saveCnclEdtClr').children[i].style.display === 'none') {
                    cancelElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'block';
                } else {
                    cancelElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'none';
                }
            }
        }
    }

    save(id:string, tableHeader:string|string[]) {
        return (): void=> {
            let saveElement: HTMLElement= document.getElementById(id);

            // select all cells and make editable false
            for (let i = 0; i < tableHeader.length; i++) {
                let getCell = saveElement.querySelectorAll('.tableCell')[i];
                // loop j and get cell j
                for(let j = 0; j < Object.keys(getCell).length; j++) {
                    getCell[j].contentEditable = false
                }
            }

            for (let i = 0; i < saveElement.querySelector('#saveCnclEdtClr').children.length; i++) {
                if (saveElement[i].querySelector('#saveCnclEdtClr').children[i].style.display === 'none') {
                    saveElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'block';
                } else {
                    saveElement[i].querySelector('#saveCnclEdtClr').children[i].style.display = 'none';
                }
            }
        }
    }
}

let loadFormData =():void=> {
    let loadData = document.getElementById('loadData');
    loadData.innerHTML ='RefreshData';

    let table = new TableClass();
    table.view();
}